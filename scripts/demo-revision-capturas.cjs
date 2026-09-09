/**
 * Capturas DEMO PARA REVISIÓN — datos 100% ficticios.
 * Uso: node scripts/demo-revision-capturas.cjs
 * No commit requerido; salida en /opt/cursor/artifacts/demo-revision/
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = '/opt/cursor/artifacts/demo-revision';
const URL = process.env.DEMO_URL || 'http://127.0.0.1:8765/index.html';

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });

  async function withPage(viewport, fn) {
    const page = await browser.newPage({ viewport });
    page.on('dialog', async d => { try { await d.accept(); } catch (_) {} });
    await page.goto(URL);
    await page.evaluate(() => { localStorage.clear(); });
    await page.reload();
    await page.waitForSelector('text=Trazabilidad');
    await fn(page);
    await page.close();
  }

  // 1) Login (móvil)
  await withPage({ width: 390, height: 844 }, async page => {
    await page.waitForSelector('text=MODO DEMOSTRACIÓN');
    await page.waitForSelector('text=Reiniciar datos de demostración');
    await page.screenshot({ path: path.join(OUT, '01-login-mobile.png') });
  });

  // 1b) Login escritorio
  await withPage({ width: 1280, height: 800 }, async page => {
    await page.screenshot({ path: path.join(OUT, '01-login-desktop.png') });
  });

  // 2) Trabajador con traslado PROPUESTO
  await withPage({ width: 390, height: 844 }, async page => {
    await page.getByRole('button', { name: /Camila Fuentes/i }).click();
    await page.waitForSelector('text=Mis traslados');
    await page.evaluate(() => {
      const app = window.app;
      app.setRelojServidor('2026-09-14T12:00:00');
      app.reiniciarDemo();
      app.login(1);
      const svc = app.S.servicios.find(s => !s.ejecutado && s.rutaIdx === 0 && new Date(s.salida).getHours() === 23);
      app.S.reservas = app.S.reservas.filter(r => !(r.userId === 1 && ['PROPUESTO','CONFIRMADO','confirmada','EN_ESPERA','espera'].includes(r.estado)));
      const id = Math.max(0, ...app.S.reservas.map(r => r.id)) + 1;
      app.S.reservas.push({
        id, servicioId: svc.id, userId: 1, nombre: 'Camila Fuentes',
        parada: 'Estadio Regional (Av. Angamos)', offset: 5,
        creada: '2026-09-14T10:00:00.000Z', estado: 'PROPUESTO',
        jornadaId: app.jornadaDe(svc.salida).id, versionPropuesta: 1
      });
      app.login(1);
    });
    await page.waitForSelector('text=Propuesto');
    await page.screenshot({ path: path.join(OUT, '02-trabajador-propuesto.png') });
  });

  // 3) Confirmación salida 23:00
  await withPage({ width: 390, height: 844 }, async page => {
    await page.getByRole('button', { name: /Camila Fuentes/i }).click();
    await page.evaluate(() => {
      const app = window.app;
      app.setRelojServidor('2026-09-14T12:00:00');
      app.reiniciarDemo();
      app.login(1);
      const svc = app.S.servicios.find(s => !s.ejecutado && s.rutaIdx === 0 && new Date(s.salida).getHours() === 23);
      app.S.reservas = app.S.reservas.filter(r => !(r.userId === 1 && ['PROPUESTO','CONFIRMADO','confirmada','EN_ESPERA','espera'].includes(r.estado)));
      const id = Math.max(0, ...app.S.reservas.map(r => r.id)) + 1;
      app.S.reservas.push({
        id, servicioId: svc.id, userId: 1, nombre: 'Camila Fuentes',
        parada: 'Estadio Regional (Av. Angamos)', offset: 5,
        creada: '2026-09-14T10:00:00.000Z', estado: 'PROPUESTO',
        jornadaId: app.jornadaDe(svc.salida).id, versionPropuesta: 1
      });
      app.login(1);
    });
    await page.getByRole('button', { name: 'Confirmar' }).first().click();
    await page.waitForSelector('text=Confirmado');
    await page.screenshot({ path: path.join(OUT, '03-confirmacion-2300.png') });
  });

  // 4) Cambio de ruta y parada
  await withPage({ width: 1280, height: 800 }, async page => {
    await page.getByRole('button', { name: /Camila Fuentes/i }).click();
    await page.evaluate(() => {
      const app = window.app;
      app.setRelojServidor('2026-09-14T12:00:00');
      app.reiniciarDemo();
      app.login(1);
      const svc = app.S.servicios.find(s => !s.ejecutado && s.rutaIdx === 0 && new Date(s.salida).getHours() === 23);
      app.S.reservas = app.S.reservas.filter(r => !(r.userId === 1 && ['PROPUESTO','CONFIRMADO','confirmada','EN_ESPERA','espera'].includes(r.estado)));
      const id = Math.max(0, ...app.S.reservas.map(r => r.id)) + 1;
      app.S.reservas.push({
        id, servicioId: svc.id, userId: 1, nombre: 'Camila Fuentes',
        parada: 'Plaza Colón — Centro', offset: 15,
        creada: '2026-09-14T10:00:00.000Z', estado: 'CONFIRMADO',
        jornadaId: app.jornadaDe(svc.salida).id
      });
      app.login(1);
    });
    await page.getByRole('button', { name: 'Cambiar' }).first().click();
    await page.waitForSelector('#mCambiar');
    await page.screenshot({ path: path.join(OUT, '04a-cambio-selector-rutas.png') });
    await page.evaluate(() => {
      const sel = document.getElementById('mCambiar');
      const sur = [...sel.options].find(o => /Sur/i.test(o.textContent));
      sel.value = sur.value;
    });
    await page.locator('#modal button.amb').click();
    await page.waitForSelector('#mParadaCambio');
    await page.screenshot({ path: path.join(OUT, '04b-cambio-parada-requerida.png') });
  });

  // 5) Lista de espera (trabajador EN_ESPERA + demanda con espera)
  await withPage({ width: 390, height: 844 }, async page => {
    await page.getByRole('button', { name: /Camila Fuentes/i }).click();
    await page.evaluate(() => {
      const app = window.app;
      app.setRelojServidor('2026-09-14T12:00:00');
      app.reiniciarDemo();
      app.login(1);
      const svc = app.S.servicios.find(s => !s.ejecutado && s.rutaIdx === 0 && new Date(s.salida).getHours() === 0 && new Date(s.salida).getMinutes() === 15);
      app.S.reservas = app.S.reservas.filter(r => !(r.userId === 1 && ['PROPUESTO','CONFIRMADO','confirmada','EN_ESPERA','espera'].includes(r.estado)));
      const id = Math.max(0, ...app.S.reservas.map(r => r.id)) + 1;
      app.S.reservas.push({
        id, servicioId: svc.id, userId: 1, nombre: 'Camila Fuentes',
        parada: 'Plaza Colón — Centro', offset: 15,
        creada: '2026-09-14T11:00:00.000Z', estado: 'EN_ESPERA',
        jornadaId: app.jornadaDe(svc.salida).id
      });
      app.login(1);
    });
    await page.waitForSelector('text=En espera');
    await page.screenshot({ path: path.join(OUT, '05-lista-espera-trabajador.png') });
  });

  // 6) Contratista
  await withPage({ width: 1280, height: 800 }, async page => {
    await page.getByRole('button', { name: /Rodrigo Salas/i }).click();
    await page.waitForSelector('text=Demanda');
    await page.screenshot({ path: path.join(OUT, '06-contratista-demanda.png') });
  });

  // 7) Mandante + auditoría
  await withPage({ width: 1280, height: 800 }, async page => {
    await page.getByRole('button', { name: /Patricia Molina/i }).click();
    await page.waitForSelector('text=Panel');
    await page.screenshot({ path: path.join(OUT, '07a-mandante-panel.png') });
    await page.getByRole('button', { name: 'Trazabilidad', exact: true }).click();
    await page.waitForSelector('text=Trazabilidad');
    await page.screenshot({ path: path.join(OUT, '07b-mandante-auditoria.png') });
    await page.getByRole('button', { name: 'Contrato', exact: true }).click();
    await page.waitForSelector('text=fijo');
    await page.screenshot({ path: path.join(OUT, '07c-mandante-contrato-fijo.png') });
  });

  // Escritorio Mis traslados con banner demo
  await withPage({ width: 1280, height: 800 }, async page => {
    await page.getByRole('button', { name: /Camila Fuentes/i }).click();
    await page.waitForSelector('text=MODO DEMOSTRACIÓN');
    await page.screenshot({ path: path.join(OUT, '08-desktop-trabajador-demo-flag.png') });
  });

  console.log('OK capturas en', OUT);
  console.log(fs.readdirSync(OUT).sort().join('\n'));
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
