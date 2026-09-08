# Registro de aprobaciones y decisiones

| Fecha | ID | Fase/objeto | Decisión | Alternativas | Motivo | Aprobador | Estado |
|---|---|---|---|---|---|---|---|
| 2026-09-08 | DEC-001 | G0 Alcance | **Aprobada** — investigación autorizada bajo 01-investigacion/plan-investigacion.md | (a) investigar primero; (b) cerrar el módulo de usuarios del prototipo antes | Se privilegia construir sobre evidencia antes de ampliar el prototipo | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-002 | G0 Secuencia | **Aprobada** — orden S1 cumplimiento → S2 soluciones → S3 internacional → S4 operación local → S5 consolidación | Empezar por operación local | El cumplimiento condiciona el diseño y tiene fuente primaria sin depender de terceros | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-003 | G0 Alcance | **Cliente identificado: Hotel Enjoy Antofagasta** (mandante). Caso piloto = transporte de su personal | Producto propio sin cliente | Existe contraparte real; el piloto deja de ser hipotético | Eduardo | **Aprobada** |

## Sesiones
| Fecha | Modo | Objetivo | Archivos | Compuerta |
|---|---|---|---|---|
| 2026-09-08 | RESEARCH | Estructura, inventario del prototipo y plan de investigación para G0 | 00-contexto/, 01-investigacion/, 06-gobernanza/ | G0 **aprobada** |
| 2026-09-08 | RESEARCH | S1 — Cumplimiento chileno (L2): P6–P9 | 01-investigacion/S1-cumplimiento-chile.md, matriz-evidencia.csv | rumbo a G1 |
| 2026-09-08 | RESEARCH | S2 — Soluciones existentes y comprar/configurar/construir (L4–L5): P11–P12 | 01-investigacion/S2-soluciones-existentes.md, matriz-evidencia.csv (H-008…H-012) | rumbo a G1/G2 |

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

## Instrucción operativa del dueño del proyecto (2026-09-08)
Al cerrar cada etapa importante, registrar el proceso y el banco de prompts en la carpeta local
`C:\Users\perro\OneDrive\Desktop\Proyecto Enjoy` — el Supervisor entrega la carpeta empaquetada (zip)
al cierre de cada compuerta o sesión relevante; la escritura directa en disco local corresponde a Claude Desktop/Cowork.
