# Deficiencias y ajustes de la prueba
Fecha local: 19 de noviembre de 2026. Negocio: Taller El Moreno.

## D1 · Código postal obligatorio (técnica / datos)
El generador original falla con «Código postal es obligatorio.» al recibir la dirección confirmada sin código postal. Impide generar la ficha y JSON-LD sin inventar datos.
**Ajuste autorizado por el usuario en esta conversación:** hacer opcional postalCode únicamente en la copia del taller. También se omite el elemento vacío al componer la dirección visible. No se añadió un código postal supuesto.

## D2 · CTA de portada restringido a anclajes (funcional)
La configuración original permite solamente servicios/contacto. Produce href="#contacto" para «Agenda tu servicio», aunque el encargo exige WhatsApp directo.
**Ajuste autorizado:** añadir destino whatsapp, que resuelve el contacto WhatsApp configurado, y conservar los dos destinos previos. Solo cambia la copia del cliente.

## D3 · Vista previa no incluida como comando (documental)
La revisión maestra consultada solo define npm run build y describe servir dist mediante HTTP sin un comando npm run preview. Se añadió al proyecto del taller un servidor basado en scripts/serve.mjs de Express Care ef54981. Conserva validación de rutas, tipos MIME y servicio en loopback; añade WebP, puerto y nombre propios. No cambia la plantilla.

## D4 · URL HTTPS requerida antes de conocer la URL final (técnica / documental)
El generador requiere seo.url HTTPS aun para una demo local. No existe una URL comercial autorizada en el encargo. Se usa https://localhost/ exclusivamente como base técnica de compilación; los metadatos dependientes de publicación quedan pendientes. No publicar ese valor.

## D5 · Valores de color fijos (visual)
marca.color configura --brand pero varios colores secundarios siguen siendo azules de la referencia. La instancia incluye cliente/marca.css para aplicar la paleta gris/negra y mantener intacta la identidad oficial azul/roja de Matangazo. No se cambió la composición ni las seis secciones.

## Alcance real de la prueba
Esta candidata reproduce la base existente con los dos ajustes de componentes autorizados. No demuestra que la revisión original funcione sin ajustes para este caso. Solo componentes.mjs cambia respecto del componente original; base.css, menu.js y construir.mjs se conservan. La capa de marca, los datos, los recursos y los scripts de entrega pertenecen al cliente.
No se realizó ninguna operación de escritura en los repositorios de referencia.
