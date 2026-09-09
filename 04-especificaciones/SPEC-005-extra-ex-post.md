# SPEC-005 — Extra ex post y plazo de regularización
Estado: **Borrador — En revisión documental.** Propietario humano: Eduardo Perrot.
Origen: DEC-009 · DEC-013 · DEC-025 · DEC-026 · DEC-028 · DEC-031 · T-14 · SPECDRIVE F3-002 / F3-004.

## 1. Problema y resultado
De madrugada puede no haber autorizador; el servicio se presta y debe regularizarse al día siguiente sin reescribir el manifiesto ni alterar el fijo. Resultado: flujo ex post con **plazo 12:00 America/Santiago del día siguiente**, validación del supervisor del mandante y auditoría completa.

## 2. Evidencia
- DEC-009: camino Observado → validar emergencia o excluir (ya modelado en demo).
- DEC-028: plazo y bloqueo/escalamiento fuera de plazo.
- DEC-026: contratista propone; mandante decide; contingencia con validación posterior.
- SPEC-003b R4: caso sembrado ilustrativo.

## 3. Alcance
**Incluido:** plazo, roles, estados de regularización ex post, vínculo con tope 2 vans/jornada, marcado fuera de plazo.
**Excluido:** motor de inscripción híbrida (Corte 1); QR/abordaje (Corte 2); PDF completo de conciliación (detalle en F3-004 / Corte 3); GPS.
**No duplica:** máquina de estados genérica de extras (SPEC-002/003b), tope R7/DEC-025, principio de fijo (DEC-031 / F3 RN-050). Esta SPEC solo formaliza **plazo y gobernanza ex post**.

## 4. Requisitos
- REQ-050 Todo extra prestado sin autorización previa se registra como contingencia/ex post con motivo.
- REQ-051 El registro ex post ordinario debe crearse ≤ 12:00 America/Santiago del día calendario siguiente al de la jornada operacional.
- REQ-052 Fuera de plazo: bloqueo del flujo ordinario o escalamiento a excepción administrativa auditada (DEC-028).
- REQ-053 Valida o rechaza el supervisor del mandante; el contratista no autoaprueba el efecto económico.
- REQ-054 La aprobación operacional de admisión de personas (F3-002) es distinta de la aprobación económica del extra.
- REQ-055 El extra consume tope de jornada según DEC-025 hasta resolución; rechazado libera según política registrada.
- REQ-056 Ningún KPI ni ocupación modifica el monto fijo (DEC-031).

## 5. Reglas de negocio
- Conservar manifiesto cerrado; anexo/evidencia (DEC-016).
- Observado bloquea cierre económico hasta subsanar o exclusión motivada (alineado SPEC-002 R4).
- Valores demo etiquetados ficticios hasta V-05.

## 6. Autorización y datos
Contratista: registrar/proponer. Mandante (supervisor): decidir. Admin: configurar plazo. Auditoría: actor, rol, org, contrato, antes/después, hora servidor.

## 7. Experiencia
Cola “Extras ex post” con cuenta regresiva al mediodía; estado Fuera de plazo visible.

## 8. Criterios de aceptación
- AC-050 Dado un extra de madrugada, cuando se registra a las 11:59 del día siguiente (America/Santiago), entonces se admite al flujo ordinario.
- AC-051 Dado el mismo caso a las 12:00:00, entonces se bloquea o escala como excepción administrativa (política configurada).
- AC-052 Dado reloj de teléfono alterado, cuando el servidor marca 12:01, entonces prevalece el servidor.
- AC-053 Dado contratista, cuando intenta autoaprobar económicamente, entonces se deniega y audita.
- AC-054 Dado tope 2 ya consumido, cuando se propone otra van ex post, entonces se rechaza o queda en revisión sin superar tope.
- AC-055 Dado extra sin evidencia, cuando se concilia, entonces no suma al total conciliable.
- AC-056 Monto fijo idéntico ante ocupación 0 o 100 %.

## 9. Observabilidad
Extras dentro/fuera de plazo; tiempo medio de validación; observados abiertos.

## 10. Migración
Demo actual ya tiene Observado → validar emergencia; al implementar, mapear a estados con `tipo=ex_post` y `plazo_limite`.

## 11. Riesgos
V-05 sin contrato real; tarifas ficticias. Contingencia DEC-026 no debe usarse para eludir el tope sin registro.

## 12. Aprobaciones
Producto/Operación: DEC-009/026/028. Contrato: DEC-031. Técnico: pendiente Corte 3.
