# SPEC-003b — Horario y demanda reales en la demo
Estado: **Verificada con salvedades (T-15: PASS CON LIMITACIONES, 2026-09-09).** Propietario humano: Eduardo Perrot.
Origen: H-022, H-023, DEC-009, DEC-012, DEC-013, DEC-022, DEC-029.
Salvedad de proceso: implementada inicialmente sin QA independiente; T-15 cerró la revisión con limitaciones documentales abiertas (ver § Evidencia pendiente).

## Problema
La demo usaba 8 salidas en punto y una demanda inventada. La planilla real (H-023) muestra 7 salidas con minutos fijos y una punta de 40–93 personas a las 00:15.

## Relación con SPEC-003 (DEC-022)
SPEC-003 queda **superada por esta SPEC** en horarios y cantidad de salidas. Los parámetros de capacidad/extras de SPEC-003 (15/van, 2 extras) se conservan como configuración operacional actual, no como constantes eternas del código.

## Reglas aplicadas en `09-plataforma/app/index.html` (demo)
- R1 Salidas por jornada y ruta (config actual): 00:15, 01:35, 02:35, 03:35, 04:35, 05:35, 06:45 (`contrato.salidas`, `salidasPorJornada: 7`). Primera salida operacional de la jornada: **23:00** como T0 de ventana (DEC-015/022); el catálogo H-022 cubre el servicio de madrugada de esa jornada.
- R2 Demanda sembrada = media real por salida (55, 24, 22, 23, 25, 13, 35 personas) × factor del día de la jornada (do 0,7 · lu 0,8 · ma 0,9 · mi 1,0 · ju 1,2 · vi 1,4 · sá 1,4) × reparto Norte 60 % / Sur 40 %. Dotación 394.
- R3 Proyección mensual **referencial** = `días × salidasPorJornada × rutas` (con config actual 30×7×2 = 420). **No es regla fija del sistema** (DEC-022): si cambia la configuración, cambia el cálculo.
- R4 Extra #1 sembrado ilustra DEC-009/028: sábado 12 → 00:15 Norte con 56 solicitudes (real: 93 personas), 2 vans prestadas de madrugada y **validadas ex post** al día siguiente por el mandante.
- R5 4 vans en proyección, 15 personas por van (DEC-012); capacidad base 30 por ruta y salida; techo referencial piloto 90 con 2 extras (DEC-029: operacional, no contractual permanente).
- R6 Una salida con extra Rechazado admite una nueva solicitud (nueva necesidad = nueva solicitud).
- R7 **Tope de 2 vans extra por jornada nocturna completa** (DEC-013/025), contando solicitudes no rechazadas, acumulado entre horarios/sentidos/sectores.

## Aceptación (demo actual)
AC-04 siete salidas con el horario real · AC-05/AC-11 extra #1 de 2 vans ex post con capacidad 30 → 60 · AC-15 proyección referencial 420 bajo config actual · AC-16 tope por jornada. Los AC de SPEC-003 de capacidad/extras no horarios se mantienen; AC-04/REQ-013 de SPEC-003 quedan derogadas.

## Evidencia T-15 (2026-09-09)
| Prueba | Resultado |
|---|---|
| Revisión independiente `revisor-qa` | **PASS CON LIMITACIONES** |
| `node scripts/check-config.cjs` | **16/16** PASS |
| `node scripts/check-permisos.cjs` (app) | **21/21** PASS |
| `node scripts/check-baseline.cjs` | PASS (baseline intacto) |

### Pendiente explícito (no cierra salvedades)
1. Evidencia documental del 16/16 en `08-validacion/resultado-baseline.md` (esta sesión la incorpora).
2. Prueba E2E **específica** para: 7 salidas, proyección referencial bajo config actual, horario H-022 (el E2E 12/12 existente cubre SPEC-003, no estos asertos).
3. Validación de huso America/Santiago (T-10) con reloj controlado / cruce de medianoche.

## Límite
La demanda es media semanal reescalada, no la planilla persona a persona; eso llega con SPEC-004 (sectores anonimizados → reservas/propuestas). Código de `app/` no se modifica en la sesión documental 2026-09-09.
