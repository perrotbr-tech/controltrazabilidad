// SPEC-MVP-DEMO-CONSOLIDACION — suite mínima compuerta 60 min
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
process.env.TZ = 'America/Santiago';

const archivo = process.argv[2] || path.join(__dirname, '../09-plataforma/app/index.html');
const html = fs.readFileSync(archivo, 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error('FAIL — sin script'); process.exit(1); }

function loadApp() {
  const alertas = [];
  const ctx = {
    console, window: {}, location: { search: '' },
    document: { getElementById() { return { innerHTML: '', value: '', addEventListener() {}, classList: { add() {}, remove() {} } }; } },
    localStorage: { getItem() { return null; }, setItem() {} },
    alert(msg) { alertas.push(String(msg)); }
  };
  vm.createContext(ctx);
  vm.runInContext(m[1], ctx);
  return { app: ctx.window.app, ctx, alertas, html };
}

const { app, html: htmlSrc } = loadApp();
const S = () => app.S;
const out = [];
function caso(id, d, fn) {
  try { out.push({ id, d, ok: !!fn() }); }
  catch (e) { out.push({ id, d, ok: false, err: String(e && e.message || e) }); }
}

caso('MVP-NO-EX-TRABAJADOR', 'Portada no muestra Ex Trabajador', () => !/Ex Trabajador/.test(htmlSrc));
caso('MVP-PORTAL-3', 'Existen 3 recuadros de acceso', () =>
  htmlSrc.includes('trabajador de Enjoy') && htmlSrc.includes('empresa contratista') && htmlSrc.includes('gestor o administrador'));
caso('MVP-NO-BLOQUEO-UI', 'Trabajador no ve texto de bloqueo en cuenta regresiva', () =>
  htmlSrc.includes('cuentaRegresivaReserva') && !htmlSrc.includes('cuentaRegresivaBloqueo') && htmlSrc.includes('Reservas y cambios disponibles hasta las 21:00'));
caso('MVP-NO-CIERRE-22', 'No muestra cierre de reservas salida 22:00 al trabajador', () =>
  !htmlSrc.includes('Cierre de reservas salida'));
caso('MVP-TEXTOS', 'Textos simples de acciones', () =>
  htmlSrc.includes('Solicitar cupo') && htmlSrc.includes('Confirmar asistencia') && htmlSrc.includes('Cambiar traslado') && htmlSrc.includes('Cancelar solicitud'));
caso('MVP-LIB-CONFIG', 'Hora de liberación configurable (20)', () =>
  app.horaLiberacionConfig() === 20 && app.setHoraLiberacionCupos(19).ok && app.horaLiberacionConfig() === 19);
caso('MVP-INACTIVO', 'Usuario inactivo no entra', () => {
  app.reset();
  app.login(5);
  return S().sesion === 5 && S().contexto === null;
});
caso('MVP-CARGA-CSV', 'Carga masiva detecta OK y duplicados', () => {
  app.reset(); app.login(4);
  const rows = app.parseCsvMasivo('Nuevo Demo;99.111.222-3;Garzón;02:00;02:00;0;true\nCamila Fuentes;12.345.678-9;Recepcionista;02:00;02:00;0;true\n;sin-id;;;;');
  return rows[0].errores.length === 0 && rows[1].errores.includes('duplicado') && rows[2].errores.length > 0;
});
caso('MVP-UNA-CONFIRMADA', 'No dos confirmadas misma jornada', () => {
  app.reset();
  app.setRelojServidor('2026-09-14T12:00:00');
  app.login(1);
  const svc = S().servicios.find(s => !s.ejecutado && s.rutaIdx === 0);
  const jid = app.jornadaDe(svc.salida).id;
  const id = Math.max(0, ...S().reservas.map(r => r.id)) + 1;
  S().reservas.push({ id, servicioId: svc.id, userId: 1, nombre: 'Camila Fuentes', parada: 'Plaza Colón — Centro', offset: 15,
    creada: app.ahora().toISOString(), estado: 'CONFIRMADO', jornadaId: jid });
  const id2 = id + 1;
  S().reservas.push({ id: id2, servicioId: svc.id, userId: 1, nombre: 'Camila Fuentes', parada: 'Plaza Colón — Centro', offset: 15,
    creada: app.ahora().toISOString(), estado: 'PROPUESTO', jornadaId: jid });
  const r = app.confirmarInscripcion(id2);
  return r.ok === false && r.error === 'YA_CONFIRMADA_JORNADA';
});
caso('MVP-ANTICIPADA', 'Anticipada no ocupa cupo antes de liberación', () => {
  app.setRelojServidor('2026-09-15T18:00:00');
  app.reset(); // sembrar con el mismo reloj para que ejecutado sea coherente
  app.login(1);
  const svc = S().servicios.find(s => !s.ejecutado && s.rutaIdx === 0
    && app.ventanaJornada(app.jornadaDe(s.salida).id).estado === 'ABIERTA');
  const jid = app.jornadaDe(svc.salida).id;
  const antes = app.demanda(svc).confirmadas;
  const p = app.precargarPropuesta({ userId: 1, servicioId: svc.id, parada: 'Plaza Colón — Centro', offset: 15, jornadaId: jid });
  if (!p || p.ok === false) throw new Error('precarga ' + (p && p.error));
  p.solicitudAnticipada = true;
  const r = app.confirmarInscripcion(p.id);
  return r.ok && r.reserva.estado === 'ANTICIPADA_ESPERA' && app.demanda(svc).confirmadas === antes && !app.ocupaCupo(r.reserva);
});
caso('MVP-LIBERACION', 'Liberación promueve por orden sin superar capacidad', () => {
  app.setRelojServidor('2026-09-15T20:00:00');
  app.reset();
  app.login(1);
  const svc = S().servicios.find(s => !s.ejecutado && s.rutaIdx === 0);
  const jid = app.jornadaDe(svc.salida).id;
  const cap = app.capacidadTotal(svc);
  // vaciar ocupantes
  S().reservas.filter(r => r.servicioId === svc.id).forEach(r => { r.estado = 'cancelada'; });
  const mk = (uid, t) => {
    const id = Math.max(0, ...S().reservas.map(r => r.id)) + 1;
    S().reservas.push({ id, servicioId: svc.id, userId: uid, nombre: 'T' + uid, parada: 'Plaza Colón — Centro', offset: 15,
      creada: t, estado: 'ANTICIPADA_ESPERA', jornadaId: jid, solicitudAnticipada: true });
    return id;
  };
  mk(6, '2026-09-15T10:00:00');
  mk(7, '2026-09-15T11:00:00');
  const r = app.liberarCuposTurnoSiguiente(svc.id);
  const conf = S().reservas.filter(x => x.servicioId === svc.id && (x.estado === 'CONFIRMADO' || x.estado === 'confirmada'));
  return r.ok && conf.length <= cap && conf.length === 2 && conf[0].userId === 6;
});
caso('MVP-OCUP-50', 'Exactamente 50% no es inferior; 46.7% sí', () => {
  app.reset();
  const svc = S().servicios.find(s => !s.ejecutado);
  S().reservas.filter(r => r.servicioId === svc.id).forEach(r => { r.estado = 'cancelada'; });
  svc.capacidadBase = 15; svc.capacidadExtra = 0;
  for (let i = 0; i < 8; i++) {
    S().reservas.push({ id: 9000 + i, servicioId: svc.id, userId: 100 + i, nombre: 'P' + i, parada: 'x', offset: 0,
      creada: '2026-09-14T10:00:00', estado: 'CONFIRMADO', jornadaId: '2026-09-15' });
  }
  const ok50 = !app.bajoMinimoContractual(svc);
  S().reservas.pop();
  const bajo = app.bajoMinimoContractual(svc);
  return ok50 && bajo && Math.abs(app.ocupacionPct(svc) - (7 / 15) * 100) < 0.1;
});
caso('MVP-RUTA-PRIV', 'Ruta prevista sin RUT en listado de pasajeros', () => {
  app.reset();
  const svc = S().servicios.find(s => !s.ejecutado && s.rutaIdx === 0);
  const rp = app.construirRutaPrevista(svc);
  const blob = JSON.stringify(rp);
  return rp.paradas && !/identificador|RUT|12\.345/.test(blob);
});
caso('MVP-EXTRA-SIN-AUTO', 'Van extra no autorizada solo por existir', () => {
  return /Cupos disponibles ≠ autorización|no está autorizada solo por existir cupos/.test(htmlSrc);
});
caso('MVP-JORNADA-ETIQUETA', 'Jornada nocturna con flecha de días', () => {
  const j = app.jornadaDe('2026-09-16T00:15:00');
  return /Jornada nocturna:/.test(j.etiqueta) && j.etiqueta.includes('→');
});

const fail = out.filter(x => !x.ok);
out.forEach(x => console.log((x.ok ? 'PASS' : 'FAIL') + ' ' + x.id + ' — ' + x.d + (x.err ? ' :: ' + x.err : '')));
console.log(fail.length ? `\n${fail.length} fallos / ${out.length}` : `\nOK ${out.length}/${out.length}`);
process.exit(fail.length ? 1 : 0);
