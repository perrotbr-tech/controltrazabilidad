# Registro de aprobaciones y decisiones

| Fecha | ID | Fase/objeto | Decisión | Alternativas | Motivo | Aprobador | Estado |
|---|---|---|---|---|---|---|---|
| 2026-09-08 | DEC-001 | G0 Alcance | **Aprobada** — investigación autorizada bajo 01-investigacion/plan-investigacion.md | (a) investigar primero; (b) cerrar el módulo de usuarios del prototipo antes | Se privilegia construir sobre evidencia antes de ampliar el prototipo | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-002 | G0 Secuencia | **Aprobada** — orden S1 cumplimiento → S2 soluciones → S3 internacional → S4 operación local → S5 consolidación | Empezar por operación local | El cumplimiento condiciona el diseño y tiene fuente primaria sin depender de terceros | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-003 | G0 Alcance | **Cliente identificado: Hotel Enjoy Antofagasta** (mandante). Caso piloto = transporte de su personal | Producto propio sin cliente | Existe contraparte real; el piloto deja de ser hipotético | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-004 | Ventana operativa | **Confirmado por el dueño**: las vans del Enjoy operan 1 salida por hora desde las 23:00 hasta las 06:00 (8 salidas/ruta/noche, no 24) | — | Dato operativo real entregado por el cliente | Eduardo | **Aprobada — evidencia declarada** |
| 2026-09-08 | DEC-005 | Modo de trabajo | Ejecutar MVP ahora, saltando G1/G2/G3 formales, y trasladar el proyecto a Claude Code para continuar | Completar compuertas antes de construir | Instrucción directa del dueño | Eduardo | **Aprobada** |

## Sesiones
| Fecha | Modo | Objetivo | Archivos | Compuerta |
|---|---|---|---|---|
| 2026-09-08 | RESEARCH | Estructura, inventario del prototipo y plan de investigación para G0 | 00-contexto/, 01-investigacion/, 06-gobernanza/ | G0 **aprobada** |
| 2026-09-08 | RESEARCH | S1 — Cumplimiento chileno (L2): P6–P9 | 01-investigacion/S1-cumplimiento-chile.md, matriz-evidencia.csv | rumbo a G1 |
| 2026-09-08 | RESEARCH | S2 — Soluciones existentes y comprar/configurar/construir (L4–L5): P11–P12 | 01-investigacion/S2-soluciones-existentes.md, matriz-evidencia.csv (H-008…H-012) | rumbo a G1/G2 |
| 2026-09-08 | RESEARCH | S3 — Referencias internacionales (L3): P10 | 01-investigacion/S3-referencias-internacionales.md, matriz (H-013…H-015), HIP-06 | rumbo a G1 |
| 2026-09-08 | BUILD (instrucción directa) | Ajustar MVP a ventana operativa real (23:00–06:00, 8 salidas/ruta) y preparar traspaso a Claude Code | 09-plataforma/prototipo-actual/index.html, 06-gobernanza/traspaso-claude-code.md | **G1/G2/G3 no completadas — salto explícito registrado por instrucción del dueño; el MVP se mantiene como prototipo no productivo** |
| 2026-09-08 | SPEC + BUILD acotado (DEC-005) — sesión 1 Claude Code | Reconstruir paquete portable en el repositorio; T-01 auditoría con SPEC-002 y corrección de permisos en copia `app/`; T-02 comprobación CSV/citas; SPEC-001 con decisiones pendientes | 34 archivos reconstruidos; 04-especificaciones/SPEC-002-permisos-en-mutaciones.md; scripts/check-permisos.cjs; 09-plataforma/app/index.html; SPEC-001; REVISION-PORTABILIDAD; 08-validacion/resultado-baseline.md; ESTADO-ACTUAL; tareas.md; banco-prompts PR-07 | Sin DEC nueva. Corrección bajo DEC-005; constructor y revisor-qa delegados; push a rama `claude/proyecto-agente-ia-lazwio` por instrucción del dueño para esta sesión remota |

## Vacíos que requieren decisión humana
- ~~**V-01** Naturaleza del proyecto~~ → **CERRADO por DEC-003**: cliente identificado, Hotel Enjoy Antofagasta. Sube la prioridad de la operación local y del contrato real.
- **V-02** Acceso a entrevistas: sin personas reales solo habrá evidencia normativa y pública; la observada quedará declarada como vacío.
- **V-03** Presupuesto y horizonte del piloto: condiciona comprar / configurar / integrar / construir.
- **V-04** Residencia de datos y política de privacidad aceptable para el mandante.
- **V-05** ¿Existe un contrato real de transporte al que acceder (aunque sea anonimizado)? Es la mejor fuente contractual posible.

- **V-06** ¿El transporte de personal del hotel califica como servicio propio del giro para efectos de subcontratación? (dictamen Dirección del Trabajo)
- **V-07** ¿La empresa de transporte del Enjoy tiene inscripción TTEPRIV vigente y por qué vehículos? (dato del cliente)
- **V-08** ¿Quién es responsable y quién encargado del tratamiento de datos? (decisión contractual con el Enjoy)
- **V-09** Norma sectorial hotelera/casino sobre traslado de personal en turnos nocturnos — no investigada.
- **V-10** Alcance real del "cumplimiento contractual" de AllRide: ¿cubre conciliación económica? (demo o ficha técnica) — **decide el diferenciador**.
- **V-11** API/exportación disponible en las plataformas candidatas.
- **V-12** Precio y modelo de licencia (no publicado; solicitar).
- **V-13** Ahorro medible hoy en el Enjoy: horas de coordinación, extras discutidos, tiempo de conciliación (entrevista).

- **V-14** Perú: sin fuente primaria levantada; pendiente si G1 lo exige.
- **V-15** Ningún caso internacional con cliente identificable y métrica verificable: benchmark de patrones, no de resultados.

## Instrucción operativa del dueño del proyecto (2026-09-08)
Al cerrar cada etapa importante, registrar el proceso y el banco de prompts en la carpeta local
`C:\Users\perro\OneDrive\Desktop\Proyecto Enjoy` — el Supervisor entrega la carpeta empaquetada (zip)
al cierre de cada compuerta o sesión relevante; la escritura directa en disco local corresponde a Claude Desktop/Cowork.

## Actualización de portabilidad a Claude Code
2026-09-08: solicitud actual del usuario de actualizar el sistema con el ZIP y HTML adjuntos para partir en Claude Code. Se agregan instrucciones nativas, especialistas, backlog y SPEC-001 propuesta. No se concede nueva aprobación de backend/producción ni se reemplazan DEC-001…005.
