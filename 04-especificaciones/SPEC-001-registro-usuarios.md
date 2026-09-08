# SPEC-001 — Registro y vínculo entre actores
Estado (PLANTILLA-SPEC): Borrador. Propietario humano: Eduardo Perrot. No aprobación de backend.
Al pasar a "En revisión" debe completarse con la plantilla completa (`PLANTILLA-SPEC.md`): es una ampliación, no una corrección.
Origen: PR-05, DEC-003/005. Piloto: Enjoy.
## Problema
Hoy el login permite seleccionar identidades ficticias. Falta alta del trabajador vinculada al contrato y consulta de su solicitud por el operador y mandante autorizados.
## Requisitos
REQ-001: solicitar alta con datos mínimos; nunca aceptar rol privilegiado elegido por cliente.
REQ-002: solo identidad verificada y asignación habilitada acceden al contrato. Método de verificación y responsable del alta pendientes de definir.
REQ-003: trabajador reserva/consulta/cancela solo lo propio; operador consulta manifiesto del servicio y contrato asignado; mandante supervisa su contrato.
REQ-004: baja revoca acceso y conserva historia según política de retención a definir.
REQ-005: permisos se validan en servidor para una implementación real; no presentar simulación de alta como autenticación.
## Aceptación
AC-001: solicitud duplicada no crea dos identidades equivalentes; regla de identificador documentada.
AC-002: petición con rol ADMINISTRADOR no concede ese privilegio.
AC-003: cuenta pendiente o revocada no reserva aunque invoque endpoint directamente.
AC-004: usuario de contrato B no consulta/modifica reserva de A por ID.
AC-005: reserva de trabajador habilitado aparece en la salida correcta al operador y mandante correspondientes; no expone otras organizaciones.
AC-006: dos peticiones concurrentes al último cupo no sobreasignan capacidad; lista de espera determinista.
AC-007: alta, validación, reserva, cancelación y baja dejan actor, fecha y contexto; no guardan credenciales en log.
## Tareas y decisiones
T-03 completar flujo y política con Eduardo. T-04 ADR-001: comparar autenticación/DB/costo, sin seleccionar stack por inercia. T-05 implementar en app/ solo con autorización de esa ampliación. QA-001: E2E de AC-001…007 antes de piloto.
## Excluido
Autenticación con nombre solamente, credenciales compartidas, autoaprobación, biometría, tracking continuo y cualquier integración productiva no autorizada.

## Revisión del Supervisor en Claude Code (2026-09-08) — decisiones que faltan para pasar de propuesta a SPEC aprobada
Ninguna de estas decisiones se toma aquí; corresponden a Eduardo (T-03). Cada una tiene una opción sugerida para acelerar, no para reemplazar la decisión.

| # | Decisión pendiente | Por qué bloquea | Opción sugerida (no aprobada) |
|---|---|---|---|
| D1 | Identificador único del trabajador (REQ-001, AC-001) | Sin regla no se puede detectar el alta duplicada | RUT normalizado + organización; el correo es dato de contacto, no identidad |
| D2 | Quién aprueba el alta del trabajador (REQ-002) | Define el flujo pendiente→activo y quién responde por la nómina (H-005, art. 183-C) | Supervisor del mandante aprueba; contratista solo consulta |
| D3 | Método de verificación de identidad (REQ-002) | Distingue demostración de piloto real | Piloto: correo corporativo del mandante con enlace de un solo uso; sin biometría |
| D4 | Política de retención y baja (REQ-004, H-001) | Ley 21.719 exige base de licitud y plazo definido antes del 01-12-2026 | Conservar reservas del período contractual + 12 meses; anonimizar después; documentar en contrato de encargo (V-08) |
| D5 | Qué ve el operador/conductor del manifiesto (REQ-003) | Minimización de datos: el conductor no necesita RUT ni correo | **Decidido — DEC-006 (2026-09-08):** el conductor lo controla la empresa contratista; no es usuario de la plataforma en el piloto. El operador del contratista ve el manifiesto (nombre y parada) y registra patente y conductor como evidencia (H-002). Sin acceso del conductor a datos del trabajador |
| D6 | Si el corte vertical se implementa en el HTML (simulación declarada) o espera el backend (ADR-001) | T-05 depende de la autorización de backend | Simular en `09-plataforma/app/` solo el flujo de alta/aprobación con marca "simulación", sin credenciales reales; el backend sigue pendiente de ADR-001 |

Dependencias: ADR-001 (autenticación y aislamiento en servidor), V-08 (responsable/encargado de datos), PR-06 (paradas reales para que el trabajador elija su punto), V-16/SPEC-003 (capacidad real por van condiciona cupos y lista de espera).

Estado de las decisiones al 2026-09-08: D5 decidida (DEC-006). D1, D2, D3, D4 y D6 siguen pendientes; el Supervisor propone aprobar las opciones sugeridas de la tabla con un "sí" explícito del dueño o corregir la que no corresponda. No se avanza a "En revisión" sin esa respuesta.
