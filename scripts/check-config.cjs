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
caso('AC-04', 'Siete salidas por jornada y ruta con el horario real (00:15 … 06:45) — SPEC-003b', () => {
  const counts = {}; for (const x of S().servicios) { const k = app.jornadaDe(x.salida).id + '-' + x.rutaIdx; counts[k] = (counts[k] || 0) + 1; }
  const HM = new Set(['0:15', '1:35', '2:35', '3:35', '4:35', '5:35', '6:45']);
  return Object.values(counts).every(n => n === 7) && S().servicios.every(x => { const d = new Date(x.salida); return HM.has(d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0')); });
});
caso('AC-05', 'Extra #1: 2 vans ex post (DEC-009), capacidadExtra 30, Utilizado y respaldado; extra #3: Rechazado con demanda ≤ 30', () => {
  const e1 = S().extras.find(e => e.id === 1), e3 = S().extras.find(e => e.id === 3);
  const s3 = S().servicios.find(s => s.id === e3.servicioId);
  return e1.vans === 2 && e1.capacidadExtra === 2 * CAP && e1.estado === 'Utilizado' && app.respaldado(e1) && /DEC-009/.test(e1.motivoAutorizacion)
    && e3.estado === 'Rechazado' && app.demanda(s3).solicitudes <= s3.capacidadBase;
});
// Solicitud de extra por el CONTRATISTA sobre una salida futura sin extra y con lista de espera
app.login(2);
const objetivo = () => S().servicios.filter(s => !s.ejecutado && !S().extras.some(e => e.servicioId === s.id && e.estado !== 'Rechazado') && app.demanda(s).espera > 0)
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

// ---- Casos añadidos tras la revisión QA de SPEC-003 ----
caso('AC-10', 'Extra #2 sembrado: operacional, Observado, sin autorización, 15 cupos, no respaldado, demanda ≤ base (REQ-011)', () => {
  const e2 = S().extras.find(e => e.id === 2); const s2 = S().servicios.find(s => s.id === e2.servicioId);
  return e2.tipo === 'operacional' && e2.estado === 'Observado' && e2.autorizadoPor == null && e2.capacidadExtra === CAP
    && !app.respaldado(e2) && app.clasifica(e2) === 'Servicio sin respaldo suficiente' && app.demanda(s2).solicitudes <= s2.capacidadBase;
});
caso('AC-11', 'Extra #1 sembrado: su salida tiene capacidad ampliada (60) y lista de espera 0 (QA D-2)', () => {
  const e1 = S().extras.find(e => e.id === 1); const s1 = S().servicios.find(s => s.id === e1.servicioId);
  return s1.capacidadExtra === 2 * CAP && app.demanda(s1).capacidad === 4 * CAP && app.demanda(s1).espera === 0;
});
caso('AC-12', 'Camila (userId 1): exactamente 3 reservas futuras, todas Ruta Norte, sin duplicados por salida (QA D-3)', () => {
  const fut = S().reservas.filter(r => r.userId === 1 && !S().servicios.find(s => s.id === r.servicioId).ejecutado);
  const ids = fut.map(r => r.servicioId);
  return fut.length === 3 && fut.every(r => S().servicios.find(s => s.id === r.servicioId).rutaIdx === 0) && new Set(ids).size === 3;
});
caso('AC-13', 'R6 frontera: mVans "0", "1.5" y "abc" no crean extra (QA D-4)', () => {
  app.login(2); const s = objetivo() || S().servicios.filter(x => !x.ejecutado && !S().extras.some(e => e.servicioId === x.id))[0];
  const n = S().extras.length;
  for (const v of ['0', '1.5', 'abc']) { CAMPOS.mVans = v; ctx.creaSolicitud(s.id); }
  CAMPOS.mVans = '1';
  return S().extras.length === n;
});
caso('AC-14', 'Estado guardado con la semilla antigua (4 cupos, clave v2) no se carga: la app arranca con la semilla nueva (QA D-1)', () => {
  const viejo = JSON.stringify({ servicios: [{ id: 1 }], contrato: { capacidadVan: 4 } });
  const ctx2 = { console, window: {}, location: { search: '' },
    document: { getElementById() { return { innerHTML: '', value: '', addEventListener() {}, classList: { add() {}, remove() {} } }; } },
    localStorage: { getItem(k) { return k === 'trazabilidad_v2' ? viejo : (k === 'trazabilidad_v3' ? viejo : null); }, setItem() {} }, alert() {} };
  vm.createContext(ctx2); vm.runInContext(script, ctx2);
  return ctx2.window.app.S.contrato.capacidadVan === CAP && ctx2.window.app.S.servicios.length > 1;
});
caso('AC-15', 'Proyección mensual 30 × 7 salidas × 2 rutas = 420 (H-022)', () =>
  !/24 salidas/.test(html) && app.periodo().proy.servicios === 420);
caso('AC-16', 'R7 tope por jornada (DEC-013): con 1 van ya autorizada en la jornada, pedir 2 más se rechaza y 1 más se acepta', () => {
  app.login(2);
  const conExtra = S().extras.filter(e => e.estado === 'Autorizado').map(e => S().servicios.find(s => s.id === e.servicioId))[0];
  const J = app.jornadaDe(conExtra.salida).id;
  const otra = S().servicios.find(s => !s.ejecutado && s.id !== conExtra.id && app.jornadaDe(s.salida).id === J && !S().extras.some(e => e.servicioId === s.id && e.estado !== 'Rechazado'));
  const n = S().extras.length;
  CAMPOS.mVans = '2'; ctx.creaSolicitud(otra.id); const rechazada = S().extras.length === n;
  CAMPOS.mVans = '1'; ctx.creaSolicitud(otra.id); const aceptada = S().extras.length === n + 1;
  return rechazada && aceptada;
});

const fallas = resultados.filter(r => !r.ok);
for (const r of resultados) console.log((r.ok ? 'PASS ' : 'FAIL ') + r.id + ' — ' + r.d + (r.err ? ' [' + r.err + ']' : ''));
console.log(`\nArchivo: ${path.relative(process.cwd(), archivo)} · ${resultados.length - fallas.length}/${resultados.length} casos correctos.`);
console.log('Alcance: JavaScript con DOM simulado; no es E2E ni revisión visual.');
process.exit(fallas.length ? 1 : 0);
