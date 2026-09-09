# Verificación CI — SPEC-008 (2026-09-09)

## Entorno local
- Node v22.14.0
- TZ=America/Santiago
- Playwright 1.55.1 (devDependency fijada; 0 vulnerabilidades npm audit)
- Sin secretos; sin despliegue; sin cambios a `09-plataforma/app/`

## Validación del workflow
Comando: `TZ=America/Santiago INCLUDE_E2E=1 node scripts/validate-ci-local.cjs`

| Comprobación | Resultado |
|---|---|
| Disparador `pull_request` | PASS |
| `permissions.contents: read` | PASS |
| Sin `secrets` | PASS |
| Sin despliegue | PASS |
| Node 22 + TZ America/Santiago | PASS |
| `node scripts/check-baseline.cjs` | PASS |
| `node scripts/check-config.cjs` | PASS 16/16 |
| `node scripts/check-permisos.cjs` | PASS 21/21 |
| `node scripts/e2e-contraprueba.js` (2 corridas previas + validación) | PASS 12/12 |

**RESULTADO GLOBAL: PASS**

## Playwright en CI
Incluido: estable y reproducible en este entorno (versión parcheada ≥1.55.1 por GHSA-7mvr-c777-76hp). Job `e2e` depende de `checks` (`needs`) para no gastar minutos de Chromium si fallan las pruebas Node. Capturas en `${{ runner.temp }}`, no se commitan.

## Limitaciones
- No acredita autenticación real, multiempresa en servidor ni seguridad de producción.
- E2E usa `file://` y `waitForTimeout`; puede requerir ajuste en runners futuros.
- `check-baseline.cjs` solo cubre el baseline; config/permisos/E2E cubren `app/`.
- El workflow aún no ha corrido en GitHub Actions hasta mergearse/abrirse el PR; la validación local reproduce los mismos comandos.

## Costo esperado de GitHub Actions
Estimación por pull request (Linux `ubuntu-latest`, multiplicador 1×):

| Job | Minutos estimados | Notas |
|---|---|---|
| `checks` | ~0,5–1 min | checkout + Node 22 + 3 scripts sin npm |
| `e2e` | ~2–4 min | `npm ci` + Chromium + E2E (~3–4 min frío; menos con caché npm) |
| **Total / PR** | **~3–5 min** | |

Costo marginal (tarifa pública Linux ~USD 0,008/min, repos privados fuera de la franquicia gratuita): **~USD 0,02–0,04 por PR**. Dentro de los minutos gratuitos de GitHub Free/Pro/Team el costo efectivo es **USD 0**. Sin artefactos subidos ni matrices: no hay costo extra de almacenamiento relevante.
