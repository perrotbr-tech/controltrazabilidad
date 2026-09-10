# Insumos presentación Perrot Tech — MVP Enjoy (compuerta visual)

## Problema actual
Coordinación manual de traslados nocturnos hotel–domicilio: cupos, prioridad de turno, extras y excepciones sin trazabilidad clara; lenguaje técnico confunde al trabajador.

## Solución propuesta
Plataforma de demostración de control y trazabilidad: inscripción con confirmación, prioridad por turno, lista de espera, gestión masiva, ruta prevista, vans extra y excepciones con auditoría — **simulación**, no sistema productivo.

## Beneficios
Visibilidad de demanda, menos errores de cupo, lenguaje simple, separación operación/pago, evidencia auditable para conciliación.

## Funcionamiento general
Jornada nocturna (T0 23:00 → madrugada). Apertura T−48. Cierre general 21:00. Liberación demo de cupos sobrantes 20:00 (configurable).

## Perfiles de acceso (asignados, no elegidos)
Trabajador Enjoy · Contratista/operación (conductor = misma vista operativa, DEC-006/024) · Gestor/administrador.

## Flujo de reserva
Sin reserva → Solicitar cupo (pendiente) → Confirmar asistencia → Confirmada / lista de espera / anticipada en espera.

## Prioridad por turno
Salida recomendada ≈ 1 h antes del ingreso. Viajar antes queda en espera hasta liberación sin quitar cupo prioritario.

## Capacidad y espera
Nunca supera capacidad. FIFO al liberar/declinar. Van extra solo con solicitud + autorización.

## Gestión masiva
CSV demo: vista previa, duplicados, incompletos, alta, deshabilitar/reactivar, historial de carga.

## Ruta prevista
Paradas con pasajeros confirmados, ocupación, sin RUT/valores comerciales en vista operativa.

## Notificaciones
In-app simuladas: confirmación, recordatorio 12 h, proximidad 5–10 min. Canal real pendiente.

## Vans extra / excepciones
Estados y justificación obligatoria. Excepción post-21:00 pendiente de evaluación. Op. ≠ comercial.

## Auditoría
Tabla filtrable; registros no editables desde UI.

## Avances (esta compuerta)
Portal 3 accesos; lenguaje simple; prioridad/liberación; gestión masiva; ruta prevista; notifs; excepciones; auditoría; ocupación &lt;50%.

## Simulado / limitaciones / pendientes productivos
Todo corre en navegador. Sin backend, PII real, GPS, WhatsApp/SMS, QR, PDF, pagos, Supabase, producción.

## Decisiones contractuales pendientes
% mínimo ocupación, tarifa unitaria, transporte alternativo, plazos, autoridad, consecuencias sin autorización. Perfil CONDUCTOR real (hoy unificado con contratista).

## Glosario
Solicitar cupo · Pendiente de confirmación · Reserva confirmada · Lista de espera · Solicitud anticipada · Jornada nocturna · Van extra · Excepción fuera de horario.
