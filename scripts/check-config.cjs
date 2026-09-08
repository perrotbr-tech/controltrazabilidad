// Prueba reproducible SPEC-003: configuración operativa real (capacidad 15 por van, 2 vans extra, cobro por van).
// Uso: node scripts/check-config.cjs [ruta-al-html]   (por defecto 09-plataforma/app/index.html)
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const archivo = process.argv[2] || path.join(__dirname, '../09-plataforma/app/index.html');
const html = fs.readFileSync(archivo, 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const CAMPOS = { mDec: 'motivo de prueba', mMotivo: 'motivo de prueba', mVans: '1', mRazon: 'Contingencia' };
const alertas = [];
const ctx = {
  console, window: {}, location: { search: '' },
  document: { getElementById(id) { return { innerHTML: '', value: CAMPOS[id] || '', addEventListener() {}, classList: { add() {}, remove() {} } }; } },
  localStorage: { getItem() { return null; }, setItem() {} },
  alert(m) { alertas.push(String(m)); }
};
vm.createContext(ctx); vm.runInContext(script, ctx);
const app = ctx.window.app; const S = () => app.S;
const resultados = [];
function caso(id, d, fn) { try { resultados.push({ id, d, ok: !!fn() }); } catch (e) { resultados.push({ id, d, ok: false, err: String(e && e.message || e) }); } }
const CAP = 15, EXTRA_VANS = 2;

caso('AC-01', 'Contrato: capacidadVan 15 y vansExtraDisponibles 2', () =>
  S().contrato.capacidadVan === CAP && S().contrato.vansExtraDisponibles === EXTRA_VANS);
caso('AC-02', 'Toda salida sembrada tiene capacidadBase = vans de su ruta × 15', () =>
  S().servicios.every(s => s.capacidadBase === S().contrato.rutas[s.rutaIdx].vans * CAP));
caso('AC-03', 'Hay salidas con lista de espera y salidas con capacidad disponible', () => {
  const ds = S().servicios.map(s => app.demanda(s));
  return ds.some(d => d.espera > 0) && ds.some(d => d.libres > 0);
});
caso('AC-04', 'Ocho salidas por jornada y ruta, todas entre 23:00 y 06:00', () => {
  const counts = {}; for (const x of S().servicios) { const k = app.jornadaDe(x.salida).id + '-' + x.rutaIdx; counts[k] = (counts[k] || 0) + 1; }
  return Object.values(counts).every(n => n === 8) && S().servicios.every(x => [23, 0, 1, 2, 3, 4, 5, 6].includes(new Date(x.salida).getHours()));
});
caso('AC-05', 'Extra #1: 1 van, capacidadExtra 15, Utilizado y respaldado; extra #3: Rechazado con demanda ≤ 30', () => {
  const e1 = S().extras.find(e => e.id === 1), e3 = S().extras.find(e => e.id === 3);
  const s3 = S().servicios.find(s => s.id === e3.servicioId);
  return e1.vans === 1 && e1.capacidadExtra === CAP && e1.estado === 'Utilizado' && app.respaldado(e1)
    && e3.estado === 'Rechazado' && app.demanda(s3).solicitudes <= s3.capacidadBase;
});
// Solicitud de extra por el CONTRATISTA sobre una salida futura sin extra y con lista de espera
app.login(2);
const objetivo = () => S().servicios.filter(s => !s.ejecutado && !S().extras.some(e => e.servicioId === s.id) && app.demanda(s).espera > 0)
  .sort((a, b) => a.salida < b.salida ? -1 : 1)[0];
caso('AC-06a', 'CONTRATISTA: solicitar 3 vans se rechaza (solo 2 disponibles)', () => {
  const s = objetivo(); const n = S().extras.length; CAMPOS.mVans = '3'; ctx.creaSolicitud(s.id); CAMPOS.mVans = '1';
  return S().extras.length === n;
});
caso('AC-06b', 'CONTRATISTA: solicitar 2 vans crea extra con capacidadExtra 30 y tarifa 2 × tarifaExtra', () => {
  const s = objetivo(); const n = S().extras.length; CAMPOS.mVans = '2'; ctx.creaSolicitud(s.id); CAMPOS.mVans = '1';
  const e = S().extras[S().extras.length - 1];
  const ok = S().extras.length === n + 1 && e.vans === 2 && e.capacidadExtra === 2 * CAP && e.tarifa === 2 * S().contrato.tarifaExtra;
  // dejar el estado limpio para AC-07: el mandante rechaza esta solicitud
  app.login(3); ctx.decideOk(e.id, 'Rechazado'); app.login(2);
  return ok && e.estado === 'Rechazado';
});
caso('AC-07', 'Autorizar 1 van sobre una salida con espera: capacidad 30 → 45 y lista de espera en 0', () => {
  const s = objetivo(); const antes = app.demanda(s);
  ctx.creaSolicitud(s.id); const e = S().extras[S().extras.length - 1];
  app.login(3); ctx.decideOk(e.id, 'Autorizado');
  const desp = app.demanda(s);
  return antes.capacidad === 2 * CAP && antes.espera > 0 && e.estado === 'Autorizado' && desp.capacidad === 3 * CAP && desp.espera === 0 && antes.solicitudes <= 3 * CAP;
});
caso('AC-08', 'Ningún texto del HTML menciona "4 cupos", "+4 cupos" ni "+4 (1 van)"', () =>
  !/4 cupos|\+4 cupos|\+4 \(1 van\)/.test(html));

const fallas = resultados.filter(r => !r.ok);
for (const r of resultados) console.log((r.ok ? 'PASS ' : 'FAIL ') + r.id + ' — ' + r.d + (r.err ? ' [' + r.err + ']' : ''));
console.log(`\nArchivo: ${path.relative(process.cwd(), archivo)} · ${resultados.length - fallas.length}/${resultados.length} casos correctos.`);
console.log('Alcance: JavaScript con DOM simulado; no es E2E ni revisión visual.');
process.exit(fallas.length ? 1 : 0);
