# SPEC-F3-004 — Control contractual y extras

Estado: PROPUESTA. Reutiliza reglas verificadas de SPEC-002 y SPEC-003b.

## Resultado

El mandante controla cumplimiento y extras sin vincular el pago fijo al uso.

## Requisitos

1. Mantener monto fijo separado de KPI.
2. Aplicar máximo dos vans extra por jornada entre todas las rutas.
3. Mostrar consumo del tope y distribución.
4. Detectar demanda total sobre 90 y sobrecupo por ruta.
5. Extra requiere estado, tarifa versionada y evidencia.
6. Servicio observado bloquea conciliación.
7. PDF de conciliación con correlativo CT-AAAA-NN.
8. Ningún KPI modifica automáticamente el total.
9. Valores demo se etiquetan como ficticios.

## Aceptación

- AC-040: dos extras de una van agotan el tope.
- AC-041: tercera van se rechaza aunque sea otra ruta.
- AC-042: extra rechazado libera el tope según política registrada.
- AC-043: 93 personas no producen 93 confirmaciones.
- AC-044: dos vans en Norte muestran excedente posible en Sur.
- AC-045: monto fijo permanece idéntico ante cambios de ocupación.
- AC-046: extra sin evidencia no suma al total conciliable.
- AC-047: PDF reproduce la versión cerrada.
