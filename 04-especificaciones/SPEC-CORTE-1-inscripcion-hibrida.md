# SPEC-CORTE-1 — Identidad e inscripción híbrida (aceptación)
Estado: **Producto aprobado (DEC-014…017, 022 restante, 023, 032). Construcción simulada en `09-plataforma/app/` AUTORIZADA (2026-09-09); sin backend, sin deploy, sin datos reales.** Propietario humano: Eduardo Perrot.
Origen: DEC-014 · DEC-015 · DEC-016 · DEC-017 · DEC-022 (resto) · DEC-023 · **DEC-032** · DEC-019 corte 1 · SPECDRIVE SPEC-F3-001 (apertura **48 h**) · SPEC-001.

## 1. Problema y resultado
El HTML demo no separa propuesta de confirmación ni aplica ventana T−48/T−2 con reloj de servidor. Resultado del Corte 1: identidad mínima + precarga de propuesta + confirmación/cambio/rechazo del trabajador bajo ventana configurable, sin sobreventa y con liberación de cupo si no confirma.

## 2. Evidencia
Decisiones 2026-09-09; paquete SPECDRIVE_FASE_3; SPEC-001 D1–D6; DEC-032.

## 3. Alcance
**Incluido:** organizaciones/contratos/roles asignados (sin autoasignación); precarga idempotente; estados PROPUESTO / CONFIRMADO / DECLINADO / EN_ESPERA / (al cierre) fuera de manifiesto; ventana relativa a primera salida; snapshot de manifiesto al bloqueo; auditoría; pruebas con reloj controlado America/Santiago; catálogo con **8 salidas** y **23:00 reservable** (DEC-032).
**Excluido:** despacho/QR/offline (Corte 2); excepciones UI completa y extras/PDF (Corte 3 — se define el *principio* post-cierre); GPS (Corte 4); datos reales; cuentas Supabase/Vercel.

## 4. Requisitos (verificables)
1. Apertura = primera_salida − **48 horas** (configurable por jornada).
2. Bloqueo = primera_salida − **2 horas** (configurable).
3. Config actual (DEC-032): T0 = primera salida **23:00** (reservable); catálogo **8 salidas** = 23:00 + 00:15…06:45; abre 23:00 (T−48h), bloquea 21:00.
4. Propuesta ≠ confirmación (DEC-017).
5. Trabajador puede confirmar, cambiar o rechazar (“no viajaré”) en ventana abierta.
6. Sistema admite cambios frecuentes de turno via nueva precarga/versión de propuesta sin borrar auditoría.
7. No confirmados al bloqueo: fuera del manifiesto confirmado, liberan cupo (DEC-023).
8. Tras bloqueo, mutación ordinaria → BLOQUEADO; vía excepción auditada (DEC-016) — mínimo: rechazo de mutación ordinaria + registro; UI completa de excepción puede diferirse a Corte 3 si se declara.
9. Horarios/salidas leídos de configuración de jornada (DEC-022/032), no constantes mágicas; no fijar 7 ni 8 ni 480 en código como verdad única.
10. Capacidad bajo concurrencia; sin sobreventa (DEC-018).
11. Reloj del servidor; zona America/Santiago; pruebas con reloj controlado.
12. La salida 23:00 aparece en UI de inscripción/reserva con el mismo tratamiento de cupo que el resto del catálogo (visible y reservable).

## 5. Reglas
Ver `06-gobernanza/configurables-vs-invariantes.md`. Precedencia: invariantes DEC-031/018/060 roles > configuración de jornada > UI.

## 6. Autorización
Roles asignados por administrador. Trabajador solo su registro. Contratista/mandante ven agregados según contrato. Permisos en servidor cuando exista backend; en simulación `app/` marcar “simulación” (DEC-010 D6).

## Autorización de construcción (2026-09-09)
- **Autorizado:** implementar Corte 1 **solo como simulación** en `09-plataforma/app/`, con marca “simulación” (DEC-010 D6), alineado a DEC-032 (8 salidas; 23:00 reservable) y a esta SPEC.
- **No autorizado aún:** backend real, cuentas Supabase/Vercel, deploy público, datos personales reales, producción (siguen condicionados a ficha DEC-021 y DEC específica).
- **Baseline:** no modificar `09-plataforma/prototipo-actual/` salvo instrucción explícita.
- Esta autorización **no** aprueba Cortes 2–4 ni módulos nuevos fuera del alcance §3.

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
| AC-C1-15 | Cambio de `salidasPorJornada` / T0 / catálogo en configuración recalcula apertura/bloqueo y proyección; no quedan 480/420/7/8 hardcodeados como reglas fijas. |
| AC-C1-16 | Suite de tiempo con TZ America/Santiago, incluyendo un caso de cambio de hora estacional si aplica al calendario de prueba. |
| AC-C1-17 | XSS en campos de motivo/parada se renderiza como texto. |
| AC-C1-18 | Snapshot de manifiesto al bloqueo tiene versión/hash y conteos reproducibles. |
| AC-C1-19 | Dado config operacional actual, el catálogo expone **8** salidas incluyendo **23:00** como primera salida reservable. |
| AC-C1-20 | Dado trabajador en ventana con cupo, cuando reserva/confirma la salida 23:00, entonces el booking queda CONFIRMADO sobre esa salida (no solo ancla de jornada). |

## 9. Pruebas requeridas
- Unitarias de cálculo T−48/T−2 con reloj inyectado.
- Integración de capacidad concurrente.
- Acceso cruzado.
- E2E móvil trabajador (cuando haya UI).
- Sin datos personales reales.

## 10. Migración / reversibilidad
Semilla ficticia. Si es simulación en `app/`, clave de storage versionada (`trazabilidad_v4`). Rollback: desactivar feature flag de ventana híbrida.

## 11. Riesgos
Implementar sin ficha DEC-021 si se elige backend; o simular solo en cliente sin declarar límites. Confundir T0=23:00 con primera fila H-022 00:15 — 23:00 es salida real (DEC-032); 00:15…06:45 siguen en la misma jornada.
- Confundir “8 salidas DEC-032” con la grilla horaria en punto de DEC-004; el catálogo vigente usa minutos H-022 + 23:00.
- SPEC-003b / T-18 / scripts previos asumían 7 salidas / proyección 420: se alinean en esta construcción a fórmula derivada.

## 12. Aprobaciones
Producto: DEC-014…017, 022 (resto), 023, **032**. Construcción simulada `app/`: **autorizada**. Infra/deploy: DEC-021 ficha pendiente. Backend real: no autorizado.

## Límite explícito de esta simulación
La implementación en navegador **no** representa seguridad ni concurrencia de producción. `requirePermission` y el reloj inyectado son preparación para backend, no controles de servidor.
