# SPEC-003b — Horario y demanda reales en la demo
Estado: **Verificada** (DOM simulado 16/16, E2E Chromium 12/12). Propietario humano: Eduardo Perrot. Origen: H-022, H-023, DEC-009, DEC-012, DEC-013.
Salvedad de proceso: implementada por el Supervisor sin revisión independiente de `revisor-qa` por restricción de tokens declarada por el dueño; queda T-15 para esa revisión.

## Problema
La demo usaba 8 salidas en punto y una demanda inventada. La planilla real (H-023) muestra 7 salidas con minutos fijos y una punta de 40–93 personas a las 00:15.

## Reglas aplicadas en `09-plataforma/app/index.html`
- R1 Salidas por jornada y ruta: 00:15, 01:35, 02:35, 03:35, 04:35, 05:35, 06:45 (`contrato.salidas`, `salidasPorJornada: 7`).
- R2 Demanda sembrada = media real por salida (55, 24, 22, 23, 25, 13, 35 personas) × factor del día de la jornada (do 0,7 · lu 0,8 · ma 0,9 · mi 1,0 · ju 1,2 · vi 1,4 · sá 1,4) × reparto Norte 60 % / Sur 40 %. Dotación 394.
- R3 Proyección mensual = 30 × 7 × 2 = 420 servicios (sustituye REQ-013 de SPEC-003).
- R4 Extra #1 sembrado ilustra DEC-009: sábado 12 → 00:15 Norte con 56 solicitudes (real: 93 personas), 2 vans prestadas de madrugada y **validadas ex post** al día siguiente por el mandante.
- R5 4 vans en proyección, 15 personas por van (DEC-012); capacidad base 30 por ruta y salida.
- R6 Una salida con extra Rechazado admite una nueva solicitud (nueva necesidad = nueva solicitud).
- R7 **Tope de 2 vans extra por jornada nocturna** (DEC-013), contando solicitudes no rechazadas.

## Aceptación
AC-04 siete salidas con el horario real · AC-05/AC-11 extra #1 de 2 vans ex post con capacidad 30 → 60 · AC-15 proyección 420 · AC-16 tope por jornada (con 1 van ya autorizada, 2 más se rechazan y 1 más se acepta). Los demás AC de SPEC-003 se mantienen.

## Límite
La demanda es media semanal reescalada, no la planilla persona a persona; eso llega con SPEC-004 (planilla anonimizada → reservas prellenadas).
