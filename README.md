# Taller El Moreno
Página local para revisión de Matangazo, basada en Plantilla 1. No publicada.

## Ejecutar
Requiere Node.js 20 o superior; no necesita instalar paquetes.

```powershell
cd "C:\Users\masch\Documents\Codex\2026-11-19\new-chat-10\work\taller-del-moreno"
npm run build
npm run preview
```

Vista previa: http://127.0.0.1:4174/
Para otro puerto: `$env:TALLER_PORT=4175; npm run preview`.

## Entrega
- `cliente/configuracion.json`: datos y textos editables.
- `cliente/assets/`: logotipo, favicon, portada, cinco fotos e imagen social optimizados.
- `cliente/marca.css`: identidad visual de la instancia; conserva la composición de Plantilla 1.
- `plantillas/plantilla-01/`: generador y componentes de la revisión autorizada.
- `dist/`: archivos estáticos para subir directamente al hosting, una vez cerrados los pendientes del informe.
- `informes/auditoria.md`: revisión de los 29 criterios y límites.
- `informes/deficiencias.md`: dos ajustes autorizados en esta copia y otros hallazgos.
- `informes/materiales.md`: procedencia de recursos y datos.
- `referencias-originales/`: componente original para comparación.
- `materiales-originales/`: imágenes generadas originales.

## Referencias protegidas
Maestro: ErozKruzpe248/matangazo-presencia-web, rama rescate/plantilla-01, SHA 5ca53f5033cde982374cf7b8b09abb8d88bbf3ca.
Express Care: ErozKruzpe248/express-care-mexico, SHA ef54981a1030e5228911973400c7dc36f1cb1808.
Ambos exclusivamente en lectura. No se crearon ramas, commits, PR, despliegues ni cambios de configuración en ellos.

## Antes de publicar
La URL final no se ha proporcionado. `seo.url=https://localhost/` es únicamente una base técnica para la compilación local; no es una URL comercial ni pública. Cambiarla por la dirección HTTPS autorizada y recompilar antes de subir.
Mantener noindex y la leyenda de demostración mientras siga en revisión.
El contador usa la clave de prueba exclusiva `matangazo.mx/presencia-web/taller-el-moreno-prueba`; asignar y conservar una clave definitiva independiente cuando se autorice la producción.
No habilitar GitHub Pages ni publicar sin autorización expresa. PageSpeed Insights y aceptación final permanecen pendientes.
