# SPEC-F3-001 — Inscripción híbrida flexible

Estado: PROPUESTA de paquete **alineada a DEC-014…017, 022, 023**. Criterios canónicos de Corte 1 en `04-especificaciones/SPEC-CORTE-1-inscripcion-hibrida.md`. Requiere aprobación humana de **construcción** antes de implementar.

## Resultado

Cada trabajador habilitado recibe una propuesta de traslado basada en turno o historial permitido y puede confirmarla, modificarla o rechazarla entre **T−48h y T−2h** (DEC-015). El sistema se bloquea a las 21:00 para la jornada con T0=23:00 (valores configurables).

## Alcance

- precarga idempotente de turno;
- propuesta de horario, ruta, sentido y parada;
- confirmación, cambio, declinación e inscripción manual autorizada;
- contador de cierre;
- capacidad y espera;
- bloqueo por hora del servidor;
- snapshot de manifiesto;
- liberación de cupo de no confirmados (DEC-023).

## Fuera de alcance

- GPS;
- conciliación económica completa;
- algoritmo avanzado de optimización;
- datos personales reales en demo.

## Requisitos

1. La apertura se calcula como inicio de jornada (primera salida) menos **48 horas** (configurable).
2. El cierre se calcula como inicio menos **2 horas** (configurable).
3. Antes de apertura no hay mutaciones ordinarias.
4. Durante la ventana el trabajador opera solo su registro.
5. A partir del cierre no hay autoatención ordinaria.
6. Cambiar de servicio es atómico y no pierde el cupo anterior silenciosamente.
7. La confirmación respeta capacidad bajo concurrencia.
8. Si no hay cupo, el usuario elige mantener alternativa o entrar en espera.
9. El cierre produce manifiesto versionado; no confirmados quedan fuera y liberan cupo.
10. Toda acción queda auditada.
11. Propuesta nunca equivale a confirmación automática (DEC-017).

## Aceptación

Usar AC-C1-01…AC-C1-18 de SPEC-CORTE-1 (sustituyen AC-001…010 de este borrador cuando haya conflicto; en particular apertura es T−48h, no T−24h).

## Evidencia requerida

- pruebas unitarias del cálculo temporal con reloj inyectado;
- pruebas de integración de capacidad;
- E2E móvil de trabajador;
- prueba de acceso cruzado;
- captura del estado antes y después del cierre;
- America/Santiago / DST.
