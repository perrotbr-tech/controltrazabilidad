# Cierre de etapa parcial — Etapa 1 (2026-09-08)
Compuerta abreviada bajo DEC-005. Aprobador: Eduardo Perrot. Supervisor: sesión principal de Claude Code.

## Qué queda cerrado
| Ítem | Estado | Evidencia |
|---|---|---|
| Proyecto reconstruido en Git con método spec-driven, manual rector, agentes y compuertas | Hecho | Rama `claude/proyecto-agente-ia-lazwio`, 12 commits |
| SPEC-002 permisos en todas las mutaciones | Verificada | `check-permisos.cjs` 21/21; contraprueba manual del dueño |
| SPEC-003 configuración real (15 cupos/van, 2 vans extra, cobro por van, ida y vuelta) | Verificada | `check-config.cjs` 15/15; E2E Chromium 12/12 con capturas |
| Decisiones registradas | DEC-006 a DEC-011 | `registro-aprobaciones.md` |
| V-10 AllRide | Parcial; contacto autorizado (DEC-011) | `01-investigacion/S2b-V10-allride-conciliacion.md` |
| Demo | Publicada como página privada + zip | Misma copia `app/` verificada |

## Qué NO está hecho (no confundir con la demo)
- Sin backend, autenticación real, base de datos ni aislamiento multiempresa: todo corre en el navegador con datos ficticios.
- Horario real del contratista (H-022: 00:15, 01:35 … 06:45) aún no reflejado en la semilla → SPEC-003b.
- Flujo "extra ex post al día siguiente" (DEC-009) existe parcialmente (Observado → validar emergencia); falta plazo y formulario → SPEC-005.
- Registro de trabajadores (SPEC-001) decidido, no construido → T-05 simulación.
- Puntos de bajada y encuentro por ruta dependen de la planilla anonimizada → SPEC-004.
- Tope de 2 vans extra: por solicitud (pendiente decidir si por jornada).

## Guion de demo (5 minutos)
1. **Login** — cuentas de demostración; el rol lo asigna la administración, no el usuario.
2. **Camila (trabajador)** — "Mis traslados": salidas 23:00–06:00, capacidad 30 por salida, reserva o lista de espera. Cancela solo lo propio.
3. **Rodrigo (contratista)** — "Demanda y abordajes" por jornada nocturna; "Vehículos adicionales": pedir 1 o 2 vans, justificación automática (cuantitativa) u operacional; se cobra por van.
4. **Patricia (mandante)** — "Solicitudes de extras": ve demanda, déficit y capacidad propuesta; autoriza con motivo; la capacidad sube y la lista de espera se confirma sola. "Trazabilidad": todo queda con usuario, rol, fecha y valor anterior.
5. **Contrato** — fuente única: fijo mensual, 15 cupos garantizados, 2 vans extra, tarifa por van, ida y vuelta.
6. **Conciliación mensual** — fijo + extras respaldados; bloqueada mientras haya un Observado (el extra de madrugada sin autorización). Mostrar "Validar emergencia" como el camino de DEC-009.
Mensaje de cierre: la plataforma traza y respalda; no decide cuánto se paga.

## Próxima etapa (orden propuesto)
1. SPEC-003b horario real (H-022) y SPEC-005 extra ex post (DEC-009) — cambios acotados en `app/` con pruebas.
2. Planilla anonimizada → SPEC-004 puntos y reserva por sentido.
3. SPEC-001 con plantilla completa → simulación de alta/aprobación (T-05).
4. Demo AllRide (Eduardo) con preguntas de S2b → cerrar V-10 → G2 abreviada (comprar/configurar/construir).
5. ADR-001 antes de cualquier backend.
