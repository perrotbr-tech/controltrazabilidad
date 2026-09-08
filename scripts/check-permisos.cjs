// Prueba reproducible SPEC-002: mutaciones invocadas directamente (sin pasar por la interfaz)
// deben respetar requirePermission y las reglas de negocio.
// Uso: node scripts/check-permisos.cjs [ruta-al-html]   (por defecto 09-plataforma/app/index.html)
// Contra el prototipo baseline se espera FALLA (reproducción del defecto); contra app/ se espera PASS.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const archivo = process.argv[2] || path.join(__dirname, '../09-plataforma/app/index.html');
const html = fs.readFileSync(archivo, 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// Valores que la interfaz habría cargado en los campos de los modales
const CAMPOS = { mDec: 'motivo de prueba', mCla: 'Necesidad confirmada', mClaM: 'motivo', mExc: 'motivo',
  mMotivo: 'motivo de prueba', mVans: '1', mRazon: 'Contingencia', mParada: 'Plaza Colón — Centro|15' };
const alertas = [];
const ctx = {
  console, window: {}, location: { search: '' },
  document: { getElementById(id) { return { innerHTML: '', value: CAMPOS[id] || '', addEventListener() {}, classList: { add() {}, remove() {} } }; } },
  localStorage: { getItem() { return null; }, setItem() {} },
  alert(m) { alertas.push(String(m)); }
};
vm.createContext(ctx);
vm.runInContext(script, ctx);
// Las funciones del script son globales del contexto (no módulo): se invocan como lo haría la consola del navegador.
const app = ctx.window.app;
const S = () => app.S;
const extra = id => S().extras.find(e => e.id === id);

const resultados = [];
function caso(id, descripcion, fn) {
  try { const ok = !!fn(); resultados.push({ id, descripcion, ok }); }
  catch (err) { resultados.push({ id, descripcion, ok: false, err: String(err && err.message || err) }); }
}

// Estado inicial de la semilla: #1 Utilizado, #2 Observado (sin autorización), #3 Rechazado.
// ---- Sin sesión ----
app.logout && S().sesion && app.logout();
caso('AC-01', 'Sin sesión, transicion() directa no cambia el estado de un extra', () => {
  const e = extra(1); const antes = e.estado;
  const r = app.transicion(e, 'Observado', 'intento sin sesión');
  return r.ok === false && e.estado === antes;
});

// ---- TRABAJADOR (Camila, id 1) ----
app.login(1);
caso('AC-02', 'TRABAJADOR: transicion() directa no cambia el estado', () => {
  const e = extra(1); const antes = e.estado;
  const r = app.transicion(e, 'Conciliado', 'intento trabajador');
  return r.ok === false && e.estado === antes;
});
caso('AC-03', 'TRABAJADOR: decideOk() directa no autoriza ni amplía capacidad', () => {
  // Crear una solicitud legítima primero (como contratista) para tener un extra Solicitado
  app.login(2);
  const svc = S().servicios.filter(s => !s.ejecutado && !S().extras.some(e => e.servicioId === s.id))[0];
  ctx.creaSolicitud(svc.id);
  const nuevo = S().extras[S().extras.length - 1];
  app.login(1);
  const capAntes = svc.capacidadExtra;
  ctx.decideOk(nuevo.id, 'Autorizado');
  return nuevo.estado === 'Solicitado' && nuevo.autorizadoPor == null && svc.capacidadExtra === capAntes;
});
caso('AC-04', 'TRABAJADOR: reclasificaOk() directa no reclasifica', () => {
  const e = extra(1); ctx.reclasificaOk(1); return e.reclasificacion == null;
});
caso('AC-05', 'TRABAJADOR: excluyeOk() directa no excluye ni concilia', () => {
  const e = extra(2); ctx.excluyeOk(2); return !e.excluido && e.estado === 'Observado';
});
caso('AC-06', 'TRABAJADOR: cambia() directa no mueve un extra', () => {
  const e = extra(1); const antes = e.estado; ctx.cambia(1, 'Conciliado', 'x'); return e.estado === antes;
});
caso('AC-07', 'TRABAJADOR: subsana() directa no concilia un Observado', () => {
  const e = extra(2); ctx.subsana(2); return e.estado === 'Observado' && !e.subsanado;
});

// ---- MANDANTE (Patricia, id 3) ----
app.login(3);
caso('AC-08', 'MANDANTE: cierraPeriodo() directa se rechaza mientras exista un Observado sin resolver', () => {
  const n = S().conciliaciones.length;
  ctx.cierraPeriodo();
  return S().conciliaciones.length === n;
});
caso('AC-09', 'MANDANTE: decideOk() autoriza un Solicitado y amplía capacidad (caso positivo)', () => {
  const nuevo = S().extras[S().extras.length - 1];
  const svc = S().servicios.find(s => s.id === nuevo.servicioId);
  const capAntes = svc.capacidadExtra;
  ctx.decideOk(nuevo.id, 'Autorizado');
  return nuevo.estado === 'Autorizado' && nuevo.autorizadoPor === 3 && svc.capacidadExtra === capAntes + nuevo.capacidadExtra;
});
caso('AC-10', 'MANDANTE: cambia() a Despachado se rechaza (operación del contratista)', () => {
  const nuevo = S().extras[S().extras.length - 1];
  ctx.cambia(nuevo.id, 'Despachado', 'x'); return nuevo.estado === 'Autorizado';
});
caso('AC-11', 'MANDANTE: reclasificaOk() reclasifica con motivo (caso positivo)', () => {
  const e = extra(1); ctx.reclasificaOk(1); return e.reclasificacion === 'Necesidad confirmada';
});

// ---- CONTRATISTA (Rodrigo, id 2) ----
app.login(2);
caso('AC-12', 'CONTRATISTA: cambia() Autorizado → Despachado → Utilizado (caso positivo)', () => {
  const nuevo = S().extras[S().extras.length - 1];
  ctx.cambia(nuevo.id, 'Despachado', 'Despachado');
  const d = nuevo.estado === 'Despachado';
  ctx.cambia(nuevo.id, 'Utilizado', 'Ejecutado');
  return d && nuevo.estado === 'Utilizado';
});
caso('AC-13', 'CONTRATISTA: transicion() directa a Autorizado sobre un Solicitado se rechaza', () => {
  const svc = S().servicios.filter(s => !s.ejecutado && !S().extras.some(e => e.servicioId === s.id))[0];
  ctx.creaSolicitud(svc.id);
  const e = S().extras[S().extras.length - 1];
  const r = app.transicion(e, 'En revisión', 'contratista se autoriza');
  return r.ok === false && e.estado === 'Solicitado';
});
caso('AC-14', 'CONTRATISTA: excluyeOk() directa se rechaza (decisión del mandante)', () => {
  const e = extra(2); ctx.excluyeOk(2); return !e.excluido && e.estado === 'Observado';
});
caso('AC-15', 'Todo intento rechazado quedó en auditoría como ACCESO DENEGADO', () => {
  return S().auditoria.filter(a => a.denegado).length >= 8;
});

// ---- Casos añadidos tras la revisión QA (D-1, D-2, caminos positivos R2 y R4) ----
caso('AC-16', 'CONTRATISTA: subsana() sobre un Utilizado respaldado no concilia ni deja sello de subsanación (R1)', () => {
  const e = extra(1); const antes = e.estado; ctx.subsana(1); return e.estado === antes && e.subsanado == null;
});
app.login(3);
caso('AC-17', 'MANDANTE: excluyeOk() sobre un Rechazado no deja bandera excluido (R1)', () => {
  const e = extra(3); ctx.excluyeOk(3); return !e.excluido && e.motivoExclusion == null && e.estado === 'Rechazado';
});
caso('AC-18', 'Subsanación legítima: mandante valida emergencia, contratista completa evidencia y subsana un Observado (R2 positivo)', () => {
  const e = extra(2);
  ctx.validaEmergencia(2);
  app.login(2);
  ctx.marcaEv(2, 'salida', true); ctx.marcaEv(2, 'manifiesto', true);
  const resp = app.respaldado(e);
  ctx.subsana(2);
  return resp && e.estado === 'Conciliado' && typeof e.subsanado === 'string';
});
caso('AC-19', 'TRABAJADOR y sin sesión: cierraPeriodo() no crea conciliación (R4 sin permiso)', () => {
  const n = S().conciliaciones.length;
  app.login(1); ctx.cierraPeriodo();
  app.logout(); ctx.cierraPeriodo();
  return S().conciliaciones.length === n;
});
caso('AC-20', 'MANDANTE sin observados pendientes: cierraPeriodo() emite conciliación con correlativo (R4 positivo)', () => {
  app.login(3);
  const n = S().conciliaciones.length;
  ctx.cierraPeriodo();
  const c = S().conciliaciones[S().conciliaciones.length - 1];
  return S().conciliaciones.length === n + 1 && /^CT-2026-\d{2}$/.test(c.correlativo) && c.total === S().contrato.montoFijo + c.respaldado;
});
caso('AC-21', 'Estado destino inválido: transicion() devuelve ok:false sin mutar', () => {
  const e = extra(1); const antes = e.estado; const r = app.transicion(e, 'Solicitado', 'x'); return r.ok === false && e.estado === antes;
});

const fallas = resultados.filter(r => !r.ok);
for (const r of resultados) console.log((r.ok ? 'PASS ' : 'FAIL ') + r.id + ' — ' + r.descripcion + (r.err ? ' [' + r.err + ']' : ''));
console.log(`\nArchivo: ${path.relative(process.cwd(), archivo)} · ${resultados.length - fallas.length}/${resultados.length} casos correctos.`);
console.log('Alcance: JavaScript con DOM simulado; no es E2E, revisión visual ni seguridad de servidor.');
process.exit(fallas.length ? 1 : 0);
