# Compuertas de supervisión
Fuente: manual rector, sección 11. Estado real de cada compuerta según `registro-aprobaciones.md`.

| Compuerta | Decide | Entrada mínima | Salida | Estado (2026-09-08) |
|---|---|---|---|---|
| G0 Alcance | Eduardo | Visión, límites, países, primer caso | Investigación autorizada | **Aprobada** (DEC-001, DEC-002, DEC-003) |
| G1 Evidencia | Eduardo + referente operativo | Fuentes, entrevistas, vacíos, mapa as-is | Hallazgos aceptados | Saltada para el MVP (DEC-005); S1–S3 hechas, S4–S5 pendientes; V-10 abierto |
| G2 Producto | Eduardo | Opciones comprar/configurar/construir, costo y riesgo | Dirección elegida | Saltada para el MVP (DEC-005); tres caminos descritos en S2, sin elegir |
| G3 Especificación | Dueño de producto + operación/contrato | SPEC y criterios de aceptación | Desarrollo autorizado | Saltada para el MVP (DEC-005). SPEC-001 propuesta; SPEC-002 corrección de defecto ejecutada bajo DEC-005 |
| G4 Arquitectura y seguridad | Responsable técnico + seguridad | Modelo, amenazas, datos, costo | Implementación autorizada | Pendiente; ADR-001 sin decisión |
| G5 Piloto | Dueños operativo y contractual | Pruebas, migración, soporte y rollback | Piloto controlado | Pendiente |
| G6 Producción | Dirección autorizada | Evidencia del piloto y riesgos residuales | Despliegue o iteración | Pendiente |

## Acciones que siempre requieren humano
- Elegir empresa/faena piloto y comprometer a terceros.
- Aprobar interpretación contractual o regulatoria.
- Definir datos personales reales y periodos de retención.
- Aprobar tarifas, conciliaciones, pagos o sanciones.
- Seleccionar proveedor con costo o dependencia relevante.
- Cambiar permisos, publicar o desplegar.
- Aceptar riesgo alto o excepción de seguridad.

## Política de detención
El agente se detiene si faltan fuentes para una afirmación crítica, hay conflicto contractual, la identidad del aprobador no es clara, el cambio amplía materialmente el alcance o puede afectar dinero, acceso, privacidad o producción.

## Regla de continuidad (CLAUDE.md)
DEC-005 autoriza avanzar el MVP y corregir el prototipo sin reiniciar G0 ni bloquear por G1/G2/G3. Toda ampliación mayor (backend real, módulo nuevo, integración con terceros, datos personales reales) vuelve a pasar por la compuerta que corresponda, aunque sea abreviada, y se registra con DEC-###. Si el dueño pide saltarla de nuevo, se registra igual; nunca se ejecuta en silencio.
