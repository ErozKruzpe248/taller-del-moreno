
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
// Adaptado del servidor autorizado de Express Care ef54981, sin dependencias.
const root = await realpath(new URL('../dist/', import.meta.url));
const host='127.0.0.1';
const port=Number(process.env.TALLER_PORT ?? 4174);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Puerto inválido');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
function within(file){const r=relative(root,file);return r!=='..'&&!r.startsWith('..'+sep)&&!isAbsolute(r);}
const server=createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
 try{
 const pathname=decodeURIComponent(new URL(req.url,'http://'+host).pathname);
 const target=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!within(target)){res.writeHead(404).end();return;}
 const file=await realpath(target); const info=await stat(file);
 if(!within(file)||!info.isFile()){res.writeHead(404).end();return;}
 res.writeHead(200,{'Content-Type':types[extname(file)]??'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
 if(req.method==='HEAD'){res.end();return;}
 createReadStream(file).once('error',()=>res.destroy()).pipe(res);
 }catch(e){res.writeHead(['ENOENT','ENOTDIR'].includes(e.code)?404:500).end();}
});
server.listen(port,host,()=>console.log('Taller El Moreno · http://'+host+':'+port+'/'));
