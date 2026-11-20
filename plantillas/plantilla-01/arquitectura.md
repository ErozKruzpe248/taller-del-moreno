# Arquitectura de referencia de la Plantilla 1

[Express Care México](https://github.com/ErozKruzpe248/express-care-mexico) es la referencia visual y funcional. La revisión de código documentada parte del [commit `ef54981`](https://github.com/ErozKruzpe248/express-care-mexico/commit/ef54981a1030e5228911973400c7dc36f1cb1808). La referencia se consulta en modo de solo lectura. La [especificación aprobada](README.md#especificación-aprobada) determina qué se implementará.

## Patrones de la referencia

| Componente | Patrón observado y aplicación a la reconstrucción |
| --- | --- |
| Encabezado, portada y presentación | La referencia ofrece navegación compacta, salto al contenido, mensaje visible, imagen y CTA. Mantener la jerarquía y el acceso rápido al contacto. La presentación breve debe tener su lugar propio después de la portada. [Marcado de referencia](https://github.com/ErozKruzpe248/express-care-mexico/blob/ef54981a1030e5228911973400c7dc36f1cb1808/src/index.html) |
| Servicios | La referencia usa pestañas con navegación por teclado y una presentación compacta. En la Plantilla 1, cada servicio o grupo conserva sus detalles esenciales en HTML. El script cambia el panel activo y su presentación según el tamaño de pantalla. [Interacciones de referencia](https://github.com/ErozKruzpe248/express-care-mexico/blob/ef54981a1030e5228911973400c7dc36f1cb1808/src/app.js#L23-L187) |
| Ubicación y contacto | La referencia actualiza la ficha y el mapa al cambiar de sucursal. En la Plantilla 1, las fichas de todas las sucursales son legibles sin JavaScript. El selector coordina los datos y el mapa cuando corresponde. La dirección y el enlace de indicaciones sirven de alternativa si el mapa no carga. [Selector y mapa de referencia](https://github.com/ErozKruzpe248/express-care-mexico/blob/ef54981a1030e5228911973400c7dc36f1cb1808/src/app.js#L310-L381) |
| Footer | Tomar la ubicación del crédito como referencia. El componente aprobado incluye identidad visual, enlace, mensaje y botón de WhatsApp propios de Matangazo. [Footer de referencia](https://github.com/ErozKruzpe248/express-care-mexico/blob/ef54981a1030e5228911973400c7dc36f1cb1808/src/index.html#L371-L388) |
| Diseño adaptable y movimiento | La referencia usa variables CSS, estilos compartidos, foco visible y reglas para tamaños de pantalla y movimiento reducido. Aplicar estos patrones con los colores y recursos de cada instancia y comprobar las animaciones, transiciones y estados interactivos en escritorio y móvil. [Estilos de referencia](https://github.com/ErozKruzpe248/express-care-mexico/blob/ef54981a1030e5228911973400c7dc36f1cb1808/src/styles.css) |

## Aplicación en la Plantilla 1

- Mantener componentes reutilizables y una fuente de datos por instancia. Las fichas y sus datos estructurados proceden de los mismos datos confirmados.
- Generar el contenido esencial en HTML estático. Usar JavaScript para mejorar la interacción y CSS para adaptar la composición y respetar la preferencia de movimiento reducido.
- Separar la fuente de la salida estática. Los recursos internos pueden usar rutas relativas y los metadatos que dependen de la URL pública deben usar la URL de la instancia.
- Adaptar la composición a cada negocio y usar sus propios textos, datos, identidad y recursos con derechos de uso adecuados.

El [estado de la implementación](README.md#implementación-disponible) describe lo que ya genera el código. Los patrones anteriores orientan la reconstrucción y se validarán con la [ficha de auditoría](../../produccion/auditoria.md).

## Recursos y contador compartidos

El footer carga el logotipo desde `recursos/matangazo/`. La versión web conserva el raster oficial y su transparencia, con un encuadre ajustado. El generador lo copia a la salida de cada instancia.

La integración Hits proviene de Express Care en la revisión `ef54981a1030e5228911973400c7dc36f1cb1808`. La Plantilla 1 recibe una clave explícita por negocio en `contador.id`, la mantiene independiente de `seo.url` y genera el badge con prioridad baja. El script añade la carga tras el evento de carga de la página, con una única solicitud y estados de carga y error. Los archivos de Express Care se han consultado como referencia de solo lectura.
