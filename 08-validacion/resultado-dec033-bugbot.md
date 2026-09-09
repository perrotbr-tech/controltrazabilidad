# Resultado — corrección DEC-033 / Bugbot PR #4 (sin commit)

Fecha: 2026-09-09  
Base: `origin/claude/proyecto-agente-ia-lazwio` @ `59990ce`  
Rama local (sin push): `cursor/corte1-bugbot-dec033-f681`

## Causas confirmadas
1. **HIGH** — `rechazarInscripcion` marcaba `DECLINADO` sin `recalcular`; no promovía `EN_ESPERA`.
2. **MEDIUM** — `uiCambiar` filtraba `rutaIdx===0` (solo Norte).
3. **LOW** — `uiCambiarOk` asignaba `paradas[0]` del destino sin validar compatibilidad.

## Pruebas que fallaron primero
Tras añadir C1-033-* (antes del fix): fallaban FIFO, auditoría/notificación, rutas multi-índice y parada requerida. Tras el fix: **31/31**.

## Corrección
- `rechazarInscripcion` → `recalcular` FIFO mismo `servicioId`; auditoría liberación+promoción; `notificaciones` simuladas; promovidos → `CONFIRMADO`.
- `opcionesCambioInscripcion` + `uiCambiar` sin índice fijo.
- `cambiarInscripcion` / `uiCambiarOk`: conservar parada válida; si no, `PARADA_REQUERIDA` + modal explícito.

## Suites
| Comando | Resultado |
|---------|-----------|
| `npm test` | PASS (baseline, config 16, permisos 21, corte1 31) |
| `npm run test:e2e:all` | PASS |
| `validate-ci-local INCLUDE_E2E=1` | PASS |
| `git diff --check` | limpio |

## QA independiente
`revisor-qa`: **PASS CON LIMITACIONES** (simulación; FIFO global de `recalcular` previo; `confirmarInscripcion` aún no recalcula cola).

## Limitaciones
Simulación en navegador ≠ producción. Sin backend/GPS/QR/PDF/extras/deploy. Sin commit/push/PR hasta autorización.
