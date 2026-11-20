import { copyFile, lstat, mkdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage, required } from "./src/componentes.mjs";

const root = await realpath(fileURLToPath(new URL("./", import.meta.url)));
const configPath = await realpath(resolve(required(process.argv[2], "Ruta al JSON del cliente")));
const config = JSON.parse(await readFile(configPath, "utf8"));
const assets = new Set();
const html = renderPage(config, assets);
const assetDir = await realpath(join(dirname(configPath), "assets"));
const sourceAssets = new Map();
for (const name of assets) {
  const file = join(assetDir, name);
  const info = await lstat(file);
  if (!info.isFile() || await realpath(file) !== file) throw new Error("El recurso debe ser un archivo de assets/: " + name);
  sourceAssets.set(name, file);
}
const logoPath = fileURLToPath(new URL("../../recursos/matangazo/logo-transparente.png", import.meta.url));
await readFile(logoPath);
const output = join(root, "dist");
for (const input of [configPath, assetDir]) {
  const fromOutput = relative(output, input);
  if (fromOutput === "" || (fromOutput !== ".." && !fromOutput.startsWith(".." + sep) && !fromOutput.includes(":"))) throw new Error("Guarda el JSON y los recursos fuera de dist/.");
}
const existing = await lstat(output).catch((error) => {
  if (error.code !== "ENOENT") throw error;
  return null;
});
if (existing) {
  if (!existing.isDirectory() || await realpath(output) !== output) throw new Error("dist debe ser una carpeta dentro de la plantilla.");
  await rm(output, { recursive: true });
}
await mkdir(join(output, "assets"), { recursive: true });
await writeFile(join(output, "index.html"), html);
for (const file of ["base.css", "menu.js"]) await copyFile(join(root, "src", file), join(output, file));
for (const [name, file] of sourceAssets) await copyFile(file, join(output, "assets", name));
await copyFile(logoPath, join(output, "assets", "matangazo-oficial.png"));
console.log("Salida estática generada en " + output);
