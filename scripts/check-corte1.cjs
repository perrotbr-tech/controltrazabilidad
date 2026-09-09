// SPEC-CORTE-1 / DEC-032 — inscripción híbrida T−48/T−2 (simulación en app/).
// Uso: TZ=America/Santiago node scripts/check-corte1.cjs [ruta-html]
// Método: estas pruebas deben FALLAR antes de la implementación y pasar después.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

process.env.TZ = 'America/Santiago';

const archivo = process.argv[2] || path.join(__dirname, '../09-plataforma/app/index.html');
const html = fs.readFileSync(archivo, 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error('FAIL — sin script'); process.exit(1); }
const script = m[1];

function loadApp() {
  const alertas = [];
  const ctx = {
    console,
    window: {},
    location: { search: '' },
    document: {
      getElementById() {
        return { innerHTML: '', value: '', addEventListener() {}, classList: { add() {}, remove() {} } };
      }
    },
    localStorage: { getItem() { return null; }, setItem() {} },
    alert(msg) { alertas.push(String(msg)); }
  };
  vm.createContext(ctx);
  vm.runInContext(script, ctx);
  return { app: ctx.window.app, ctx, alertas };
}

const { app, ctx } = loadApp();
const S = () => app.S;
const resultados = [];
function caso(id, d, fn) {
  try { resultados.push({ id, d, ok: !!fn() }); }
  catch (e) { resultados.push({ id, d, ok: false, err: String(e && e.message || e) }); }
}

function need(fnName) {
  if (typeof app[fnName] !== 'function') throw new Error('falta API ' + fnName);
}

caso('C1-API', 'API Corte 1 expuesta (reloj, ventana, confirmar/cambiar/rechazar, cierre)', () => {
  ['setRelojServidor', 'ahora', 'ventanaJornada', 't0Jornada', 'confirmarInscripcion',
    'cambiarInscripcion', 'rechazarInscripcion', 'aplicarCierreJornada', 'registrarExcepcionPostCierre',
    'precargarPropuesta'].every(need);
  return true;
});

caso('C1-08-SALIDAS', 'Existen 8 salidas configuradas incluyendo 23:00 (DEC-032)', () => {
  const sal = S().contrato.salidas;
  return S().contrato.salidasPorJornada === 8
    && sal.length === 8
    && sal[0][0] === 23 && sal[0][1] === 0
    && sal[7][0] === 6 && sal[7][1] === 45
    && JSON.stringify(sal) === JSON.stringify([[23,0],[0,15],[1,35],[2,35],[3,35],[4,35],[5,35],[6,45]]);
});

caso('C1-23-VISIBLE', '23:00 es salida real sembrada y reservable', () => {
  const s23 = S().servicios.filter(s => {
    const d = new Date(s.salida);
    return d.getHours() === 23 && d.getMinutes() === 0;
  });
  return s23.length > 0;
});

// --- Ventana T−48 / T−2 sobre jornada con T0=2026-09-15 23:00 ---
const JORNADA = '2026-09-15'; // id jornada = fecha local del T0
caso('C1-ANTES-T48', 'Antes de T−48: inscripción cerrada', () => {
  need('setRelojServidor'); need('ventanaJornada');
  app.setRelojServidor('2026-09-13T22:59:59');
  const v = app.ventanaJornada(JORNADA);
  return v.estado === 'CERRADO' || v.estado === 'CERRADO_ANTES';
});

caso('C1-EXACTO-T48', 'Exactamente en T−48: inscripción abierta', () => {
  app.setRelojServidor('2026-09-13T23:00:00');
  const v = app.ventanaJornada(JORNADA);
  return v.estado === 'ABIERTA';
});

caso('C1-205959', '20:59:59 del día de T0: cambio/confirmación permitidos', () => {
  app.setRelojServidor('2026-09-15T20:59:59');
  const v = app.ventanaJornada(JORNADA);
  return v.estado === 'ABIERTA' && v.permiteMutacion === true;
});

caso('C1-210000', '21:00:00: bloqueo activo', () => {
  app.setRelojServidor('2026-09-15T21:00:00');
  const v = app.ventanaJornada(JORNADA);
  return v.estado === 'BLOQUEADA' || v.estado === 'BLOQUEADO_POR_CIERRE';
});

caso('C1-PROPUESTO-NO-CUPO', 'PROPUESTO no ocupa cupo confirmado', () => {
  app.setRelojServidor('2026-09-14T12:00:00');
  app.login(1);
  const svc = S().servicios.find(s => !s.ejecutado && new Date(s.salida).getHours() === 23);
  if (!svc) throw new Error('sin salida 23:00 futura');
  // limpiar reservas de Camila en ese servicio
  S().reservas = S().reservas.filter(r => !(r.userId === 1 && r.servicioId === svc.id));
  const antes = app.demanda(svc).confirmadas;
  const p = app.precargarPropuesta({ userId: 1, servicioId: svc.id, parada: 'Estadio Regional (Av. Angamos)', offset: 5, jornadaId: app.jornadaDe(svc.salida).id });
  const desp = app.demanda(svc);
  return p && p.estado === 'PROPUESTO' && desp.confirmadas === antes;
});

caso('C1-CONFIRMAR', 'CONFIRMAR ocupa cupo', () => {
  app.setRelojServidor('2026-09-14T12:00:00');
  app.login(1);
  const prop = S().reservas.find(r => r.userId === 1 && r.estado === 'PROPUESTO');
  if (!prop) throw new Error('sin propuesta');
  const svc = S().servicios.find(s => s.id === prop.servicioId);
  const antes = app.demanda(svc).confirmadas;
  const r = app.confirmarInscripcion(prop.id);
  const desp = app.demanda(svc);
  return r.ok && prop.estado === 'CONFIRMADO' && desp.confirmadas === antes + 1;
});

caso('C1-CAMBIAR', 'CAMBIAR mueve la reserva al nuevo servicio', () => {
  app.setRelojServidor('2026-09-14T12:00:00');
  app.login(1);
  const actual = S().reservas.find(r => r.userId === 1 && r.estado === 'CONFIRMADO');
  if (!actual) throw new Error('sin confirmada');
  const jid = app.jornadaDe(S().servicios.find(s => s.id === actual.servicioId).salida).id;
  const otro = S().servicios.find(s => s.id !== actual.servicioId && !s.ejecutado
    && app.jornadaDe(s.salida).id === jid
    && s.rutaIdx === 0
    && app.demanda(s).libres > 0);
  if (!otro) throw new Error('sin destino');
  const oldId = actual.servicioId;
  const r = app.cambiarInscripcion(actual.id, otro.id, { parada: 'Plaza Colón — Centro', offset: 15 });
  return r.ok && actual.servicioId === otro.id && actual.estado === 'CONFIRMADO'
    && !S().reservas.some(x => x.userId === 1 && x.servicioId === oldId && (x.estado === 'CONFIRMADO' || x.estado === 'PROPUESTO'));
});

caso('C1-RECHAZAR', 'RECHAZAR libera el cupo', () => {
  app.setRelojServidor('2026-09-14T12:00:00');
  app.login(1);
  const actual = S().reservas.find(r => r.userId === 1 && r.estado === 'CONFIRMADO');
  if (!actual) throw new Error('sin confirmada');
  const svc = S().servicios.find(s => s.id === actual.servicioId);
  const antes = app.demanda(svc).confirmadas;
  const r = app.rechazarInscripcion(actual.id);
  return r.ok && actual.estado === 'DECLINADO' && app.demanda(svc).confirmadas === antes - 1;
});

caso('C1-CIERRE-LIBERA', 'No confirmado al cierre libera reserva provisional', () => {
  app.setRelojServidor('2026-09-14T12:00:00');
  app.login(1);
  const svc = S().servicios.find(s => !s.ejecutado && app.jornadaDe(s.salida).id === JORNADA && new Date(s.salida).getHours() === 0);
  if (!svc) throw new Error('sin svc jornada');
  S().reservas = S().reservas.filter(r => !(r.userId === 1 && r.servicioId === svc.id));
  const p = app.precargarPropuesta({ userId: 1, servicioId: svc.id, parada: 'Terminal de Buses', offset: 22, jornadaId: JORNADA });
  const antesConf = app.demanda(svc).confirmadas;
  app.setRelojServidor('2026-09-15T21:00:00');
  const snap = app.aplicarCierreJornada(JORNADA);
  const p2 = S().reservas.find(r => r.id === p.id);
  return snap && snap.version && p2
    && (p2.estado === 'FUERA_MANIFIESTO' || p2.estado === 'BLOQUEADO_SIN_CONFIRMAR')
    && app.demanda(svc).confirmadas === antesConf
    && !(snap.confirmados || []).some(id => id === p.id);
});

caso('C1-POST-CIERRE', 'Modificación post-cierre rechazada y auditada', () => {
  app.setRelojServidor('2026-09-15T21:05:00');
  app.login(1);
  const svc = S().servicios.find(s => app.jornadaDe(s.salida).id === JORNADA && !s.ejecutado);
  const nAud = S().auditoria.length;
  // crear propuesta “a mano” para intentar confirmar tras cierre
  const id = Math.max(0, ...S().reservas.map(r => r.id)) + 1;
  S().reservas.push({ id, servicioId: svc.id, userId: 1, nombre: 'Camila Fuentes', parada: 'x', offset: 0,
    creada: app.ahora().toISOString(), estado: 'PROPUESTO', jornadaId: JORNADA, versionPropuesta: 1 });
  const r = app.confirmarInscripcion(id);
  const aud = S().auditoria[0];
  return r.ok === false && r.error === 'BLOQUEADO_POR_CIERRE'
    && S().auditoria.length > nAud
    && /BLOQUEADO|cierre|CIERRE/i.test(aud.accion + ' ' + aud.detalle);
});

caso('C1-EXCEPCION', 'Cambio posterior solo como excepción auditada', () => {
  app.setRelojServidor('2026-09-15T21:10:00');
  app.login(3); // mandante aprueba
  const r = app.registrarExcepcionPostCierre({
    userId: 1, servicioId: S().servicios.find(s => app.jornadaDe(s.salida).id === JORNADA).id,
    motivo: 'Cambio de turno post-cierre', tipo: 'INCORPORACION'
  });
  return r.ok && r.excepcion && r.excepcion.motivo === 'Cambio de turno post-cierre'
    && S().auditoria.some(a => /excepci[oó]n/i.test(a.accion + a.detalle));
});

caso('C1-T0-DISTINTO', 'Funciona con primera salida distinta de 23:00', () => {
  const orig = JSON.parse(JSON.stringify(S().contrato.salidas));
  const origN = S().contrato.salidasPorJornada;
  S().contrato.salidas = [[22, 30], [0, 15], [1, 35], [2, 35], [3, 35], [4, 35], [5, 35], [6, 45]];
  S().contrato.salidasPorJornada = 8;
  // T0 = 22:30 del 15 → bloqueo 20:30
  const vAbierta = (() => { app.setRelojServidor('2026-09-15T20:29:59'); return app.ventanaJornada(JORNADA, { t0Override: '2026-09-15T22:30:00' }); })();
  const vBloq = (() => { app.setRelojServidor('2026-09-15T20:30:00'); return app.ventanaJornada(JORNADA, { t0Override: '2026-09-15T22:30:00' }); })();
  S().contrato.salidas = orig; S().contrato.salidasPorJornada = origN;
  return vAbierta.estado === 'ABIERTA' && (vBloq.estado === 'BLOQUEADA' || vBloq.estado === 'BLOQUEADO_POR_CIERRE');
});

caso('C1-TZ-SCL', 'Cálculo correcto en America/Santiago (offsets locales)', () => {
  app.setRelojServidor('2026-09-13T23:00:00');
  const t0 = app.t0Jornada(JORNADA);
  const v = app.ventanaJornada(JORNADA);
  const ap = new Date(v.apertura);
  const bl = new Date(v.bloqueo);
  // T0 23:00 SCL → apertura 48h antes = 23:00 dos días antes; bloqueo 21:00 mismo día
  return t0.getHours() === 23 && t0.getMinutes() === 0
    && ap.getHours() === 23 && ap.getDate() === 13
    && bl.getHours() === 21 && bl.getMinutes() === 0 && bl.getDate() === 15;
});

caso('C1-PERMISOS', 'Trabajador no accede a funciones de contratista/mandante', () => {
  app.login(1);
  const den1 = app.requirePermission('crear:solicitud-extra') === false;
  const den2 = app.requirePermission('autorizar:extra') === false;
  const den3 = app.requirePermission('conciliar:periodo') === false;
  // no autoasignar rol
  const rolesAntes = S().role_assignments.filter(a => a.userId === 1).map(a => a.rol);
  if (typeof app.autoasignarRol === 'function') app.autoasignarRol(1, 'MANDANTE');
  const rolesDesp = S().role_assignments.filter(a => a.userId === 1 && a.activo).map(a => a.rol);
  return den1 && den2 && den3 && !rolesDesp.includes('MANDANTE') && rolesAntes.join() === rolesDesp.filter(r => r !== 'MANDANTE' || rolesAntes.includes(r)).join()
    && !rolesDesp.includes('ADMINISTRADOR');
});

caso('C1-PROYECCION', 'Proyección se calcula desde salidasPorJornada (no hardcode 420)', () => {
  const n = S().contrato.salidasPorJornada;
  const rutas = S().contrato.rutas.length;
  return app.periodo().proy.servicios === 30 * n * rutas;
});

caso('C1-SIM-FLAG', 'Marca de simulación presente (no seguridad de producción)', () =>
  /simulaci[oó]n|MODO DEMOSTRACI[OÓ]N|no representa seguridad/i.test(html));

caso('C1-XSS', 'XSS en parada/motivo se escapa como texto (AC-C1-17)', () => {
  need('esc');
  const raw = '<img src=x onerror=alert(1)>';
  return app.esc(raw) === '&lt;img src=x onerror=alert(1)&gt;'
    && /esc\(mia\.parada\)/.test(script)
    && /esc\(e\.motivo\)/.test(script)
    && /esc\(a\.detalle\)/.test(script);
});

caso('C1-CROSS', 'Trabajador A no modifica reserva de B (AC-C1-13)', () => {
  app.setRelojServidor('2026-09-14T12:00:00');
  app.login(1);
  const otra = S().reservas.find(r => r.userId !== 1 && (r.estado === 'confirmada' || r.estado === 'CONFIRMADO'));
  if (!otra) throw new Error('sin reserva ajena');
  const r1 = app.confirmarInscripcion(otra.id);
  const r2 = app.rechazarInscripcion(otra.id);
  const r3 = app.cambiarInscripcion(otra.id, otra.servicioId, {});
  return r1.ok === false && r1.error === 'NO_AUTORIZADO'
    && r2.ok === false && r2.error === 'NO_AUTORIZADO'
    && r3.ok === false && r3.error === 'NO_AUTORIZADO';
});

caso('C1-23-CONFIRM', 'Confirmación sobre salida 23:00 (AC-C1-20)', () => {
  app.setRelojServidor('2026-09-14T12:00:00');
  app.login(1);
  const svc = S().servicios.find(s => !s.ejecutado && new Date(s.salida).getHours() === 23 && s.rutaIdx === 0);
  if (!svc) throw new Error('sin 23:00');
  S().reservas = S().reservas.filter(r => !(r.userId === 1 && r.servicioId === svc.id));
  const p = app.precargarPropuesta({ userId: 1, servicioId: svc.id, parada: 'Estadio Regional (Av. Angamos)', offset: 5, jornadaId: app.jornadaDe(svc.salida).id });
  const r = app.confirmarInscripcion(p.id);
  return r.ok && p.estado === 'CONFIRMADO' && p.servicioId === svc.id;
});

const fallas = resultados.filter(r => !r.ok);
for (const r of resultados) console.log((r.ok ? 'PASS ' : 'FAIL ') + r.id + ' — ' + r.d + (r.err ? ' [' + r.err + ']' : ''));
console.log(`\nArchivo: ${path.relative(process.cwd(), archivo)} · ${resultados.length - fallas.length}/${resultados.length} casos correctos.`);
console.log('Alcance: JavaScript con DOM simulado + reloj inyectado; no es seguridad de servidor ni E2E.');
process.exit(fallas.length ? 1 : 0);
