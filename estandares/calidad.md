# Estándar de calidad de Presencia Web

Evalúa la versión renderizada de la página. La [especificación de la Plantilla 1](../plantillas/plantilla-01/README.md#especificación-aprobada) define la estructura, el diseño y las interacciones esperadas. Registra las comprobaciones en la [ficha de auditoría y aceptación](../produccion/auditoria.md).

## Cómo verificar

- Abre la versión candidata en un navegador real a 1280 px de ancho en escritorio y 375 px en móvil. Comprueba con teclado donde corresponda y deshabilita JavaScript para el punto 29.
- Registra cada punto como **Cumple** con evidencia, **Incumple** con el hallazgo, **N/A** con una justificación breve cuando el criterio completo no aplique o **No verificado** con la comprobación pendiente.
- Registra por separado las confirmaciones del cliente sobre datos del negocio, promociones, derechos de uso, avisos, reseñas y testimonios. La comprobación del contenido solicitado y la autorización de publicación se registran junto a la auditoría. Toda demo y prueba de reproducción corresponde a un negocio real autorizado. Revisa las leyendas de demostración, los recursos ilustrativos y las confirmaciones pendientes; no se admiten datos ficticios. Los controles que dependan de la URL definitiva se cierran en esa URL.

## Los 29 criterios técnicos

### A. Mensaje y contenido

**1. Un solo H1 y un primer pantallazo claro.**
Debe haber exactamente un `<h1>`, y lo primero que se ve debe decir qué es el negocio y qué ofrece. *Por qué:* el visitante decide en pocos segundos si se queda. *Cómo se verifica:* contar `h1` y leer el primer pantallazo sin hacer scroll.

**2. El llamado a la acción (CTA) principal es visible sin hacer scroll.**
En escritorio y en móvil, el botón principal queda dentro de la pantalla inicial. *Por qué:* es el camino a la conversión. *Cómo se verifica:* que su borde inferior quede dentro del alto de la ventana (por ejemplo, ≤ 800 px en escritorio y ≤ 812 px en móvil).

**3. Sin texto de relleno, erratas ni símbolos sueltos.**
Revisa ortografía, caracteres raros y textos tipo "lorem ipsum". *Por qué:* resta confianza. *Cómo se verifica:* leer todo el texto de la página.

### B. Llamados a la acción y contacto

**4. Cero enlaces muertos o vacíos.**
Ningún `href="#"` ni `href` vacío o ausente. Todo anclaje interno (`#contacto`, `#servicios`…) debe apuntar a un `id` que exista. *Cómo se verifica:* listar todos los `<a>` y comprobar cada anclaje.

**5. Botones de contacto con formato válido.**
- Teléfono: `tel:+52XXXXXXXXXX` (10 dígitos después de +52).
- WhatsApp: `https://wa.me/52XXXXXXXXXX?text=...` (con el texto codificado).
- Correo: `mailto:`.
Deben abrir lo correcto. *Cómo se verifica:* revisar el formato de cada enlace; si puedes, probarlo.

**6. Existe al menos un canal de contacto visible y funcional.**
El que el cliente tenga (llamada, WhatsApp, correo, etc.). Si el cliente aún no entrega ninguno, el punto queda N/A y se reporta en "Información del cliente".

**7. Los enlaces que abren en pestaña nueva llevan `rel="noopener"`.**
Todo `target="_blank"` debe incluir `rel="noopener"` (o `noopener noreferrer`). *Por qué:* seguridad básica.

### C. Estándar Matangazo

**8. Crédito y enlace a Matangazo en el pie de página.**
El `<footer>` debe incluir un crédito con enlace funcional a `https://matangazo.mx/`. En la Plantilla 1, el pie es exclusivo de Matangazo e incluye su logotipo oficial compartido, identidad visual, mensaje comercial, botón de WhatsApp para prospectos y contador Hits de visitas acumuladas con clave independiente por negocio.

**9. Favicon.**
Debe existir un `<link rel="icon">` (puede ser SVG).

**10. Open Graph completo.**
Para que el enlace se vea bien al compartirlo por WhatsApp o redes. Etiquetas requeridas: `og:title`, `og:description`, `og:type`, `og:url`, `og:locale`, `og:image` y `og:image:alt`.
- La imagen debe medir **1200×630 px**, pesar **≤ ~300 KB** y responder con código 200.
- Declara también `og:image:width` y `og:image:height`.

Los valores deben proceder de los datos reales de la página y su URL autorizada.

**11. Datos estructurados (JSON-LD) válidos y consistentes.**
Un bloque `<script type="application/ld+json">` con tipo `LocalBusiness` o un subtipo (por ejemplo `AutoRepair`, `Restaurant`, `Dentist`). Debe incluir **nombre, teléfono, dirección y horario**, y esos datos deben ser **idénticos a lo que muestra la página**. Si hay varias sucursales, un nodo por sucursal. *Nota:* no se audita la propiedad `url`; por buena práctica, apunta a la propia página.

Genera los valores a partir de los datos reales del negocio; no completes campos con datos inventados.

### D. SEO básico

**12. `title` único, con el nombre del negocio y de ≤ ~60 caracteres.**

**13. `meta description` de ≤ ~160 caracteres que cumpla lo que promete.**
Debe describir de verdad lo que hay en la página.

**14. Jerarquía de encabezados correcta.**
Sin saltos de nivel (por ejemplo, de H2 a H4) y sin encabezados vacíos o sobrantes ocultos. *Excepciones válidas:* los encabezados de pestañas o acordeones inactivos y los textos pensados solo para lectores de pantalla.

**15. `canonical` y `og:url` coinciden.**
Deben apuntar a la misma URL.

**16. `lang="es-MX"` y meta viewport.**
`<html lang="es-MX">` y `<meta name="viewport" content="width=device-width, initial-scale=1">`.

**17. Texto alternativo en todas las imágenes.**
Toda imagen de contenido lleva `alt` descriptivo. Las imágenes decorativas llevan `alt=""` y, si están dentro de un enlace, el enlace lleva `aria-label`.

### E. Diseño y móvil

**18. Sin desborde horizontal.**
A 375 px y a 1280 px, el ancho del contenido no debe exceder el ancho de la ventana (`scrollWidth ≤ innerWidth`).

**19. Tamaño de elementos táctiles en móvil.**
- Botones principales, CTAs, teléfono, WhatsApp, menú y botones de compartir: **≥ 44×44 px**.
- El resto de enlaces y botones: **≥ 24 px de alto**.

**20. Texto legible.**
Ningún texto de contenido menor a **12 px** (se exceptúan los logotipos).

**21. Los elementos flotantes no tapan contenido.**
Un botón flotante (por ejemplo "Volver arriba") no debe tapar un enlace o control **en reposo ni al llegar al final de la página**. Al desplazarse, es normal que pase por encima de otros elementos un instante. Deja espacio inferior suficiente en el pie para que ningún enlace quede debajo del botón.

**22. Menú móvil y salto de contenido.**
- El menú móvil abre y cierra correctamente (con el botón y con la tecla Escape).
- Existe un enlace "Saltar al contenido" (`<a href="#main">`) y el `id="main"` correspondiente.

**23. Carga de imágenes.**
La imagen principal lleva `width` y `height` declarados y `fetchpriority="high"`. Las demás imágenes llevan `loading="lazy"` y `decoding="async"`. El badge de Hits se programa con baja prioridad tras la carga inicial y pasa a carga activa en ese momento para registrar la visita aunque el footer quede fuera de pantalla. Registra esta excepción al comportamiento diferido.

### F. Rendimiento orientativo

**24. Carga inicial ligera.**
Referencias: **≤ ~1 MB** en total, **≤ ~15 solicitudes** y **≤ ~150 KB por imagen**. Son cifras orientativas, no de laboratorio. Comprime las imágenes antes de subirlas.

### G. Técnico

**25. Consola del navegador limpia.**
Sin errores ni advertencias propias de la página.

**26. Todo por HTTPS, sin contenido mixto.**
Ningún recurso cargado con `http://`.

**27. Sin restos de plantilla.**
Sin `TODO`, `FIXME`, texto "placeholder" ni código de ejemplo olvidado. (Los comentarios de licencia de librerías, por ejemplo íconos, son válidos.)

**28. Todo lo interactivo funciona en escritorio y móvil.**
Pestañas, acordeones, selectores, mapas embebidos y botones de compartir. Verifica con teclado cuando aplique y que cada interacción cargue sus imágenes y datos correctos.

**29. El contenido clave está en el HTML.**
Los textos principales, servicios, datos de contacto y sucursales deben estar presentes en el HTML sin ejecutar JavaScript. El JavaScript se usa para interactividad, no para generar el contenido esencial.

---

## Requisitos de aceptación

| Requisito | Comprobación |
| --- | --- |
| Fidelidad a la estructura visual | Verificar las seis secciones y su orden, la composición adaptable y la correspondencia con Express Care como referencia de la Plantilla 1. |
| Contenido solicitado | Contrastar la versión con la ficha del proyecto. Revisar la cantidad acordada de servicios o grupos y que la agrupación conserve todos los datos solicitados. |
| Interacciones | Confirmar en escritorio y móvil el funcionamiento de los componentes aprobados que correspondan a la página, conforme al criterio 28. Comprobar la preferencia de movimiento reducido. |
| Calidad visual profesional | Revisar la jerarquía, legibilidad y coherencia visual en ambas vistas. Registrar la aprobación visual de la versión por Matangazo. |
| Identidad oficial de Matangazo | Verificar que el footer usa el logotipo compartido, conservando diseño, proporciones y color. |
| Contador de visitas | Verificar el badge real de Hits, una clave exclusiva por negocio que se conserva al cambiar la URL, carga de baja prioridad, manejo de error y adaptación móvil. Representa visitas acumuladas. |
| PageSpeed Insights | Cada categoría debe alcanzar **90 puntos o más, tanto en móvil como en escritorio**. Registra las ocho puntuaciones de rendimiento, accesibilidad, buenas prácticas y SEO. Alcanzar 100 es deseable. |

Mide PageSpeed Insights en una URL autorizada que sirva la versión evaluada. Conserva `noindex` en las demos y comprueba el umbral en la candidata con la configuración de indexación aprobada. Si la URL o la medición está pendiente, registra el estado como **No verificado**. Las referencias de peso y solicitudes del punto 24 siguen siendo orientativas.

## Cuándo se considera terminada

La página está terminada cuando los 29 puntos constan como **Cumple** o **N/A** justificado, se acreditan todos los requisitos de aceptación y Matangazo da su aprobación visual para esa versión. Una comprobación fallida o pendiente deja la página como **Pendiente**. Registra qué falta y cómo verificarlo. Al obtener la aceptación, cierra la página con el alcance aprobado.
