# SPEC-CORTE-1 — Identidad e inscripción híbrida (aceptación)
Estado: **Aprobada en producto (DEC-014…017, 022, 023); pendiente autorización de construcción.** Propietario humano: Eduardo Perrot.
Origen: DEC-014 · DEC-015 · DEC-016 · DEC-017 · DEC-022 · DEC-023 · DEC-019 corte 1 · SPECDRIVE SPEC-F3-001 (ajustada: apertura **48 h**, no 24 h) · SPEC-001.

## 1. Problema y resultado
El HTML demo no separa propuesta de confirmación ni aplica ventana T−48/T−2 con reloj de servidor. Resultado del Corte 1: identidad mínima + precarga de propuesta + confirmación/cambio/rechazo del trabajador bajo ventana configurable, sin sobreventa y con liberación de cupo si no confirma.

## 2. Evidencia
Decisiones 2026-09-09; paquete SPECDRIVE_FASE_3; SPEC-001 D1–D6.

## 3. Alcance
**Incluido:** organizaciones/contratos/roles asignados (sin autoasignación); precarga idempotente; estados PROPUESTO / CONFIRMADO / DECLINADO / EN_ESPERA / (al cierre) fuera de manifiesto; ventana relativa a primera salida; snapshot de manifiesto al bloqueo; auditoría; pruebas con reloj controlado America/Santiago.
**Excluido:** despacho/QR/offline (Corte 2); excepciones UI completa y extras/PDF (Corte 3 — se define el *principio* post-cierre); GPS (Corte 4); datos reales; cuentas Supabase/Vercel.

## 4. Requisitos (verificables)
1. Apertura = primera_salida − **48 horas** (configurable por jornada).
2. Bloqueo = primera_salida − **2 horas** (configurable).
3. Config actual: T0 23:00 → abre 23:00 (T−48h), bloquea 21:00.
4. Propuesta ≠ confirmación (DEC-017).
5. Trabajador puede confirmar, cambiar o rechazar (“no viajaré”) en ventana abierta.
6. Sistema admite cambios frecuentes de turno via nueva precarga/versión de propuesta sin borrar auditoría.
7. No confirmados al bloqueo: fuera del manifiesto confirmado, liberan cupo (DEC-023).
8. Tras bloqueo, mutación ordinaria → BLOQUEADO; vía excepción auditada (DEC-016) — mínimo: rechazo de mutación ordinaria + registro; UI completa de excepción puede diferirse a Corte 3 si se declara.
9. Horarios/salidas leídos de configuración de jornada (DEC-022), no constantes mágicas.
10. Capacidad bajo concurrencia; sin sobreventa (DEC-018).
11. Reloj del servidor; zona America/Santiago; pruebas con reloj controlado.

## 5. Reglas
Ver `06-gobernanza/configurables-vs-invariantes.md`. Precedencia: invariantes DEC-031/018/060 roles > configuración de jornada > UI.

## 6. Autorización
Roles asignados por administrador. Trabajador solo su registro. Contratista/mandante ven agregados según contrato. Permisos en servidor cuando exista backend; en simulación `app/` marcar “simulación” (DEC-010 D6).

## 8. Criterios de aceptación del Corte 1

| ID | Criterio |
|---|---|
| AC-C1-01 | Dado T0=23:00 jornada J, cuando el reloj servidor es exactamente T0−48h, entonces la inscripción abre. |
| AC-C1-02 | Dado el mismo T0, cuando el reloj es 20:59:59 America/Santiago del día de T0, entonces confirmar está permitido. |
| AC-C1-03 | Cuando el reloj es 21:00:00, entonces mutaciones ordinarias se bloquean (BLOQUEADO_POR_CIERRE). |
| AC-C1-04 | Dado reloj de cliente alterado, cuando el servidor está fuera de ventana, entonces prevalece el servidor. |
| AC-C1-05 | Dado modo PROPUESTA_REQUIERE_CONFIRMACION, cuando existe propuesta sin acción, entonces el estado no es CONFIRMADO. |
| AC-C1-06 | Dado trabajador en ventana, cuando confirma con cupo, entonces pasa a CONFIRMADO y consume capacidad. |
| AC-C1-07 | Cuando cambia de servicio, entonces el nuevo cupo se asegura antes de liberar el anterior o se revierte (sin pérdida silenciosa). |
| AC-C1-08 | Cuando rechaza (“no viajaré”), entonces DECLINADO y no ocupa cupo. |
| AC-C1-09 | Dado precarga con turno distinto al día anterior, cuando se importa, entonces hay nueva versión de propuesta y queda historial. |
| AC-C1-10 | Al bloqueo, no confirmados quedan fuera del manifiesto confirmado y liberan cupo (DEC-023). |
| AC-C1-11 | Tras bloqueo, intento de confirmar/cancelar ordinario falla y se audita; solo excepción (mínimo API/registro). |
| AC-C1-12 | Dos clientes compiten por el último cupo: solo uno CONFIRMADO. |
| AC-C1-13 | Trabajador A no lee/modifica booking de B por ID. |
| AC-C1-14 | Usuario no puede autoasignarse rol MANDANTE/ADMIN. |
| AC-C1-15 | Cambio de `salidasPorJornada` / T0 en configuración recalcula apertura/bloqueo y proyección; no quedan 480/420 hardcodeados como reglas. |
| AC-C1-16 | Suite de tiempo con TZ America/Santiago, incluyendo un caso de cambio de hora estacional si aplica al calendario de prueba. |
| AC-C1-17 | XSS en campos de motivo/parada se renderiza como texto. |
| AC-C1-18 | Snapshot de manifiesto al bloqueo tiene versión/hash y conteos reproducibles. |

## 9. Pruebas requeridas
- Unitarias de cálculo T−48/T−2 con reloj inyectado.
- Integración de capacidad concurrente.
- Acceso cruzado.
- E2E móvil trabajador (cuando haya UI).
- Sin datos personales reales.

## 10. Migración / reversibilidad
Semilla ficticia. Si es simulación en `app/`, clave de storage versionada. Rollback: desactivar feature flag de ventana híbrida.

## 11. Riesgos
Implementar sin ficha DEC-021 si se elige backend; o simular solo en cliente sin declarar límites. Confundir T0=23:00 con primera fila H-022 00:15 — documentar que 00:15 pertenece a la jornada iniciada a las 23:00.

## 12. Aprobaciones
Producto: DEC-014…017, 022, 023. Construcción: **pendiente**. Infra: DEC-021 ficha pendiente. Esta SPEC no autoriza por sí sola escribir código.
