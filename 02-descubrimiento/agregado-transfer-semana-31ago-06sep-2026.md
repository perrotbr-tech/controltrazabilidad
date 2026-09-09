# Agregado anonimizado — Programación Transfer 31-08 a 06-09-2026 (H-023)
Fuente: `Programacion_Transfer_30_de_Agosto_al_06_septiembre__2026.xlsx` entregado por el dueño (planilla del mandante con nómina, turnos y salidas por persona). **El archivo original contiene nombre, RUT, dirección y teléfono: se mantiene fuera del repositorio.** Aquí solo hay conteos. Tipo de evidencia: observada (documento operativo real). Procesado el 2026-09-08 por el Supervisor con openpyxl.

## Volumen semanal
| Indicador | Valor |
|---|---|
| Registros persona-día con salida en transfer | 1.389 |
| Personas distintas que usaron el transfer de salida | 394 |
| Por sociedad | Dalmacia Gamming S.A. 755 · Inversiones Vista Norte S.A. 629 · sin dato 5 |
| Registros de entrada (recogida hacia el hotel) | 55 en la semana, 21 personas, inicio de turno 05:00–06:00 mayoritario |
| Direcciones distintas (calle sin número) | 312 |

## Salidas de transfer: personas por día
| Transfer | Lu 31 | Ma 1 | Mi 2 | Ju 3 | Vi 4 | Sá 5 | Do 6 | Máximo | Semana |
|---|---|---|---|---|---|---|---|---|---|
| 00:15 | 43 | 55 | 56 | 56 | 60 | **93** | 40 | 93 | 403 |
| 01:35 | 13 | 19 | 23 | 34 | 47 | 18 | 11 | 47 | 165 |
| 02:35 | 15 | 18 | 19 | 37 | 26 | 24 | 15 | 37 | 154 |
| 03:35 | 16 | 18 | 21 | 30 | 36 | 29 | 8 | 36 | 158 |
| 04:35 | 14 | 14 | 19 | 23 | 39 | 47 | 17 | 47 | 173 |
| 05:35 | 7 | 9 | 13 | 7 | 16 | 39 | 2 | 39 | 93 |
| 06:45 | 26 | 31 | 38 | 42 | 51 | 24 | 31 | 51 | 243 |
| **Total noche** | 134 | 164 | 189 | 229 | 275 | 274 | 124 | | 1.389 |

Regla de asignación observada (hoja "Base H salidas"): fin de turno 00:00 → transfer 00:15; 00:30/01:00/01:30 → 01:35; 02:00/02:30 → 02:35; y así hasta 05:30 → 05:35; 06:30 → 06:45.

## Lectura para el diseño (Supervisor, 2026-09-08)
1. **La capacidad del prototipo queda corta.** Con 4 vans de 15 cupos, el máximo simultáneo por salida es 60 personas. La salida de 00:15 supera 55 personas cinco de siete noches y llega a 93 el sábado: ahí es donde nacen los extras de madrugada sin autorizador (DEC-009). La semilla de `app/` (33 solicitudes en la hora punta) subestima la punta real en tres veces.
2. **Son 7 salidas con minutos fijos, no 8 en punto** (confirma H-022). La distribución real es un pico a 00:15, una meseta 01:35–04:35 y un segundo pico a 06:45.
3. **El sentido de vuelta (recogida hacia el hotel) es marginal**: 55 registros en la semana frente a 1.389 de salida. SPEC-004 puede tratar la recogida como excepción programada, no como espejo del servicio de salida.
4. **Las rutas no se pueden fundamentar por calle**: 312 calles distintas con muy baja repetición. Los sectores con 3 o más personas distintas son: Avenida Argentina (8), Antilhue (6), Esmeralda (4) y catorce calles con 3. Definir puntos exige agrupar por sector o comuna con un mapa, no por calle. Necesita geocodificación aproximada o una columna "sector" en la próxima planilla.
5. **La demanda es planificable con una semana de anticipación**: la planilla ya asigna a cada persona su transfer según fin de turno. La reserva del trabajador (PR-05) puede nacer prellenada desde este archivo y el trabajador solo confirma o cancela.

## Vacíos que abre
- V-17 ¿Cuántas vans salen efectivamente en cada horario y cuántas personas por van? (respalda la cifra "24 viajes" y la necesidad de extras).
- V-18 Cómo se agrupan hoy las direcciones en rutas (¿lo decide el conductor, el contratista o el mandante?).
