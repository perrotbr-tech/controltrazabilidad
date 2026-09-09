// Requiere: npm install playwright (Chromium). Uso: node scripts/e2e-contraprueba.js  (CAPTURAS=dir para cambiar la carpeta de capturas) CHROMIUM=ruta para usar un Chromium ya instalado.
// Contraprueba E2E de SPEC-002 + SPEC-003 sobre 09-plataforma/app/index.html en Chromium real.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const OUT = process.env.CAPTURAS || path.join(__dirname, '../08-validacion/capturas-e2e'); fs.mkdirSync(OUT, { recursive: true });
const HTML = path.resolve(__dirname, '../09-plataforma/app/index.html');
const errores = []; const alertas = []; const log = [];
function ok(c, m) { log.push((c ? 'PASS ' : 'FAIL ') + m); if (!c) process.exitCode = 1; }
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('pageerror', e => errores.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  page.on('dialog', async d => { alertas.push(d.message()); await d.accept(); });
  await page.goto('file://' + HTML);
  await page.screenshot({ path: OUT + '/01-login.png', fullPage: true });
  ok(await page.locator('text=Camila Fuentes').count() === 1, 'Login muestra cuentas de demostración');

  // TRABAJADOR
  await page.click('button.cuenta:has-text("Camila Fuentes")');
  await page.waitForSelector('text=Mis traslados');
  // Corte 1 añade la tarjeta "Próximo traslado" al inicio; la capacidad vive en las tarjetas de salida.
  const textosTarjetas = await page.locator('.tarjeta').allInnerTexts();
  const cap = textosTarjetas.find(t => /\d+\s*\/\s*\d+/.test(t)) || textosTarjetas[0] || '';
  ok(/\/30/.test(cap) || /\/45/.test(cap), 'Trabajador ve capacidad sobre 30 cupos (15 × 2 vans): ' + (cap.match(/\d+\s*\/\s*\d+/) || [''])[0]);
  ok(!/\/8\b/.test(cap), 'Sin rastro de la capacidad antigua de 8 cupos');
  await page.screenshot({ path: OUT + '/02-trabajador-mis-traslados.png', fullPage: true });
  await page.click('button:has-text("Salir")');

  // CONTRATISTA
  await page.click('button.cuenta:has-text("Rodrigo Salas")');
  await page.waitForSelector('text=Demanda y abordajes');
  await page.screenshot({ path: OUT + '/03-contratista-demanda.png', fullPage: true });
  await page.click('.nav button:has-text("Vehículos adicionales")');
  await page.waitForSelector('#selSalida');
  const cab = await page.locator('h1:has-text("Vehículos adicionales") + p').innerText();
  ok(/2 vans adicionales/.test(cab) && /por van, no por pasajero/.test(cab), 'Cabecera de extras: 2 vans a disposición, cobro por van');
  // DEC-032: la 1ª salida cronológica suele ser 23:00 con cupo libre (sin motivo automático).
  // El E2E histórico asume justificación cuantitativa: seleccionar esa salida antes de abrir el modal.
  const optsSalida = await page.locator('#selSalida option').evaluateAll(os =>
    os.map(o => ({ value: o.value, text: o.textContent || '' })));
  const salidaCuant = optsSalida.find(o => /Necesidad cuantitativa/i.test(o.text))
    || optsSalida.find(o => { const m = o.text.match(/(\d+)\s*\/\s*(\d+)/); return m && Number(m[1]) > Number(m[2]); });
  ok(!!salidaCuant, 'Hay salida con necesidad cuantitativa para solicitar extra' + (salidaCuant ? ': ' + salidaCuant.text : ''));
  if (salidaCuant) await page.selectOption('#selSalida', salidaCuant.value);
  await page.click('button:has-text("Evaluar y solicitar")');
  await page.waitForSelector('#mVans');
  const opciones = await page.locator('#mVans option').allInnerTexts();
  ok(opciones.length === 2 && /\+15/.test(opciones[0]) && /\+30/.test(opciones[1]), 'Selector de vans: ' + opciones.join(' | '));
  await page.screenshot({ path: OUT + '/04-contratista-modal-solicitud.png', fullPage: true });
  await page.selectOption('#mVans', '2');
  await page.click('button:has-text("Enviar solicitud")');
  // Condición de éxito: el velo del modal de solicitud debe cerrarse (creaSolicitud → cierraModal).
  await page.waitForFunction(() => !document.getElementById('velo').classList.contains('abierto'));
  const tarjetaNueva = await page.locator('.tarjeta').last().innerText();
  ok(/2 van\(es\) · \+30 cupos · \$90\.000/.test(tarjetaNueva), 'Solicitud creada: 2 vans, +30 cupos, $90.000 (2 × tarifa por van)');
  await page.screenshot({ path: OUT + '/05-contratista-solicitud-creada.png', fullPage: true });
  await page.click('button:has-text("Salir")');

  // MANDANTE
  await page.click('button.cuenta:has-text("Patricia Molina")');
  await page.waitForSelector('text=Panel de control contractual');
  await page.screenshot({ path: OUT + '/06-mandante-panel.png', fullPage: true });
  await page.click('.nav button:has-text("Solicitudes de extras")');
  await page.waitForSelector('button:has-text("Autorizar")');
  const pend = await page.locator('.tarjeta').first().innerText();
  ok(/Capacidad propuesta\s+\+30/.test(pend.replace(/\n/g, ' ')), 'Mandante ve capacidad propuesta +30');
  await page.screenshot({ path: OUT + '/07-mandante-solicitud-pendiente.png', fullPage: true });
  await page.click('button:has-text("Autorizar")');
  await page.waitForSelector('#mDec');
  await page.fill('#mDec', 'Demanda confirmada sobre capacidad (contraprueba)');
  await page.click('button:has-text("Confirmar")');
  await page.waitForFunction(() => !document.getElementById('velo').classList.contains('abierto'));
  await page.click('.nav button:has-text("Trazabilidad")');
  const aud = await page.locator('.aud').first().innerText();
  ok(/capacidad 30 → 60/.test(aud), 'Auditoría: capacidad 30 → 60 tras autorizar 2 vans: ' + aud.slice(0, 120));
  await page.screenshot({ path: OUT + '/08-mandante-trazabilidad.png', fullPage: true });
  await page.click('.nav button:has-text("Contrato")');
  const contrato = await page.locator('.tarjeta').innerText();
  ok(/15 cupos garantizados/.test(contrato) && /Vans adicionales a disposición/.test(contrato) && /Sentido/.test(contrato), 'Vista Contrato: 15 cupos, vans adicionales, sentido');
  await page.screenshot({ path: OUT + '/09-mandante-contrato.png', fullPage: true });
  await page.click('.nav button:has-text("Conciliación mensual")');
  ok(await page.locator('button:has-text("Cerrar período")').isDisabled(), 'Conciliación bloqueada por el extra Observado');
  await page.screenshot({ path: OUT + '/10-mandante-conciliacion.png', fullPage: true });

  // Escritorio: una captura del panel
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.click('.nav button:has-text("Panel de control")');
  await page.screenshot({ path: OUT + '/11-mandante-panel-escritorio.png', fullPage: true });

  await browser.close();
  ok(errores.length === 0, 'Sin errores de JavaScript en consola' + (errores.length ? ': ' + errores.join(' | ') : ''));
  ok(alertas.length === 0, 'Sin alertas inesperadas' + (alertas.length ? ': ' + alertas.join(' | ') : ''));
  console.log(log.join('\n'));
  console.log('\nCapturas en ' + OUT);
})().catch(e => { console.error('ERROR', e); process.exit(1); });
