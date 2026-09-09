# SPEC-F3-003 — Despacho, manifiesto y abordaje

Estado: PROPUESTA. Depende de identidad real en servidor.

## Resultado

El contratista recibe un tablero por jornada, asigna recursos habilitados y registra abordajes confiables aun con conectividad intermitente.

## Requisitos

1. Ver servicios agrupados por jornada, salida, ruta y sentido.
2. Asignar solo vehículo y conductor con vigencias válidas.
3. Descargar manifiesto mínimo firmado antes de salir.
4. Validar QR y permitir búsqueda por identificador como respaldo.
5. Bloquear pasajero no habilitado o registrar excepción pendiente.
6. Detectar escaneo duplicado.
7. Registrar inicio, paradas, término e incidente.
8. Sincronizar eventos offline con IDs idempotentes.
9. Cerrar abordaje y marcar no-show.
10. Exponer al mandante agregados y excepciones, no datos innecesarios.

## Aceptación

- AC-030: documento vencido impide asignación.
- AC-031: QR de otro servicio no aborda silenciosamente.
- AC-032: escaneo offline aparece una vez al sincronizar.
- AC-033: duplicado genera alerta.
- AC-034: no-show no elimina reserva.
- AC-035: contratista de otro contrato obtiene denegación.
- AC-036: trabajador ve solo su estado y van.
