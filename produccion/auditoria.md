# Ficha de auditoría y aceptación

Audita cada página según el [estándar de calidad](../estandares/calidad.md). Revisa una versión navegable a 1280 px de ancho en escritorio y 375 px en móvil. Usa teclado donde aplique y comprueba el punto 29 con JavaScript deshabilitado.

## Registro

- **Proyecto, modo y objetivo** — [negocio, demo o producción, objetivo].
- **Versión y URL o entorno** — [SHA o etiqueta, dirección, fecha, navegador].
- **Responsable de la auditoría** — [nombre].
- **Conteo técnico** — [Cumple __ · Incumple __ · N/A __ · No verificado __].
- **Veredicto final** — [Terminado / Pendiente].
- **Autorización de publicación, si corresponde** — [alcance, versión, URL, responsable y fecha].

Marca **Cumple** con evidencia, **Incumple** con el hallazgo, **N/A** con una justificación breve si el criterio completo no aplica y **No verificado** cuando falte comprobarlo. **Terminado** requiere los 29 puntos como Cumple o N/A justificado, todos los requisitos de aceptación acreditados y aprobación visual.

## Criterios técnicos

| # | Punto | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | A · H1 único y primer pantallazo claro | — | — |
| 2 | A · CTA principal visible sin desplazamiento | — | — |
| 3 | A · Texto limpio | — | — |
| 4 | B · Sin enlaces muertos ni vacíos | — | — |
| 5 | B · Formatos de contacto válidos | — | — |
| 6 | B · Canal de contacto visible y funcional | — | — |
| 7 | B · Pestañas nuevas con protección | — | — |
| 8 | C · Footer, logotipo oficial y contador de Matangazo | — | — |
| 9 | C · Favicon | — | — |
| 10 | C · Open Graph completo | — | — |
| 11 | C · JSON-LD válido y consistente | — | — |
| 12 | D · Título único | — | — |
| 13 | D · Descripción fiel | — | — |
| 14 | D · Encabezados en orden | — | — |
| 15 | D · Canónica y `og:url` coinciden | — | — |
| 16 | D · Idioma y viewport | — | — |
| 17 | D · Alternativas de imágenes | — | — |
| 18 | E · Sin desborde horizontal | — | — |
| 19 | E · Áreas táctiles | — | — |
| 20 | E · Texto legible | — | — |
| 21 | E · Flotantes sin obstrucción | — | — |
| 22 | E · Menú móvil y salto de contenido | — | — |
| 23 | E · Imágenes con carga apropiada | — | — |
| 24 | F · Carga inicial ligera | — | — |
| 25 | G · Consola limpia | — | — |
| 26 | G · HTTPS sin contenido mixto | — | — |
| 27 | G · Sin restos de plantilla | — | — |
| 28 | G · Interacciones operativas | — | — |
| 29 | G · Contenido clave en HTML | — | — |

## Requisitos de aceptación

| Requisito | Estado | Evidencia |
| --- | --- | --- |
| Fidelidad a la estructura visual | — | Secciones, orden, comparación con la referencia y capturas de ambas vistas. |
| Contenido solicitado | — | Ficha del proyecto, cantidad de servicios o grupos y detalle conservado. |
| Interacciones | — | Pruebas en escritorio y móvil, teclado cuando aplique y movimiento reducido. |
| Calidad visual profesional | — | Revisión de ambas vistas y aprobación visual de Matangazo con versión, responsable y fecha. |

| Logotipo oficial | — | Recurso compartido, diseño, color, proporciones y transparencia. |
| Contador Hits | — | Clave exclusiva, continuidad al migrar, visitas acumuladas reales, carga de baja prioridad, estados de error y vista móvil. |

### PageSpeed Insights

Registra la URL y la fecha de la medición y adjunta evidencia de ambos informes. Se requieren **90 puntos o más en cada celda**.

| Categoría | Móvil | Escritorio |
| --- | --- | --- |
| Rendimiento | — | — |
| Accesibilidad | — | — |
| Buenas prácticas | — | — |
| SEO | — | — |

## Pendientes y datos del cliente

| Criterio, requisito o dato | Hallazgo o comprobación pendiente | Siguiente acción y responsable |
| --- | --- | --- |
| — | — | — |

Verifica que la candidata corresponde a un negocio real autorizado y que no contiene datos ni recursos de negocios ficticios. Registra cualquier confirmación pendiente sin inventar datos. Cierra en la URL final los controles que dependan de esa dirección, cuando corresponda. Registra la autorización de publicación y de cambios de infraestructura conforme al [flujo de producción](instrucciones.md#publicación-e-infraestructura).
