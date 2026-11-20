# Auditoría · Taller El Moreno
Fecha local: 19 de noviembre de 2026.
Versión: candidata local v0.1.0 para revisión de Matangazo.
URL revisada: http://127.0.0.1:4174/
Estado general: **Pendiente de aceptación final**. Página implementada y navegable; publicación no autorizada.

## Alcance de la comprobación
Navegador real: escritorio 1280×800 y móvil 375×812. Se revisaron portada, cinco pestañas, menú, teclado, contacto, mapa y footer.
No se inventan puntuaciones: PageSpeed Insights no ejecutado; Lighthouse no está instalado en las herramientas disponibles. No se instaló tecnología adicional al proyecto.
La comparación funcional y visual usa la Plantilla 1 y el código autorizado de Express Care, sin reconstruir la arquitectura.

| # | Criterio | Estado | Evidencia / límite |
|---|---|---|---|
| 1 | Un H1 y oferta clara | Cumple | Un h1; Taller El Moreno, afinación y mantenimiento visibles en portada. |
| 2 | CTA visible sin scroll | Cumple | Borde inferior 520.8 px en escritorio (alto 800) y 421.8 px en móvil (alto 812). |
| 3 | Texto sin relleno ni erratas | Cumple | Revisión de todos los textos comerciales; solo servicios autorizados y leyenda de demostración. |
| 4 | Enlaces válidos y anclas existentes | Cumple | Ninguna ancla interna sin id; no hay href vacío ni # aislado. Maps abre la dirección y los WhatsApp usan wa.me. La disponibilidad futura de servicios externos no se garantiza. |
| 5 | Formatos de contacto | Cumple | tel:+528117054320; wa.me/528117054320 con texto codificado. Footer usa contacto propio de Matangazo. |
| 6 | Canal de contacto visible | Cumple | WhatsApp en encabezado, portada y contacto. No se envió ningún mensaje de prueba. |
| 7 | noopener en nuevas pestañas | N/A | El HTML propio no utiliza target=_blank. |
| 8 | Footer oficial | Cumple | Logotipo original sin modificación, enlace Matangazo, mensaje, WhatsApp y badge Hits cargados en móvil. |
| 9 | Favicon | Cumple | favicon.webp derivado del isotipo, presente y referenciado. |
| 10 | Open Graph completo | No verificado | Etiquetas e imagen local 1200×630 y 108885 bytes preparadas. URL pública y respuesta 200 de og:image pendientes. |
| 11 | JSON-LD | Cumple | JSON válido AutoRepair, nombre/teléfono/dirección/horarios coincidentes; código postal omitido por autorización. URL técnica local pendiente de sustituir en publicación. |
| 12 | Título | Cumple | Taller El Moreno y giro/ciudad; menos de 60 caracteres. |
| 13 | Descripción | Cumple | 124 caracteres; describe los servicios existentes. |
| 14 | Encabezados | Cumple | Un h1; secciones h2; servicios y sucursal h3; sin encabezados vacíos. |
| 15 | Canónica y og:url | No verificado | Coinciden en base técnica https://localhost/; falta URL final autorizada. No presentar ese valor como dirección pública. |
| 16 | Idioma y viewport | Cumple | es-MX y width=device-width, initial-scale=1. |
| 17 | Alternativas de imagen | Cumple | Alt descriptivos de fotografías; logo decorativo dentro de enlace etiquetado; leyendas Imagen ilustrativa. |
| 18 | Sin desborde | Cumple | scrollWidth 1265 ≤ 1280 y 360 ≤ 375 en mediciones reales. |
| 19 | Controles táctiles | Cumple | CTA ≥46 px alto; menú 66.45×47.2; pestañas con mínimo 48 px y dos columnas en móvil. |
| 20 | Texto legible | Cumple | Revisión DOM: ningún texto de contenido visible menor a 12 px en móvil. |
| 21 | Flotantes sin obstrucción | N/A | No existen elementos flotantes en esta revisión de la plantilla. |
| 22 | Menú y salto al contenido | Cumple | Apertura/cierre móvil y Escape comprobados; enlace #main e id correspondiente. |
| 23 | Carga de imágenes | Cumple | Portada con dimensiones/fetchpriority high; resto lazy/async; excepción Hits activada tras carga inicial con prioridad baja. |
| 24 | Carga ligera | Cumple | Todos los recursos gráficos optimizados propios suman 358991 bytes; cada foto <48 KB. Sin dependencias de ejecución. No se presenta un conteo completo de solicitudes de Google Maps como medición de laboratorio. |
| 25 | Consola | Cumple | Sin errores ni advertencias en revisión de escritorio y móvil. |
| 26 | HTTPS final / contenido mixto | No verificado | Recursos externos del HTML usan HTTPS. Preview loopback HTTP; comprobar certificado y ausencia de contenido mixto en hosting autorizado. |
| 27 | Restos de plantilla | Cumple | Sin TODO/FIXME/placeholder ni Express Care/Valvoline en el HTML generado. La URL técnica local está declarada como pendiente en metadatos. |
| 28 | Interacciones | Cumple | Cinco pestañas en móvil, contenido/imagen correctos, un panel visible; flechas/Home/End en escritorio; menú/Escape y mapa; badge real. prefers-reduced-motion existe en CSS; no se emuló esa preferencia en el navegador. |
| 29 | Contenido sin JavaScript | No verificado | Todos los textos, servicios, fichas y JSON-LD están en el HTML estático. Paneles no llevan hidden de origen. La navegación de comprobación sin menu.js no se completó por pérdida de la pestaña; falta confirmar renderizado en navegador con JS deshabilitado. |

## Requisitos de aceptación
- Seis secciones y orden de Plantilla 1: comprobados.
- Cinco servicios exactos y ausencia de especialidades no confirmadas: comprobados.
- Identidad propia y recursos: preparados; aprobación visual de Matangazo pendiente.
- Mapa: enlace fuente muestra 3749 Prol Madero; iframe interactivo carga ese punto. No se afirma validación de una ficha comercial en Google.
- Footer: identidad oficial de Matangazo conservada; contador con clave de prueba exclusiva y visitas reales de las revisiones.
- Motion reducido: reglas conservadas; prueba con preferencia del sistema pendiente.
- Sin JavaScript: comprobación estática positiva; revisión visual pendiente.
- Accesibilidad: estructura, alt, teclado, tamaños y foco revisados; no se afirma una certificación ni una puntuación automatizada.
- Lighthouse local: no ejecutado, herramienta no instalada.
- Publicación: no realizada; no se habilitó GitHub Pages.
- Las referencias permanecen intactas: solamente se consultaron recursos mediante GET; SHA del maestro 5ca53f5033cde982374cf7b8b09abb8d88bbf3ca y referencia Express Care ef54981a1030e5228911973400c7dc36f1cb1808. Las escrituras se limitan al proyecto y repositorio del taller.

## PageSpeed Insights
Pendiente de URL pública y autorización. Se requieren ≥90 en cada categoría, en móvil y escritorio.

| Categoría | Móvil | Escritorio |
|---|---|---|
| Rendimiento | No verificado | No verificado |
| Accesibilidad | No verificado | No verificado |
| Buenas prácticas | No verificado | No verificado |
| SEO | No verificado | No verificado |

## Antes de subir los archivos al hosting
1. Obtener aprobación visual de Matangazo.
2. Completar comprobación visual sin JavaScript y de movimiento reducido.
3. Establecer seo.url con la URL HTTPS autorizada; recompilar.
4. Elegir clave de contador definitiva, separada de la prueba, y conservarla en futuras migraciones.
5. Confirmar modo de demostración/indexación autorizados.
6. Subir el contenido de dist al hosting solo cuando se autorice; verificar recursos, URLs, HTTPS, mapa y contador finales.
7. Medir PageSpeed Insights y resolver resultados inferiores a 90.
La página se entrega para revisión, no como aceptación final aprobada.
