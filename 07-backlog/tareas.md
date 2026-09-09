# Tareas de continuación
| ID | Trabajo | Estado / alcance | Cierre |
|---|---|---|---|
| T-01 | Baseline, horarios, permisos, semilla y almacenamiento previo | **Permisos: hecho en `app/` (SPEC-002, 21/21, QA sin bloqueantes; falta contraprueba manual R5).** Pendiente: SPEC-003 huso horario/prefijo UTC; versionado clave localStorage; `reset` de demo (QA D-3) | SPEC de defecto + reproducción + prueba |
| T-02 | Fuentes/IDs/CSV y V-10 | **Comprobado**: 8 filas del CSV con 11 columnas, 16 citas sin URL (REVISION-PORTABILIDAD). **V-10 parcial (S2b, H-016…H-021)**; pendiente: PDF fechado de páginas AllRide, demo (con autorización), matriz normalizada, URLs primarias H-001/002/003 | URLs y matriz coherentes, límites explícitos |
| T-03 | SPEC-001 alta trabajador y cadena de acceso | Borrador incluido; **decisiones D1–D6 listadas para Eduardo** | AC y política definidos |
| T-04 | ADR-001 backend y costo relativo | Diseño, decisión pendiente | Opciones concretas para Eduardo |
| T-05 | Implementar corte vertical SPEC-001 | Depende de autorización de backend | Pruebas positivas/negativas y concurrencia |
| T-06 | S4 operación Enjoy | Datos/entrevistas pendientes | As-is, contrato anonimizado y variables confirmadas |
| T-07 | S5 síntesis comprar/configurar/construir | Depende de evidencia | Recomendación con costos e incertidumbre |
| T-08 | Extras/evidencia/cierre inmutable | Especificar tras flujo inicial | Cierre reproducible sin alteración histórica |
| T-09 | SPEC-003 configuración operativa real (DEC-008: 15 cupos/van, 2 vans extra, cobro por van) | **Implementada y revisada** (15/15, QA sin bloqueantes); falta contraprueba manual del dueño. Pendiente menor: D-5, D-6, D-8 y tope por jornada | Parámetros en contrato, semilla regenerada, pruebas + QA |
| T-11 | SPEC-004 reserva por sentido (ida/vuelta) y puntos de bajada/encuentro | Depende de la planilla anonimizada de trabajadores (`02-descubrimiento/`) | Puntos con densidad real, reserva por sentido, "24 viajes" reconciliado |
| T-13 | SPEC-003b horario real del contratista (H-022: 7 salidas con minutos fijos, recogida 23:00 para ingreso 00:00) | Pendiente de SPEC; cambio de semilla y `check-baseline`/`check-config` | Semilla con horas reales, pruebas verdes |
| T-14 | SPEC-005 extra ex post (DEC-009): solicitud al día siguiente con justificación, plazo, validación del mandante | Pendiente de SPEC; el prototipo ya tiene Observado → validar emergencia | Flujo completo con auditoría y prueba |
| T-12 | Maestro de vehículos con capacidad real por patente (15–17) y habilitación TTEPRIV (H-002/H-011) | Especificar tras SPEC-003 | Extra valida vehículo habilitado |
| T-10 | Huso horario: clasificación mensual por prefijo UTC vs America/Santiago; `reset` de demo sin permiso (QA D-3) | Pendiente de SPEC | Prueba que cruce medianoche y fin de mes |
El alcance actual no incluye módulos mineros, alojamiento o alimentación. Evitar dividir el MVP en múltiples servicios antes de justificarlo.
