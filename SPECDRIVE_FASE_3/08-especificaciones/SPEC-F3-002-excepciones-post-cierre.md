# SPEC-F3-002 — Excepciones posteriores al cierre

Estado: PROPUESTA. Depende de SPEC-F3-001.

## Resultado

Un cambio de turno posterior a las 21:00 puede gestionarse sin reabrir el manifiesto ni perder auditoría.

## Tipos

- cambio tardío de turno;
- persona omitida en nómina;
- contingencia operacional;
- error de asignación;
- necesidad crítica autorizada;
- extra prestado en madrugada y regularizado ex post.

## Requisitos

1. El trabajador solo solicita; no autoaprueba.
2. La solicitud exige motivo y alternativa deseada.
3. El sistema muestra capacidad real.
4. Contratista puede registrar; mandante autorizado decide según política.
5. Una aprobación sin cupo genera espera, no confirmación.
6. El manifiesto original no cambia; se agrega anexo.
7. La decisión registra antes, después, actor y hora.
8. La excepción puede vencer al finalizar el servicio.
9. La aprobación económica de un extra es distinta de la admisión operacional de una persona.

## Aceptación

- AC-020: trabajador bloqueado obtiene formulario de excepción.
- AC-021: contratista no puede aprobar su propia solicitud.
- AC-022: mandante aprueba con motivo obligatorio.
- AC-023: sin cupo el resultado es espera.
- AC-024: manifiesto original conserva hash y conteo.
- AC-025: anexo permite reconstruir quién viajó.
- AC-026: operación ex post respeta plazo configurado.
