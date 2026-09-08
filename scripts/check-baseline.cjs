const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../09-plataforma/prototipo-actual/index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const node = { innerHTML:'', addEventListener(){}, classList:{add(){},remove(){}} };
const ctx = { console, window:{}, location:{search:''}, document:{getElementById(){return node;}}, localStorage:{getItem(){return null;},setItem(){}}, alert(){} };
vm.createContext(ctx); vm.runInContext(script, ctx);
const s=ctx.window.app.S;
assert(s.servicios.length>0,'Servicios sembrados');
assert(s.servicios.every(x=>[23,0,1,2,3,4,5,6].includes(new Date(x.salida).getHours())),'Ventana 23-06');
assert(s.extras.every(e=>s.servicios.some(x=>x.id===e.servicioId)),'Extras asociados');
assert.equal(ctx.window.app.div(1,0),null,'Denominador cero');
const counts={};for(const x of s.servicios){const key=ctx.window.app.jornadaDe(x.salida).id+'-'+x.rutaIdx; counts[key]=(counts[key]||0)+1;}
assert(Object.values(counts).every(n=>n===8),'Ocho salidas por jornada y ruta de la semilla');
console.log('PASS: arranque con DOM simulado, ventana, extras asociados, cero y jornada. No es E2E, revisión visual ni seguridad.');
