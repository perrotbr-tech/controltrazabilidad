# SPEC-004 — Sectores, paradas y sentido del traslado
Estado: **Borrador — En revisión documental.** Propietario humano: Eduardo Perrot.
Origen: DEC-008 · DEC-022 · DEC-030 · T-11 · H-023 · cuestionario B1–B3 · SPECDRIVE_FASE_3 (modelo híbrido, RN-037).

## 1. Problema y resultado
Sin puntos de bajada/encuentro ni sentido, la reserva/propuesta no refleja la operación real (ida hotel→casas dominante; vuelta marginal en H-023). Resultado: catálogo de **sectores y paradas operacionales anonimizadas** y soporte de sentido en la propuesta/confirmación del Corte 1, sin domicilios exactos.

## 2. Evidencia
- H-023: demanda asimétrica; recogida hacia hotel marginal.
- DEC-030: solo sector, calle sin número, punto de referencia anonimizado, parada operacional, sentido.
- V-18: el contratista agrupa direcciones en rutas.
- “24 viajes”: aún anecdótico; no bloquea esta SPEC.

## 3. Alcance
**Incluido:** modelo de rutas/sectores/paradas; sentido ida/vuelta en propuesta; reglas de anonimización; vínculo con precarga híbrida (SPEC-CORTE-1 / F3-001).
**Excluido:** geocodificación de PII; optimización automática de rutas; GPS (SPEC-006 / F3-005); inscripción/ventana (SPEC-CORTE-1); extras (SPEC-005 / F3-004).
**No duplica:** estados de booking, ventana T−48/T−2, tope de extras ni manifiesto — viven en Corte 1 / F3-001/002/004.

## 4. Requisitos
- REQ-040 Toda parada se identifica por sector + etiqueta operacional; nunca por domicilio completo.
- REQ-041 La propuesta de traslado incluye sentido y parada sugerida cuando el turno lo permite.
- REQ-042 El trabajador solo elige paradas habilitadas para su contrato/organización.
- REQ-043 Geocodificación (si se usa) opera solo sobre calle sin número + ciudad; sin nombres ni RUT.
- REQ-044 La demanda se agrega por salida, sentido y sector (insumo de DEC-025).

## 5. Reglas de negocio
- RN-037 (F3): rutas/paradas sobre sectores anonimizados.
- No espejar automáticamente ida y vuelta (H-023).
- Cambiar sentido dentro de la ventana abierta sigue las reglas de SPEC-CORTE-1 (capacidad atómica, sin perder cupo en silencio).

## 6. Autorización y datos
Trabajador: propias paradas. Contratista: paradas del contrato. Mandante: agregados. Admin: catálogo. Retención alineada a DEC-010 D4. Sin PII real en Git ni en proveedores externos (DEC-030).

## 7. Experiencia
Selector de parada/sentido en “Cambiar” del próximo traslado; sin mapa de domicilios.

## 8. Criterios de aceptación
- AC-040 Dado un trabajador, cuando lista paradas, entonces solo ve habilitadas de su contrato.
- AC-041 Dado un dataset con calle+número+nombre, cuando se importa, entonces se rechaza o anonimiza antes de persistir.
- AC-042 Dado sentido vuelta sin patrón de turno, cuando se propone, entonces no se inventa espejo de ida.
- AC-043 Dado agregados por sector, cuando hay déficit, entonces alimentan alerta DEC-025 sin exponer PII.
- AC-044 Auditoría de cambio de parada/sentido con actor, antes/después.

## 9. Observabilidad
KPI: confirmados por sector/sentido; paradas sin demanda; intentos de importar PII rechazados.

## 10. Migración
Paradas demo actuales se etiquetan como “propuesta Supervisor” hasta B1–B3. Rollback: volver a etiquetas previas sin borrar historial de bookings.

## 11. Riesgos y decisiones abiertas
- B2/B3 del cuestionario (máx. paradas; vans a la misma hora) aún como supuesto si no hay respuesta escrita en registro.
- Dependencia de planilla anonimizada.

## 12. Aprobaciones
Producto: DEC-030. Operación: pendiente B1–B3 explícitos. Técnico: pendiente implementación. Seguridad: anonimización obligatoria.
