# Configurables vs invariantes contractuales
Fecha: 2026-09-09. Origen: DEC-014…032. Propietario: Eduardo Perrot.

## Invariantes (no configurables por jornada ni por UI)

| ID | Regla |
|---|---|
| INV-01 | Pago fijo contractual separado del uso/extras; ningún KPI genera descuento o pago automático (DEC-031). |
| INV-02 | Nunca sobreventa automática de cupos confirmados (DEC-018). |
| INV-03 | Usuario no se autoasigna roles ni privilegios. |
| INV-04 | Acceso por organización, contrato, rol, recurso y titularidad; ocultar pestañas no protege datos. |
| INV-05 | Propuesta ≠ confirmación en modo `PROPUESTA_REQUIERE_CONFIRMACION` (DEC-017). |
| INV-06 | Reserva/propuesta confirmada ≠ abordaje real; evidencia ≠ autorización económica. |
| INV-07 | Tras el bloqueo, no se altera silenciosamente el manifiesto cerrado; cambios = excepción + anexo (DEC-016). |
| INV-08 | No confirmados al bloqueo liberan cupo y quedan fuera del manifiesto confirmado (DEC-023). |
| INV-09 | GPS rastrea la van, nunca a la persona (DEC-030/020). |
| INV-10 | No almacenar secretos ni PII real en Git; QR sin RUT/domicilio/teléfono (DEC-027). |
| INV-11 | Zona de cálculo operacional: America/Santiago; reloj de verdad = servidor. |
| INV-12 | Conductor no es usuario de la plataforma en el piloto (DEC-006/024). |
| INV-13 | Plataforma no decide automáticamente el monto a pagar (DEC-031). |
| INV-14 | Piloto = Hotel Enjoy Antofagasta; no imponer normativa minera por analogía (DEC-003/020). |

## Configurables por jornada / contrato (nunca hardcodear como única verdad)

| ID | Parámetro | Valor operacional actual (piloto) |
|---|---|---|
| CFG-01 | Primera salida (T0) y salida reservable | **23:00** (DEC-032: visible en catálogo y reservable; ancla de jornada) |
| CFG-02 | Apertura de inscripción | T0 − 48 h |
| CFG-03 | Bloqueo de autoservicio | T0 − 2 h (21:00 si T0=23:00) |
| CFG-04 | Catálogo de salidas (hora:minuto) | **23:00**, 00:15, 01:35, 02:35, 03:35, 04:35, 05:35, 06:45 **(8)** — DEC-032 |
| CFG-05 | Última salida / fin operacional | 06:45 (+ margen si se define) de la jornada anclada en T0=23:00 |
| CFG-06 | Vans base | 4 |
| CFG-07 | Capacidad referencial por van | 15 |
| CFG-08 | Tope vans extra por jornada | 2 (acumulado global) |
| CFG-09 | Capacidad máxima referencial piloto | 90 (4×15+2×15); no cláusula permanente (DEC-029) |
| CFG-10 | Demanda observada de referencia | 93 (H-023); operacional |
| CFG-11 | Rutas / sectores / paradas | 2 rutas; sectores anonimizados |
| CFG-12 | Modo de inscripción por grupo | default PROPUESTA_REQUIERE_CONFIRMACION; otros modos solo por config explícita |
| CFG-13 | Plazo extra ex post | 12:00 día siguiente America/Santiago |
| CFG-14 | Proyección de servicios | `días × salidasPorJornada × rutas` (derivada; no 480/420 fijos) |
| CFG-15 | Tarifas y monto fijo | Ficticios hasta V-05 |

## Derivados (se calculan, no se editan a mano como regla)

- Apertura/bloqueo absolutos a partir de T0 + CFG-02/03.
- Capacidad base por salida = vans asignadas × capacidadVan.
- Consumo de tope de extras = suma de vans en estados que consumen tope (DEC-025 / RN-033 F3).
- Proyección mensual/período = fórmula CFG-14. Con config actual: `30 × 8 × 2 = 480` es **referencial**, no AC fijo.

## Nota sobre DEC-004 / DEC-022 / DEC-032
DEC-004 (8 salidas “cada hora” 23:00–06:00) sigue siendo **evidencia histórica declarada**, no el catálogo minuto a minuto. La config operacional vigente es **DEC-022 (resto) + DEC-032**: **8 salidas** con minutos reales (23:00 + H-022). No tratar “8” ni “480” como invariantes del sistema: si cambia CFG-04/`salidasPorJornada`, cambian conteo y proyección.
