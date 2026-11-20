# Flujo de producción de Presencia Web

Trabaja en un proyecto independiente por cliente a partir de una revisión autorizada de la [Plantilla 1](../plantillas/plantilla-01/README.md). Registra el SHA o la etiqueta y conserva allí los materiales, datos y aprobaciones del cliente.

Toda demostración y prueba de reproducción requiere un negocio real autorizado por Matangazo. Aplica la [regla obligatoria de alcance](../estandares/alcance.md#casos-reales-exclusivamente). No inventes datos faltantes.

## Preparación de la página

| Etapa | Acción y resultado |
| --- | --- |
| 1. Definir el contenido | Registra la oferta, los servicios solicitados, la acción principal y los datos que deban confirmarse en la [ficha de materiales](materiales-cliente.md). |
| 2. Resolver los materiales | Prepara imágenes, identidad, colores, textos y recursos gráficos con el material disponible. Busca recursos con derechos de uso adecuados o genera los que hagan falta. Registra la procedencia y mantén la preparación en marcha mientras se confirman los datos reales. |
| 3. Construir | Aplica las seis secciones de la especificación y sus interacciones aprobadas. Conserva el detalle de los servicios agrupados y el contenido esencial en HTML. Prepara los metadatos a partir de los datos de la página. |
| 4. Revisar la vista previa | Sirve la salida estática y abre una versión navegable en escritorio y móvil. Comprueba los recorridos principales, los enlaces, el teclado y la preferencia de movimiento reducido. En una demo, usa `noindex` e identifica el carácter de demostración, los recursos ilustrativos y las confirmaciones pendientes sin inventar datos. |
| 5. Cerrar la evaluación | Usa la [ficha de auditoría](auditoria.md), corrige incumplimientos y reúne el resultado de PageSpeed Insights y la aprobación visual. Registra las comprobaciones que dependan de una URL autorizada o de la URL final. |

El [README de la Plantilla 1](../plantillas/plantilla-01/README.md#compilación) describe cómo compilar y revisar la base actual. La reconstrucción cuenta con comprobaciones iniciales y está pendiente de la validación completa y la aprobación visual.

## Publicación e infraestructura

La preparación de materiales y la vista previa local forman parte de la producción. Matangazo autoriza por separado la publicación de una versión y cualquier cambio de infraestructura, como habilitar alojamiento, configurar un flujo de despliegue, cambiar la visibilidad de un repositorio o modificar un dominio, subdominio o DNS. Registra el alcance de la autorización, el repositorio, la versión y la URL antes de ejecutar esos cambios. Para demostraciones públicas, el procedimiento existente contempla GitHub Pages cuando Matangazo autoriza su uso.

Antes de publicar, confirma la versión aprobada, los datos reales, un canal de contacto funcional, los derechos de uso aplicables y la configuración de indexación de esa versión. Al publicarla, comprueba en la URL final los controles que dependan de ella, incluidos HTTPS, metadatos, imagen social y enlaces. Vincula la evidencia a la versión publicada y registra el resultado en la ficha de auditoría.

## Registro de entrega

- **Proyecto y modo** — [negocio, demo o producción].
- **Versión y URL revisada** — [SHA o etiqueta y enlace].
- **Auditoría y PageSpeed Insights** — [evidencia y fecha].
- **Confirmaciones y aprobaciones** — [datos, revisión visual y autorización de publicación cuando corresponda].

## Logotipo y contador

Usa los [recursos oficiales](../recursos/matangazo/README.md) en banners y footers y al preparar otras plantillas. Conserva el diseño oficial y copia la versión web con la plantilla.

Antes de construir, registra el identificador del negocio y su `contador.id` permanente. Para una instancia nueva asigna una clave Hits exclusiva con dominio y ruta. Si ya existe un contador, reutiliza exactamente su clave. Mantén una clave distinta para pruebas. Al cambiar el dominio de la página, actualiza `seo.url` y conserva `contador.id`.

Comprueba una solicitud al badge, su prioridad baja y sus estados de carga, éxito y error. El número mostrado procede de Hits y representa visitas acumuladas, incluidas recargas, según las solicitudes que el servicio registra. Los fallos o bloqueos muestran «No disponible». Esta integración reutiliza el servicio existente de Express Care y forma parte de la construcción autorizada. Los cambios de alojamiento, dominio y DNS siguen el apartado de publicación e infraestructura.
