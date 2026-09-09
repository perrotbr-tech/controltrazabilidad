# SPEC — Corrección post-merge Corte 1 (DEC-033 + Bugbot PR #4)

Estado: **Autorizada para corrección simulada en `09-plataforma/app/`** (2026-09-09). Sin commit/push/PR hasta autorización del dueño.
Propietario humano: Eduardo Perrot.
Origen: DEC-033 · hallazgos Bugbot PR #4 · SPEC-CORTE-1 · DEC-018 · DEC-032.

## 1. Problema
Tras el merge del Corte 1 (PR #4), Bugbot reportó tres defectos en simulación:
1. **HIGH** — `rechazarInscripcion` no recalcula capacidad ni promueve la lista de espera.
2. **MEDIUM** — `uiCambiar` fija `rutaIdx===0` (solo Ruta Norte).
3. **LOW** — `uiCambiarOk` asigna silenciosamente la primera parada de la ruta destino.

## 2. Alcance
**Incluido:** rechazo con liberación + promoción FIFO (DEC-033); selector de cambio con todas las rutas configuradas; conservación/exigencia de parada válida; auditoría y notificación simulada; pruebas en `scripts/check-corte1.cjs`.
**Excluido:** backend, GPS, QR, PDF, extras nuevos, despliegue, `prototipo-actual/`, datos reales.

## 3. Reglas (DEC-033)
Cuando un trabajador **confirmado** rechaza antes del cierre:
1. libera inmediatamente su cupo;
2. la lista de espera **no** consume capacidad confirmada;
3. se promueve automáticamente al `EN_ESPERA` más antiguo de la **misma** salida, ruta y sentido (mismo `servicioId`);
4. la persona promovida queda `CONFIRMADO`;
5. se registra auditoría de liberación y de promoción;
6. se genera notificación simulada;
7. nunca se promueve entre rutas, sentidos o salidas distintas;
8. nunca se supera la capacidad disponible.

Cambio de inscripción:
- Destinos: todas las rutas configuradas/habilitadas de la misma jornada (sin hardcode de índice).
- Parada: si existe y es válida en la ruta destino, se conserva; si no, exige selección explícita; nunca asignar la primera parada en silencio; no guardar ruta/parada incompatibles.

## 4. Criterios de aceptación
| ID | Criterio |
|---|---|
| AC-033-01 | Rechazo de CONFIRMADO libera exactamente el cupo del declinante (deja de ocupar). |
| AC-033-02 | EN_ESPERA no incrementa `demanda.confirmadas` ni reduce `libres` por sí misma. |
| AC-033-03 | Con espera en el mismo servicio, rechazo promueve FIFO (`creada` más antigua) a CONFIRMADO. |
| AC-033-04 | No se promueve a reservas de otra salida/ruta/sentido (`servicioId` distinto). |
| AC-033-05 | Sin capacidad libre tras el rechazo no hay promoción (p. ej. declina quien ya estaba en espera). |
| AC-033-06 | Auditoría contiene liberación y, si aplica, promoción. |
| AC-033-07 | Notificación simulada registrada al promover / liberar. |
| AC-033-08 | Opciones de cambio incluyen Norte y Sur (ninguna ruta fijada por índice 0). |
| AC-033-09 | Parada compatible se conserva al cambiar. |
| AC-033-10 | Parada incompatible sin selección explícita → error; no se asigna la primera parada. |
| AC-033-11 | T−48/T−2, 8 salidas y 23:00 siguen vigentes; suites previas y E2E en verde. |

## 5. Pruebas
Fallar primero en `scripts/check-corte1.cjs` (casos C1-033-*); luego suites `npm test`, `npm run test:e2e:all`.
