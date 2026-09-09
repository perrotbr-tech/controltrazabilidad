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

**RESULTADO GLOBAL LOCAL: PASS**

## Run en GitHub Actions (PR #3)
Run: https://github.com/perrotbr-tech/controltrazabilidad/actions/runs/34312457250  
Evento: `pull_request` · SHA `f647a3b` · conclusión **success**

| Job | Duración | Resultado |
|---|---|---|
| Baseline, config y permisos | ~8 s | **pass** (baseline + 16/16 + 21/21) |
| Contraprueba E2E Playwright | ~33 s | **pass** (Chromium + e2e-contraprueba) |

**RESULTADO GLOBAL REMOTO: PASS**

## Playwright en CI
Incluido: estable y reproducible (versión parcheada 1.55.1 por GHSA-7mvr-c777-76hp). Job `e2e` depende de `checks` (`needs`) para no gastar minutos de Chromium si fallan las pruebas Node. Capturas en `${{ runner.temp }}`, no se commitan. `actionlint` PASS tras mover `runner.temp` al `env` del step.

## Limitaciones
- No acredita autenticación real, multiempresa en servidor ni seguridad de producción.
- E2E usa `file://` y `waitForTimeout`; puede requerir ajuste en runners futuros.
- `check-baseline.cjs` solo cubre el baseline; config/permisos/E2E cubren `app/`.
- Un run fantasma `push` falló en 0 s al primer commit (workflow solo dispara en PR); no afecta al PR.

## Costo esperado de GitHub Actions
Medido en el run exitoso + estimación:

| Job | Medido | Notas |
|---|---|---|
| `checks` | ~8 s (~0,2 min facturable redondeado) | checkout + Node 22 + 3 scripts sin npm |
| `e2e` | ~33 s (~1 min facturable) | `npm ci` + Chromium + E2E |
| **Total / PR** | **~1–2 min** en caliente; **~3–5 min** en frío | |

Costo marginal (tarifa pública Linux ~USD 0,008/min, fuera de franquicia): **~USD 0,01–0,04 por PR**. En repo público / minutos gratuitos: **USD 0**. Sin upload de artefactos ni matrices.
