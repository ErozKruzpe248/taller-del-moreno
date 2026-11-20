
import {execFileSync} from 'node:child_process';
import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const config=fileURLToPath(new URL('cliente/configuracion.json',root));
execFileSync(process.execPath,[fileURLToPath(new URL('plantillas/plantilla-01/construir.mjs',root)),config],{stdio:'inherit'});
const dist=new URL('dist/',root);
await mkdir(dist,{recursive:true});
await cp(new URL('plantillas/plantilla-01/dist/',root),dist,{recursive:true});
await cp(new URL('cliente/marca.css',root),new URL('marca.css',dist));
const html=await readFile(new URL('index.html',dist),'utf8');
await writeFile(new URL('index.html',dist),html.replace('</head>','<link rel="stylesheet" href="./marca.css"></head>'));
console.log('Entrega estática preparada en '+fileURLToPath(dist));
