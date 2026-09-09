# Brief ejecutivo — modelo híbrido flexible

## Problema operacional

El Hotel Enjoy tiene trabajadores cuyos turnos cambian con frecuencia. Una asignación rígida queda desactualizada, pero exigir una reserva completamente manual todos los días también es frágil: aumenta olvidos, consultas y riesgo de demanda desconocida.

## Decisión de producto propuesta

Adoptar un modelo híbrido:

- La nómina y el turno generan una propuesta de traslado, no una reserva definitiva.
- El trabajador puede aceptar esa propuesta o escoger una alternativa compatible.
- El autoservicio ocurre únicamente entre T−24h y T−2h.
- Para una jornada que inicia a las 23:00, la ventana abre a las 23:00 del día anterior y cierra a las 21:00 del día de salida.
- Después del cierre, toda modificación exige flujo de excepción con motivo, usuario autorizador y auditoría.

## Objetivos

1. Conocer demanda confirmada dos horas antes de iniciar la operación.
2. Mantener flexibilidad frente a cambios frecuentes de turno.
3. Evitar que el trabajador navegue por menús administrativos o escoja roles.
4. Asegurar que contratista y mandante operen con la misma versión de la demanda.
5. Identificar sobrecupos, ausencias, extras y contingencias sin alterar automáticamente el contrato.
6. Crear evidencia suficiente para conciliación mensual y auditoría.

## No objetivos de esta fase

- Liquidar remuneraciones.
- Cobrar al trabajador.
- Decidir automáticamente el pago al contratista.
- Rastrear permanentemente la ubicación del trabajador.
- Reemplazar la plataforma del transportista para mantenimiento o telemetría avanzada.
- Declarar cumplimiento legal definitivo sin revisión profesional.

## Indicadores de éxito del piloto

- 95 % o más de trabajadores resueltos antes del cierre.
- 100 % de cambios posteriores al cierre con motivo y autorizador.
- 100 % de abordajes asociados a persona autorizada, servicio y vehículo.
- Cero confirmaciones sobre la capacidad disponible.
- Diferencia visible entre programados, confirmados, abordados y no-show.
- Extras conciliados solo con autorización y evidencia.
- Disponibilidad móvil y comportamiento degradado claro cuando no hay conexión.

## Hipótesis que deben validarse

- La primera salida operacional es efectivamente 23:00.
- Los turnos se publican con al menos 24 horas de anticipación.
- Existe un identificador interno estable para cada trabajador.
- El contratista puede disponer de un teléfono por vehículo o despacho.
- El tope contractual de dos vans extra aplica a toda la jornada y a ambas rutas.
- Los montos de la demo siguen siendo ficticios hasta revisar el contrato.
