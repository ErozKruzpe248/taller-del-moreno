# Plantilla 1 · Landing informativa

Plantilla reutilizable con [Express Care México](https://github.com/ErozKruzpe248/express-care-mexico/tree/ef54981a1030e5228911973400c7dc36f1cb1808) como referencia visual y funcional. La reconstrucción está implementada y cuenta con comprobaciones iniciales de compilación y funcionamiento. La validación completa y la aceptación visual corresponden a las fases 4 y 5.

## Especificación aprobada

| Orden | Sección y resultado esperado |
| --- | --- |
| 1 | Encabezado con logotipo, navegación y contacto. |
| 2 | Portada con imagen, promoción confirmada o mensaje comercial y llamado principal visible al cargar. |
| 3 | Presentación breve de lo que ofrece el negocio. |
| 4 | Servicios en pestañas interactivas adaptadas a móvil. Mostrar la cantidad solicitada, hasta seis servicios o grupos, y conservar el detalle de cada servicio al agrupar. |
| 5 | Ubicación y contacto con mapa cuando haya una ubicación pública confirmada. Selector para varias sucursales y contacto por WhatsApp cuando esté disponible. |
| 6 | Footer exclusivo de Matangazo con logotipo oficial, identidad visual, enlace a matangazo.mx, mensaje comercial, botón de WhatsApp para prospectos y contador acumulativo de visitas del negocio. |

La composición profesional debe ser comparable a Express Care en escritorio y móviles, con animaciones perceptibles y optimizadas, hover, microinteracciones y transiciones fluidas. Respeta la preferencia de movimiento reducido. Los contenidos esenciales de servicios y sucursales se generan en HTML y permanecen legibles sin JavaScript.

Matangazo prepara las imágenes, la identidad y los recursos que falten, y confirma los datos reales mediante la [ficha de materiales](../../produccion/materiales-cliente.md). La aceptación se registra con el [estándar de calidad](../../estandares/calidad.md) y la [ficha de auditoría](../../produccion/auditoria.md).

## Implementación disponible

- `construir.mjs` lee la configuración y copia la salida estática y los recursos referenciados a `dist/`.
- `src/componentes.mjs` genera los componentes de encabezado, portada, presentación, servicios, ubicación/contacto, footer y metadatos.
- `src/base.css` adapta la composición y los estados interactivos a escritorio y móvil.
- `src/menu.js` controla menú, pestañas, sucursales, animaciones de entrada y carga diferida del contador.

Las pestañas permiten flechas izquierda/derecha, Inicio y Fin. En móvil se distribuyen en dos columnas y conservan el mismo contenido. Las sucursales mantienen sus fichas HTML completas, con un selector que muestra la elegida. Los mapas se cargan de forma diferida y conservan un enlace directo de indicaciones.

El contador usa el badge de Hits de la revisión de referencia `ef54981a1030e5228911973400c7dc36f1cb1808`. El navegador programa una solicitud de baja prioridad después de la carga inicial y la muestra como visitas acumuladas. Ante error o espera superior a 12 segundos aparece «No disponible». Sin JavaScript, se utiliza el badge diferido de `noscript`.

Las demostraciones y pruebas de reproducción se realizan únicamente con negocios reales autorizados, según la [regla de alcance](../../estandares/alcance.md#casos-reales-exclusivamente). Los datos y materiales de cada negocio se conservan fuera del maestro.

## Compilación

Usa Node.js 20 o superior. Prepara el JSON y su carpeta `assets/` fuera del maestro. Desde la carpeta de la plantilla, ejecuta:

```sh
npm run build -- <ruta-al-JSON-del-cliente>
```

Sirve `dist/` con un servidor HTTP local para revisar la página. La compilación reemplaza el contenido previo de esa carpeta. Conserva la estructura del maestro al copiar la plantilla para que se resuelva `../../recursos/matangazo/`, o copia también los recursos compartidos a esa misma ruta relativa.

## Configuración de una instancia

| Campo | Datos |
| --- | --- |
| `modo` | `demo` o `produccion`. Demo de un negocio real añade una leyenda de demostración y `noindex`. |
| `negocio` | `nombre`, `oferta` y `cobertura` opcional. |
| `seo` | `url` HTTPS terminada en /, sin consulta ni ancla, `titulo`, `descripcion` y `social` con `archivo` y `alt`. Prepara la imagen social a 1200×630. `indexar: false` añade `noindex`. |
| `marca` | `favicon`, `logo` opcional y `color` opcional en #RRGGBB. La identidad de Matangazo se incorpora desde los recursos oficiales. |
| `portada` | `mensaje`, `detalle`, `cta`, `destino` (`contacto` o `servicios`) e `imagen`. El mensaje usa `negocio.oferta` cuando se omite. |
| `presentacion` | `titulo` y `texto`. Si se omiten, se usa «Lo que ofrecemos» y la oferta del negocio. |
| `servicios` | Entre uno y seis registros con `nombre` y `descripcion`. Admiten `imagen`, `precio` confirmado y `elementos` para los servicios agrupados. Cada elemento conserva su `nombre`, `descripcion` y `precio` opcional. |
| `contactos` | Lista con `tipo` (`telefono`, `whatsapp`, `correo` o `enlace`) y `valor`. WhatsApp admite `mensaje`. `etiqueta` es obligatoria para enlaces genéricos y opcional para los demás. Teléfonos mexicanos de 10 dígitos con prefijo +52 opcional. |
| `sucursales` | Lista con `id` único en minúsculas con letras, números y guiones entre segmentos, y `nombre`. Admite `telefono`, `whatsapp`, `direccion` con `calle`, `localidad`, `estado`, `cp`, y `horarios` con `dias` en inglés, `abre` y `cierra` en HH:MM. `mapa` y `mapaEmbed` admiten URL HTTPS. Si hay dirección se derivan las URL de Maps. |
| `contador.id` | Obligatorio. Clave exclusiva y permanente del negocio en formato dominio/ruta, sin protocolo, consulta ni sufijo .svg. Para un negocio nuevo, asignar por ejemplo `matangazo.mx/presencia-web/<identificador-del-negocio>`. Para uno con contador existente, conservar exactamente su clave anterior. |
| `tipoNegocio`, `avisoPrivacidad` | Subtipo de Schema.org y enlace HTTPS al aviso, respectivamente, cuando correspondan. |

Las imágenes usan `archivo`, `alt`, `ancho`, `alto` e `ilustrativa: true` cuando corresponda. Los archivos referenciados se colocan en `assets/` junto al JSON. El generador identifica las imágenes ilustrativas con una leyenda.

La base conserva los campos existentes de configuración. Al migrar una instancia anterior, añade `contador.id` y completa la imagen de portada y los datos requeridos por su versión final. El máximo de seis servicios o grupos se valida al compilar. El JSON-LD se genera por sucursal cuando existen teléfono, dirección y horario, desde los mismos datos que sus fichas. Revisa el criterio 11 en cada instancia.

## Identidad y continuidad del contador

Mantén un registro del negocio y su `contador.id` en el proyecto del cliente. La clave identifica su histórico en Hits y se conserva al migrar dominios, repositorios o rutas públicas. La URL pública en `seo.url` puede cambiar de forma independiente. Asigna una clave diferente a cada negocio y una clave de prueba distinta a las instancias definitivas.

El footer usa el [recurso oficial de Matangazo](../../recursos/matangazo/README.md). El destino de su WhatsApp y el mensaje se basan en la referencia aprobada. Mantén los datos del cliente en ubicación/contacto.

## Pendiente de aceptación

La Fase 4 debe completar la auditoría de los 29 criterios, las comprobaciones visuales y funcionales sobre una candidata con materiales confirmados y PageSpeed Insights con mínimo 90 por categoría en móvil y escritorio. La Fase 5 registra la entrega y la aprobación correspondiente.
