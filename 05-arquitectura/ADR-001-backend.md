# ADR-001 — Backend e identidad (piloto Enjoy)
Estado: **Arquitectura recomendada aprobada (DEC-021); implementación y cuentas no autorizadas.**
Fecha de actualización: 2026-09-09.

## Decisión
Planificar MVP multiusuario como **PWA + Supabase (Postgres, Auth, RLS) + Vercel (estático/PWA)**.

## Alternativas consideradas
| Opción | Veredicto |
|---|---|
| A. PWA + Supabase + Vercel | **Recomendada** para piloto de bajo costo |
| B. PWA + Firebase | Descartada por ahora (modelo documental menos natural a conciliación multiempresa) |
| C. Node/Postgres administrado (p. ej. VPS Chile) | Reserva si V-04 exige residencia estricta en Chile |

## Qué está autorizado / prohibido (DEC-021)
**Autorizado:** diseñar esquema, políticas RLS, cortes (DEC-019), estimaciones, pruebas locales de diseño.
**Prohibido aún:** crear cuentas, contratar, configurar producción, cargar datos reales, desplegar públicamente.

## Antes de implementar (T-19 — ficha obligatoria)
Presentar al dueño, con fuentes vigentes:
1. Costo mensual estimado (free tier vs pago) y límites.
2. Región de alojamiento de datos y implicancias V-04/V-08.
3. Modelo de seguridad (Auth magic link DEC-010 D3, RLS por org/contrato).
4. Respaldo, retención y exportación.
5. Posibilidad de migración / salida del proveedor.
6. Plan de rollback del Corte 1.

## Cortes alineados a DEC-019 / ADR-F3-001
1. Identidad e inscripción híbrida (SPEC-CORTE-1; T−48h/T−2h).
2. Despacho, manifiesto y abordaje (QR ID interno DEC-027; emisor operador contratista DEC-024).
3. Excepciones, extras y conciliación PDF (SPEC-005; F3-002/004).
4. GPS de vans (SPEC-006; F3-005).

## Diseño mínimo de datos
organizations, users, worker_profiles, role_assignments, contracts, operational_days, shifts, trip_proposals, bookings, services, routes, stops, waitlist_entries, exception_requests, manifest_snapshots, vehicles, vehicle_assignments, boarding_events, extra_vehicle_requests, reconciliations, audit_events, configuration_versions.

## Controles
Transacciones de capacidad; reloj servidor; timestamps UTC + fecha operacional America/Santiago; auditoría append-only; secretos solo en entorno; datos ficticios hasta V-08; pruebas adversariales de acceso cruzado.

## Relación
Complementa y no reemplaza `SPECDRIVE_FASE_3/09-arquitectura/ADR-F3-001-mvp-multiusuario.md`. Ambos deben mantenerse coherentes.
