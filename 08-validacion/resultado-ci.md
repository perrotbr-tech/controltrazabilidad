# Verificación CI — SPEC-008 (actualizado 2026-09-09, post Corte 1 + regresión modal)

## Alcance actual del workflow
- Job `checks`: `check-baseline`, `check-config`, `check-permisos`, **`check-corte1`**
- Job `e2e` (needs checks): `e2e-contraprueba.js` + **`check-e2e-regresion-salir-extra.cjs`**
- Sin secretos; sin despliegue; `permissions.contents: read`; Node 22; TZ America/Santiago

## Comandos npm
- `npm test` → baseline + config + permisos + corte1
- `npm run test:e2e` → contraprueba histórica
- `npm run test:e2e-regresion-modal` → regresión modal (A inválido / B válido / C Salir)
- `npm run test:e2e:all` → ambas E2E

## Regresión modal (determinista)
`scripts/check-e2e-regresion-salir-extra.cjs` localiza salidas por **etiqueta semántica** (`No requerido por capacidad` / `Necesidad cuantitativa`) o aplica **fixture** (vaciar/rellenar `#mMotivo`). No usa índice 0 ni asume que 23:00 sea la primera opción.

## Validación local
`TZ=America/Santiago INCLUDE_E2E=1 node scripts/validate-ci-local.cjs`

## Limitaciones
- No acredita autenticación real ni seguridad de producción.
- E2E usa `file://`; Chromium vía Playwright en el job `e2e`.

## Incidente CI remoto (PR #4, run 34383501366)
- Job `checks` (baseline/config/permisos/corte1): **PASS**
- Job `e2e`: falló en `Install Chromium for Playwright` por `Hash Sum mismatch` del mirror apt `dl.google.com/linux/chrome-stable` al usar `playwright install --with-deps`.
- Mitigación en workflow: eliminar `google-chrome*.list` del runner antes de instalar Chromium de Playwright (no se usan secretos ni despliegue).
