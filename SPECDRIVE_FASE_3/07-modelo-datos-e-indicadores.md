# Modelo de datos e indicadores

## Entidades mínimas

### Identidad y organizaciones

- organizations
- users
- worker_profiles
- role_assignments
- contracts
- contract_parties

### Programación

- operational_days
- shifts
- roster_imports
- roster_rows
- trip_proposals
- services
- routes
- stops
- service_stops

### Demanda

- bookings
- booking_changes
- waitlist_entries
- exception_requests
- manifest_snapshots
- manifest_entries

### Operación

- vehicles
- drivers
- vehicle_documents
- driver_documents
- vehicle_assignments
- boarding_events
- route_events
- incidents
- vehicle_position_events

### Contrato

- extra_vehicle_requests
- extra_evidence
- reconciliations
- reconciliation_items
- contract_rate_versions

### Gobierno

- audit_events
- approvals
- configuration_versions

## Campos esenciales

Toda entidad operacional incluye:

- id no predecible;
- organization_id;
- contract_id cuando corresponda;
- created_at y updated_at;
- actor_id;
- version;
- estado;
- zona horaria o fecha operacional derivada.

Bookings incluye:

- worker_id;
- operational_day_id;
- service_id;
- stop_id;
- direction;
- source: roster, worker, supervisor o exception;
- proposed_at;
- confirmed_at;
- locked_at;
- status;
- current_version.

## Restricciones de base

- Una reserva activa compatible por trabajador, jornada y tramo.
- Capacidad protegida con transacción o bloqueo; no con conteo solo en pantalla.
- Un extra no puede exceder el máximo contractual acumulado de su jornada.
- Una asignación de rol requiere organización, vigencia y actor asignador.
- Un evento de auditoría no se actualiza ni elimina mediante la aplicación.
- Tarifas y monto fijo usan versiones efectivas por fecha.

## Fechas

Guardar instantes en UTC y calcular la fecha operacional usando America/Santiago. No derivar la jornada mediante substring UTC. Probar cambios de horario de verano.

## KPI operacionales

- trabajadores esperados;
- propuestas emitidas;
- confirmados;
- declinados;
- sin respuesta al cierre;
- lista de espera;
- abordados;
- no-show;
- ocupación por salida, ruta y jornada;
- puntualidad de salida y llegada;
- excepciones posteriores al cierre;
- extras solicitados, autorizados, usados y observados.

## KPI contractuales

- servicios programados versus ejecutados;
- servicios con evidencia completa;
- monto fijo contractual, mostrado separado;
- extras respaldados;
- extras observados;
- conciliación abierta o cerrada;
- costo fijo por servicio y pasajero como indicador informativo;
- utilización de capacidad sin inferir ahorro recuperable.

## Alertas

- demanda mayor que capacidad base;
- demanda mayor que capacidad máxima;
- desequilibrio de capacidad entre Norte y Sur;
- menos de 95 % de respuestas a 30 minutos del cierre;
- vehículo o conductor sin vigencia;
- salida no iniciada dentro de tolerancia;
- duplicidad de abordaje;
- ubicación de van sin actualización;
- evidencia faltante;
- intento de acceso cruzado.

## Retención y minimización

Antes de datos reales, la fase debe proponer y obtener aprobación de:

- finalidad por tipo de dato;
- plazo de conservación;
- quién puede consultar;
- exportación y eliminación;
- tratamiento de respaldos;
- procedimiento de incidente;
- contrato con encargados de datos.

La investigación o geocodificación trabaja con sectores y calles sin número, nunca con la planilla personal original.
