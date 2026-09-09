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

## Incidente CI remoto (PR #4)
- Runs `34383501366` y `34383971030`: job `checks` **PASS**; job `e2e` falló en instalación de Chromium por `Hash Sum mismatch` del mirror apt `dl.google.com/linux/chrome-stable` con `playwright install --with-deps`.
- Mitigación: eliminar cualquier source apt que apunte a Google Chrome/`*chrome*` y usar `npx playwright install chromium` **sin** `--with-deps` (libs del runner bastan; sin secretos ni despliegue).
