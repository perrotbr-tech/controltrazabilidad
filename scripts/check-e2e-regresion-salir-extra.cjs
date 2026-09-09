// Regresión E2E determinista: modal de solicitud de extra (validación / cierre / Salir).
// Origen: TimeoutError histórico en e2e-contraprueba.js — velo abierto tras Enviar inválido.
// No depende del índice ni de que 23:00 sea la primera opción: localiza por etiqueta semántica
// o aplica fixture controlado (vaciar motivo).
// Uso: CHROMIUM=/usr/bin/google-chrome node scripts/check-e2e-regresion-salir-extra.cjs
const { chromium } = require('playwright');
const path = require('path');

const HTML = path.resolve(__dirname, '../09-plataforma/app/index.html');
const resultados = [];
function caso(id, d, ok, err) {
  resultados.push({ id, d, ok: !!ok, err });
  console.log((ok ? 'PASS ' : 'FAIL ') + id + ' — ' + d + (err ? ' [' + err + ']' : ''));
}

async function listarOpcionesSalida(page) {
  return page.locator('#selSalida option').evaluateAll(os =>
    os.map(o => ({ value: o.value, text: (o.textContent || '').trim() })));
}

/** Salida cuya UI no precarga motivo (justificación no automática). */
function pickSinJustificacionAuto(opts) {
  return opts.find(o => /No requerido por capacidad/i.test(o.text))
    || opts.find(o => /Capacidad completa/i.test(o.text));
}

/** Salida con necesidad cuantitativa (motivo automático). */
function pickCuantitativa(opts) {
  return opts.find(o => /Necesidad cuantitativa/i.test(o.text))
    || opts.find(o => {
      const m = o.text.match(/(\d+)\s*\/\s*(\d+)/);
      return m && Number(m[1]) > Number(m[2]);
    });
}

async function loginContratistaExtras(page) {
  await page.goto('file://' + HTML);
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.click('button.cuenta:has-text("Rodrigo Salas")');
  await page.waitForSelector('text=Demanda y abordajes');
  await page.click('.nav button:has-text("Vehículos adicionales")');
  await page.waitForSelector('#selSalida');
}

async function abrirModalPara(page, value) {
  await page.selectOption('#selSalida', value);
  await page.click('button:has-text("Evaluar y solicitar")');
  await page.waitForSelector('#mVans');
  await page.waitForSelector('#mMotivo');
}

async function veloAbierto(page) {
  return page.evaluate(() => {
    const v = document.getElementById('velo');
    return !!(v && v.classList.contains('abierto'));
  });
}

async function cerrarModalSiAbierto(page) {
  if (!(await veloAbierto(page))) return;
  await page.click('#velo button:has-text("Cancelar")');
  await page.waitForFunction(() => {
    const v = document.getElementById('velo');
    return v && !v.classList.contains('abierto');
  });
}

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM || undefined,
    args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await loginContratistaExtras(page);
  const opts = await listarOpcionesSalida(page);
  if (!opts.length) throw new Error('Fixture: #selSalida sin opciones');

  // ---------- a) Envío inválido sin motivo → modal abierto + validación ----------
  try {
    let pickInv = pickSinJustificacionAuto(opts);
    let fixture = 'semántica:No requerido/Capacidad completa';
    if (!pickInv) {
      // Fixture controlado: cualquier salida cuantitativa con motivo vaciado a mano.
      pickInv = pickCuantitativa(opts) || opts.find(o => o.value);
      fixture = 'controlado:vaciar #mMotivo';
    }
    if (!pickInv) throw new Error('No hay salida usable para caso inválido');

    await abrirModalPara(page, pickInv.value);
    // Garantiza envío inválido independientemente de precarga de la semilla
    await page.fill('#mMotivo', '');
    if (await page.locator('#mRazon').count()) {
      // razón operacional puede existir; el requisito fallido es motivo vacío
    }
    const alerts = [];
    const onDialog = async d => { alerts.push(d.message()); await d.accept(); };
    page.on('dialog', onDialog);
    await page.click('button:has-text("Enviar solicitud")');
    await page.waitForFunction(() => {
      const v = document.getElementById('velo');
      return v && v.classList.contains('abierto');
    });
    page.off('dialog', onDialog);
    const open = await veloAbierto(page);
    caso('A-MODAL-ABIERTO',
      'Envío inválido sin motivo mantiene el modal abierto (' + fixture + ')',
      open === true,
      'pick=' + pickInv.text);
    caso('A-VALIDACION',
      'Envío inválido muestra validación de motivo obligatorio',
      alerts.some(a => /motivo es obligatorio/i.test(a)),
      'alerts=' + JSON.stringify(alerts));
  } catch (e) {
    caso('A-MODAL-ABIERTO', 'Envío inválido sin motivo mantiene el modal abierto', false, String(e.message || e));
    caso('A-VALIDACION', 'Envío inválido muestra validación de motivo obligatorio', false, String(e.message || e));
  }

  await cerrarModalSiAbierto(page);

  // ---------- b) Envío válido con motivo → modal cierra ----------
  try {
    let pickOk = pickCuantitativa(opts);
    let fixture = 'semántica:Necesidad cuantitativa';
    if (!pickOk) {
      pickOk = pickSinJustificacionAuto(opts) || opts.find(o => o.value);
      fixture = 'controlado:motivo+razón manual';
    }
    if (!pickOk) throw new Error('No hay salida usable para caso válido');

    await abrirModalPara(page, pickOk.value);
    let motivo = await page.locator('#mMotivo').inputValue();
    if (!motivo.trim()) {
      if (await page.locator('#mRazon').count()) {
        await page.selectOption('#mRazon', { label: 'Contingencia' });
      }
      await page.fill('#mMotivo', 'Motivo de prueba determinista — demanda sobre capacidad');
      motivo = await page.locator('#mMotivo').inputValue();
    }
    caso('B-MOTIVO-PRESENTE', 'Antes de enviar válido hay motivo no vacío (' + fixture + ')',
      motivo.trim().length > 0);

    await page.selectOption('#mVans', '1');
    await page.click('button:has-text("Enviar solicitud")');
    await page.waitForFunction(() => {
      const v = document.getElementById('velo');
      return v && !v.classList.contains('abierto');
    });
    caso('B-MODAL-CIERRA', 'Envío válido con motivo cierra el modal',
      (await veloAbierto(page)) === false);
  } catch (e) {
    caso('B-MOTIVO-PRESENTE', 'Antes de enviar válido hay motivo no vacío', false, String(e.message || e));
    caso('B-MODAL-CIERRA', 'Envío válido con motivo cierra el modal', false, String(e.message || e));
  }

  // ---------- c) Tras el cierre, Salir disponible ----------
  try {
    await page.waitForFunction(() => {
      const v = document.getElementById('velo');
      const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Salir');
      if (!v || !btn) return false;
      if (v.classList.contains('abierto')) return false;
      const r = btn.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && !btn.disabled;
    });
    await page.click('button:has-text("Salir")');
    await page.waitForSelector('button.cuenta:has-text("Camila Fuentes")');
    caso('C-SALIR', 'Después del cierre, el botón Salir vuelve a estar disponible y funciona', true);
  } catch (e) {
    caso('C-SALIR', 'Después del cierre, el botón Salir vuelve a estar disponible y funciona', false, String(e.message || e));
  }

  await browser.close();
  const fallas = resultados.filter(r => !r.ok);
  console.log(`\n${resultados.length - fallas.length}/${resultados.length} casos correctos.`);
  process.exit(fallas.length ? 1 : 0);
})().catch(e => { console.error('ERROR', e); process.exit(1); });
