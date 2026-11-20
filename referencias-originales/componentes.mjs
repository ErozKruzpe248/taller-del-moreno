const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value) => String(value).replace(/[&<>"']/g, (character) => escapeMap[character]);

export function required(value, label) {
  if (typeof value !== "string" || !value.trim()) throw new Error(label + " es obligatorio.");
  return value.trim();
}

function https(value, label) {
  const url = new URL(required(value, label));
  if (url.protocol !== "https:" || url.username || url.password) throw new Error(label + " debe ser una URL HTTPS válida.");
  return url;
}

function asset(value, assets) {
  const name = required(value, "Nombre de recurso");
  if (!/^[a-z0-9][a-z0-9._-]*\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/i.test(name) || name === "matangazo-oficial.png") throw new Error("Usa un nombre de imagen propio dentro de assets/: " + name);
  assets.add(name);
  return "./assets/" + name;
}

function image(data, assets, primary = false) {
  const { archivo, alt, ancho, alto } = data;
  if (![ancho, alto].every((size) => Number.isSafeInteger(size) && size > 0)) throw new Error("Indica ancho y alto reales para " + archivo);
  return `<figure class="media"><img src="${esc(asset(archivo, assets))}" alt="${esc(required(alt, "Texto alternativo"))}" width="${ancho}" height="${alto}" decoding="async" ${primary ? 'fetchpriority="high"' : 'loading="lazy"'}>${data.ilustrativa ? '<figcaption>Imagen ilustrativa</figcaption>' : ""}</figure>`;
}

function phoneNumber(value) {
  const digits = required(value, "Teléfono").replace(/[^0-9]/g, "");
  if (!/^(?:52)?\d{10}$/.test(digits)) throw new Error("El teléfono debe tener 10 dígitos de México y prefijo +52 opcional.");
  return "+52" + digits.slice(-10);
}

function contactLink(contact) {
  const value = required(contact.valor, "Valor del contacto");
  let href;
  let label;
  switch (contact.tipo) {
    case "telefono": href = "tel:" + phoneNumber(value); label = value; break;
    case "whatsapp": href = "https://wa.me/" + phoneNumber(value).slice(1) + "?text=" + encodeURIComponent(contact.mensaje ?? "Hola, me gustaría recibir información."); label = "Escríbenos por WhatsApp"; break;
    case "correo":
      if (!/^[^\s@?]+@[^\s@?]+\.[^\s@?]+$/.test(value)) throw new Error("Correo inválido.");
      href = "mailto:" + value; label = value; break;
    case "enlace": href = https(value, "Contacto").href; label = required(contact.etiqueta, "Etiqueta del enlace"); break;
    default: throw new Error("Tipo de contacto desconocido.");
  }
  return { href, label: contact.etiqueta ?? label, tipo: contact.tipo };
}

function link(href, label, className = "button button-white") {
  return `<a class="${className}" href="${esc(href)}">${esc(label)}</a>`;
}

const days = { Monday: "Lunes", Tuesday: "Martes", Wednesday: "Miércoles", Thursday: "Jueves", Friday: "Viernes", Saturday: "Sábado", Sunday: "Domingo" };
function schedule(data) {
  if (!Array.isArray(data.dias) || !data.dias.length || data.dias.some((day) => !Object.hasOwn(days, day))) throw new Error("Días de horario inválidos.");
  if (![data.abre, data.cierra].every((hour) => /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(hour))) throw new Error("Usa horarios HH:MM válidos.");
  return { "@type": "OpeningHoursSpecification", dayOfWeek: data.dias, opens: data.abre, closes: data.cierra };
}

function address(data) {
  if (!data) return null;
  return { "@type": "PostalAddress", streetAddress: required(data.calle, "Calle"), addressLocality: required(data.localidad, "Ciudad"), addressRegion: required(data.estado, "Estado"), postalCode: required(data.cp, "Código postal"), addressCountry: "MX" };
}

function serviceSection(services, assets) {
  if (!Array.isArray(services) || services.length < 1 || services.length > 6) throw new Error("Indica entre uno y seis servicios o grupos y conserva el detalle de cada servicio al agrupar.");
  const entries = services.map((service, index) => ({ ...service, key: "servicio-" + (index + 1), nombre: required(service.nombre, "Nombre del servicio"), descripcion: required(service.descripcion, "Descripción del servicio") }));
  const tabs = entries.map((service) => `<button type="button" role="tab" id="tab-${service.key}" aria-controls="${service.key}" aria-selected="false" tabindex="-1">${esc(service.nombre)}</button>`).join("");
  const panels = entries.map((service) => {
    const details = (service.elementos ?? []).map((item) => `<div class="service-detail"><h4>${esc(required(item.nombre, "Nombre del servicio agrupado"))}</h4><p>${esc(required(item.descripcion, "Descripción del servicio agrupado"))}</p>${item.precio ? `<p>${esc(item.precio)}</p>` : ""}</div>`).join("");
    return `<article class="service-panel" id="${service.key}" data-service-panel>${service.imagen ? image(service.imagen, assets) : ""}<div class="service-copy"><h3>${esc(service.nombre)}</h3><p>${esc(service.descripcion)}</p>${service.precio ? `<p class="service-price">${esc(service.precio)}</p>` : ""}${details}${link("#contacto", "Consultar este servicio", "button button-brand")}</div></article>`;
  }).join("");
  return `<section id="servicios" class="services reveal" aria-labelledby="servicios-titulo"><h2 id="servicios-titulo">Nuestros servicios</h2><div class="service-tabs" role="tablist" aria-label="Servicios" hidden>${tabs}</div><div class="service-panels">${panels}</div></section>`;
}

function contactSection(config, contacts) {
  const structured = [];
  const ids = new Set();
  const branches = (config.sucursales ?? []).map((branch) => {
    const id = required(branch.id, "ID de sucursal");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id)) throw new Error("ID de sucursal inválido o repetido.");
    ids.add(id);
    const name = required(branch.nombre, "Nombre de sucursal");
    const postal = address(branch.direccion);
    const phone = branch.telefono ? phoneNumber(branch.telefono) : "";
    const hours = (branch.horarios ?? []).map(schedule);
    const fullAddress = postal ? [postal.streetAddress, postal.addressLocality, postal.addressRegion, postal.postalCode, "México"].join(", ") : "";
    const map = branch.mapa ? https(branch.mapa, "Mapa").href : fullAddress ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(fullAddress) : "";
    const embedded = branch.mapaEmbed ? https(branch.mapaEmbed, "Mapa embebido").href : fullAddress ? "https://www.google.com/maps?q=" + encodeURIComponent(fullAddress) + "&output=embed" : "";
    if (phone && postal && hours.length) structured.push({ "@type": config.tipoNegocio ?? "LocalBusiness", "@id": new URL("#sucursal-" + id, config.seo.url).href, url: config.seo.url, name, telephone: phone, address: postal, openingHoursSpecification: hours });
    return { id, name, phone, hours, fullAddress, map, embedded, whatsapp: branch.whatsapp ? contactLink({ tipo: "whatsapp", valor: branch.whatsapp }) : null };
  });
  const selectors = branches.length > 1 ? `<div class="branch-selectors" aria-label="Elegir sucursal" hidden>${branches.map((branch) => `<button type="button" class="branch-selector" aria-controls="sucursal-${branch.id}" aria-pressed="false">${esc(branch.name)}</button>`).join("")}</div>` : "";
  const cards = branches.map((branch) => `<article class="branch-card" id="sucursal-${branch.id}" data-branch-panel><div class="branch-copy"><h3>${esc(branch.name)}</h3>${branch.fullAddress ? `<address>${esc(branch.fullAddress)}</address>` : ""}${branch.hours.map((period) => `<p>${esc(period.dayOfWeek.map((day) => days[day]).join(", "))} · ${period.opens}–${period.closes}</p>`).join("")}<div class="contact-actions">${branch.phone ? link("tel:" + branch.phone, branch.phone) : ""}${branch.whatsapp ? link(branch.whatsapp.href, branch.whatsapp.label) : ""}${branch.map ? link(branch.map, "Cómo llegar") : ""}</div></div>${branch.embedded ? `<div class="map"><iframe title="Mapa de ${esc(branch.name)}" src="${esc(branch.embedded)}" width="600" height="420" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>` : ""}</article>`).join("");
  return { structured, branches, html: `<section id="contacto" class="contact reveal" aria-labelledby="contacto-titulo"><div class="section-heading"><h2 id="contacto-titulo">Ubicación y contacto</h2>${config.negocio.cobertura ? `<p>${esc(config.negocio.cobertura)}</p>` : ""}</div><div class="contact-actions">${contacts.map((contact) => link(contact.href, contact.label, "button button-brand")).join("")}</div>${selectors}${cards}${!contacts.length && !branches.length ? '<p>Datos de contacto pendientes de confirmación.</p>' : ""}${config.avisoPrivacidad ? `<p class="privacy">${link(https(config.avisoPrivacidad, "Aviso de privacidad").href, "Aviso de privacidad", "text-link")}</p>` : ""}</section>` };
}

function footer(config) {
  const id = required(config.contador?.id, "contador.id estable y exclusivo del negocio");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._~/-]{0,199}$/.test(id) || !id.split("/")[0].includes(".") || id.endsWith("/") || id.endsWith(".svg") || id.includes("//") || id.split("/").some((part) => part === "." || part === "..")) throw new Error("contador.id debe ser una clave Hits estable con dominio y ruta, sin protocolo, consulta ni sufijo .svg.");
  const src = "https://hits.sh/" + id + ".svg?label=%20&color=e30613&labelColor=e30613&style=flat-square";
  const whatsapp = contactLink({ tipo: "whatsapp", valor: "8115963472", mensaje: "Hola, Matangazo. Vi la página de " + config.negocio.nombre + " y me interesa Presencia Web para mi negocio." });
  return `<footer class="matangazo-footer"><div class="shell agency-footer"><div class="visit-counter"><span class="visit-label">Tus visitas</span><div class="visit-total" role="status"><img id="visit-counter-image" data-counter-src="${esc(src)}" alt="Visitas acumuladas del sitio" width="180" height="56" loading="lazy" decoding="async" fetchpriority="low" hidden><span id="visit-counter-status">Cargando…</span></div><span class="visit-caption">Visitas acumuladas</span><noscript><img src="${esc(src)}" alt="Visitas acumuladas del sitio" width="180" height="56" loading="lazy" decoding="async" fetchpriority="low"><style>.visit-total{display:none}</style></noscript></div><a class="agency-brand" href="https://matangazo.mx/" aria-label="Visitar Matangazo.mx"><img src="./assets/matangazo-oficial.png" alt="Matangazo" width="120" height="82" loading="lazy" decoding="async"></a><p class="agency-message">Digitaliza tu negocio con Presencia Web de Matangazo.</p>${link(whatsapp.href, "Escríbenos por WhatsApp", "button agency-cta")}</div></footer>`;
}

export function renderPage(config, assets = new Set()) {
  if (!["demo", "produccion"].includes(config.modo)) throw new Error("modo debe ser demo o produccion.");
  const { negocio, seo, marca = {}, portada = {} } = config;
  const name = required(negocio?.nombre, "negocio.nombre");
  const offer = required(negocio.oferta, "negocio.oferta");
  const canonical = https(seo?.url, "seo.url");
  if (canonical.search || canonical.hash || !canonical.pathname.endsWith("/")) throw new Error("seo.url debe terminar en / y carecer de parámetros y anclas.");
  const title = required(seo.titulo, "seo.titulo");
  const description = required(seo.descripcion, "seo.descripcion");
  const social = new URL(asset(seo.social.archivo, assets), canonical).href;
  if (!Array.isArray(config.servicios) || config.servicios.length < 1 || config.servicios.length > 6) throw new Error("Indica entre uno y seis servicios o grupos.");
  const contacts = (config.contactos ?? []).map(contactLink);
  const contact = contactSection(config, contacts);
  const primary = contacts.find((item) => item.tipo === "whatsapp") ?? contacts[0];
  const branchPhone = contact.branches.find((item) => item.phone)?.phone;
  if (config.modo === "produccion" && !primary && !branchPhone && !contact.branches.some((item) => item.whatsapp)) throw new Error("Indica al menos un canal de contacto directo para producción.");
  const headerContact = primary ?? { href: branchPhone ? "tel:" + branchPhone : "#contacto", label: branchPhone || "Contacto" };
  const logo = marca.logo ? `<img src="${esc(asset(marca.logo, assets))}" alt="" width="160" height="64" loading="lazy" decoding="async">` : `<span class="brand-name">${esc(name)}</span>`;
  if (marca.color && !/^#[\da-f]{6}$/i.test(marca.color)) throw new Error("marca.color debe usar formato #RRGGBB.");
  const accent = marca.color ? ` style="--brand:${esc(marca.color)}"` : "";
  const target = portada.destino ?? "contacto";
  if (!["servicios", "contacto"].includes(target)) throw new Error("portada.destino debe ser servicios o contacto.");
  const presentation = config.presentacion ?? {};
  const schema = contact.structured.length ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": contact.structured }).replace(/</g, "\\u003c")}</script>` : "";
  return `<!doctype html>
<html lang="es-MX"${accent}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical.href)}"><link rel="icon" href="${esc(asset(marca.favicon, assets))}">
${config.modo === "demo" || seo.indexar === false ? '<meta name="robots" content="noindex">' : ""}
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${esc(canonical.href)}"><meta property="og:locale" content="es_MX"><meta property="og:image" content="${esc(social)}"><meta property="og:image:alt" content="${esc(required(seo.social.alt, "Texto alternativo de imagen social"))}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
${schema}<link rel="stylesheet" href="./base.css"><script src="./menu.js" defer></script></head><body>
<a class="skip-link" href="#main">Saltar al contenido</a><header class="header" id="inicio"><div class="shell header-inner"><a class="brand" href="#inicio" aria-label="${esc(name)}">${logo}</a><button class="mobile-menu" type="button" aria-expanded="false" aria-controls="navegacion" hidden>Menú</button><nav id="navegacion" aria-label="Navegación principal"><a href="#presentacion">Conócenos</a><a href="#servicios">Servicios</a>${link(headerContact.href, headerContact.label, "button button-brand")}</nav></div></header>
<main id="main" class="shell" tabindex="-1"><section class="hero" aria-labelledby="titulo"><div class="hero-copy"><h1 id="titulo">${esc(name)}</h1><p class="hero-heading">${esc(portada.mensaje ?? offer)}</p>${portada.detalle ? `<p>${esc(portada.detalle)}</p>` : ""}${link("#" + target, portada.cta ?? "Ver contacto", "button button-white")}${config.modo === "demo" ? '<p class="demo-note">Sitio de demostración</p>' : ""}</div>${portada.imagen ? image(portada.imagen, assets, true) : ""}</section>
<section id="presentacion" class="overview reveal" aria-labelledby="presentacion-titulo"><h2 id="presentacion-titulo">${esc(presentation.titulo ?? "Lo que ofrecemos")}</h2><div class="overview-card"><p>${esc(presentation.texto ?? offer)}</p><ul>${config.servicios.map((service, index) => `<li><a href="#servicio-${index + 1}" data-open-service="servicio-${index + 1}">${esc(service.nombre)}</a></li>`).join("")}</ul></div></section>
${serviceSection(config.servicios, assets)}${contact.html}</main>${footer(config)}</body></html>\n`;
}
