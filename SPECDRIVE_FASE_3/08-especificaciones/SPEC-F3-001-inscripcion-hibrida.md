# SPEC-F3-001 — Inscripción híbrida flexible

Estado: PROPUESTA. Requiere aprobación humana antes de implementar.

## Resultado

Cada trabajador habilitado recibe una propuesta de traslado basada en turno o historial permitido y puede confirmarla o modificarla entre T−24 y T−2. El sistema se bloquea a las 21:00 para la jornada que inicia a las 23:00.

## Alcance

- precarga idempotente de turno;
- propuesta de horario, ruta, sentido y parada;
- confirmación, cambio, declinación e inscripción manual autorizada;
- contador de cierre;
- capacidad y espera;
- bloqueo por hora del servidor;
- snapshot de manifiesto.

## Fuera de alcance

- GPS;
- conciliación económica;
- algoritmo avanzado de optimización;
- datos personales reales en demo.

## Requisitos

1. La apertura se calcula como inicio de jornada menos 24 horas.
2. El cierre se calcula como inicio menos 2 horas.
3. Antes de apertura no hay mutaciones.
4. Durante la ventana el trabajador opera solo su registro.
5. A partir del cierre no hay autoatención ordinaria.
6. Cambiar de servicio es atómico y no pierde el cupo anterior silenciosamente.
7. La confirmación respeta capacidad bajo concurrencia.
8. Si no hay cupo, el usuario elige mantener alternativa o entrar en espera.
9. El cierre produce manifiesto versionado.
10. Toda acción queda auditada.

## Aceptación

- AC-001: a T−24h exacto la inscripción abre.
- AC-002: a 20:59:59 se permite confirmar.
- AC-003: a 21:00:00 se bloquea.
- AC-004: cambiar la hora del teléfono no altera la decisión.
- AC-005: dos usuarios compitiendo por un cupo no quedan ambos confirmados.
- AC-006: un cambio fallido conserva la reserva anterior.
- AC-007: el trabajador no accede a otro registro por ID.
- AC-008: el manifiesto cerrado conserva versión y conteos.
- AC-009: se prueba America/Santiago en cambio de horario estacional.
- AC-010: XSS en motivo o parada se renderiza como texto.

## Evidencia requerida

- pruebas unitarias del cálculo temporal;
- pruebas de integración de capacidad;
- E2E móvil de trabajador;
- prueba de acceso cruzado;
- captura del estado antes y después del cierre.
