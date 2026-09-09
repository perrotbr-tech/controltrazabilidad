# SPEC-006 — Seguimiento de la van en ruta ("estilo Uber", acotado)
Estado: **Borrador alineado a DEC-024/030 — Corte 4 (DEC-019).** Propietario humano: Eduardo Perrot.
Origen: instrucción del dueño · H-001 · DEC-006 · DEC-021 · DEC-024 · DEC-030 · F3-005 · cuestionario A1–A5.

## 1. Problema y resultado
El trabajador no sabe dónde viene la van; el mandante necesita evidencia de ejecución. Resultado: registro de ejecución de la **van** (no de la persona) y visibilidad limitada al servicio confirmado.

## 2. Evidencia y límite
- H-001 / DEC-030: geolocalizar van, nunca trabajador.
- DEC-024 / DEC-006: emisor = dispositivo o sesión del **operador contratista**; no existe rol usuario “conductor”.
- H-002 / T-12: van identificada por patente.

## 3. Alcance del MVP (Corte 4)
Incluido: iniciar/detener transmisión desde sesión operador contratista; mapa para trabajador con reserva confirmada (solo su van); contratista/mandante según contrato; hitos de parada; al cerrar, conservar hitos necesarios no rastro indefinido.
Excluido: GPS de personas, facial, tracking fuera de ruta activa, Corte 1–3 incompletos.

## 4. Requisitos
- REQ-020 Posición asociada a `vehiculo` + `servicio`, nunca a trabajador.
- REQ-021 Solo mientras la ruta está activa; retención según config aprobada (DEC-030).
- REQ-022 Visibilidad por contrato y titularidad.
- REQ-023 Eventos de parada alimentan evidencia.
- REQ-024 Offline: acumular y sincronizar sin sobrescribir a ciegas.
- REQ-025 Emisor autenticado como operador contratista (DEC-024).

## 8. Aceptación (alineada F3-005)
AC-050…055 de F3-005; más: intento de crear usuario “conductor” rechazado; otro contrato denegado.

## 11. Decisiones
A1–A5 cubiertas por DEC-024/030. Requiere backend (DEC-021) y Cortes 1–2. **No implementar en esta sesión.**
