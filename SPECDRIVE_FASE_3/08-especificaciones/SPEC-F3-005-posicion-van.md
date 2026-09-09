# SPEC-F3-005 — Posición de la van

Estado: PROPUESTA. Ejecutar después de autenticación, servicios y permisos en servidor.

## Resultado

Compartir la posición operacional de la van, no de la persona, con visibilidad limitada al servicio.

## Requisitos

1. El **operador contratista** (dispositivo o sesión del contratista) inicia y termina transmisión de la posición de la **van**. No existe rol de usuario “conductor” (DEC-024).
2. Trabajador confirmado ve solo su van y durante una ventana acotada.
3. Contratista y mandante ven vehículos de sus contratos.
4. Después del viaje se conservan hitos necesarios, no un rastro indefinido.
5. Informar precisión, última actualización y pérdida de señal.
6. Mapa MVP puede usar Leaflet y cartografía compatible, revisando términos del proveedor de teselas.
7. GPS no sustituye marcaje de abordaje.
8. Retención y finalidad requieren aprobación antes de datos reales.

## Aceptación

- AC-050: trabajador sin reserva no ve posición.
- AC-051: posición deja de estar visible después de la ventana.
- AC-052: ubicación antigua aparece como desactualizada.
- AC-053: otro contrato no puede consultar.
- AC-054: detener ruta detiene recolección.
- AC-055: eventos retenidos cumplen configuración aprobada.
