#!/usr/bin/env node
// Valida localmente el workflow CI (SPEC-008): YAML + mismos comandos del job checks.
// Uso: TZ=America/Santiago node scripts/validate-ci-local.cjs
// Opcional: INCLUDE_E2E=1 para correr también Playwright (requiere npm ci + chromium).
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.join(__dirname, '..');
const wf = path.join(root, '.github/workflows/ci.yml');
const fail = (m) => { console.error('FAIL ' + m); process.exitCode = 1; };
const pass = (m) => console.log('PASS ' + m);

if (!fs.existsSync(wf)) { fail('Falta .github/workflows/ci.yml'); process.exit(1); }
const yaml = fs.readFileSync(wf, 'utf8');

if (!/^on:\s*\n\s*pull_request:\s*$/m.test(yaml) && !/pull_request:/.test(yaml)) fail('Workflow debe dispararse en pull_request');
else pass('Disparador pull_request presente');

if (!/permissions:\s*\n\s*contents:\s*read/.test(yaml)) fail('permissions.contents debe ser read');
else pass('permissions.contents: read');

if (/secrets\./.test(yaml) || /\$\{\{\s*secrets/.test(yaml)) fail('No debe usar secrets');
else pass('Sin referencias a secrets');

if (/deploy|vercel|supabase|gh-pages|netlify/i.test(yaml)) fail('No debe desplegar');
else pass('Sin pasos de despliegue');

if (!/node-version:\s*["']?22["']?/.test(yaml)) fail('Debe usar Node 22');
else pass('Node 22 configurado');

if (!/TZ:\s*America\/Santiago/.test(yaml)) fail('Debe fijar TZ America/Santiago');
else pass('TZ America/Santiago');

for (const s of ['check-baseline.cjs', 'check-config.cjs', 'check-permisos.cjs', 'check-corte1.cjs', 'e2e-contraprueba.js', 'check-e2e-regresion-salir-extra.cjs']) {
  if (!yaml.includes(s)) fail('Workflow no referencia ' + s);
  else pass('Referencia ' + s);
}

const env = { ...process.env, TZ: 'America/Santiago' };
function run(label, cmd, args) {
  const r = spawnSync(cmd, args, { cwd: root, env, encoding: 'utf8' });
  if (r.status !== 0) {
    fail(label + ' exit ' + r.status);
    if (r.stdout) process.stdout.write(r.stdout);
    if (r.stderr) process.stderr.write(r.stderr);
    return false;
  }
  pass(label);
  return true;
}

run('check-baseline.cjs', 'node', ['scripts/check-baseline.cjs']);
run('check-config.cjs', 'node', ['scripts/check-config.cjs']);
run('check-permisos.cjs', 'node', ['scripts/check-permisos.cjs']);
run('check-corte1.cjs', 'node', ['scripts/check-corte1.cjs']);

if (process.env.INCLUDE_E2E === '1') {
  run('e2e-contraprueba.js', 'node', ['scripts/e2e-contraprueba.js']);
  run('check-e2e-regresion-salir-extra.cjs', 'node', ['scripts/check-e2e-regresion-salir-extra.cjs']);
} else {
  console.log('SKIP e2e (defina INCLUDE_E2E=1 para incluirlo)');
}

if (process.exitCode) {
  console.log('\nRESULTADO: FAIL');
  process.exit(1);
}
console.log('\nRESULTADO: PASS');
