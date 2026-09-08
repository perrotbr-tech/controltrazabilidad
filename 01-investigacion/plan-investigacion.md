# Plan de investigación — para aprobación en G0

**Modo:** RESEARCH · **Estado:** propuesto, no ejecutado · **Aprobador:** Eduardo
**Regla que gobierna este plan:** ninguna afirmación material sin fuente, con su tipo de evidencia declarado (normativa · contractual · declarada · observada · inferida). Los procesos internos de una minera no se infieren: si no hay fuente pública o entrevista, se declara el vacío.

---

## Pregunta decisional

¿Qué prácticas y componentes tecnológicos ya funcionan en minería y servicios intensivos en contratistas, y cuáles conviene **comprar, configurar, integrar o construir** para una plataforma multiempresa de costo relativo, comenzando por transporte de trabajadores en Antofagasta?

## Preguntas que deben quedar respondidas (o declaradas como vacío)

**Sobre la operación (L1)**
- P1. ¿Cómo se coordina hoy el transporte de personal entre mandante y contratista en faenas de la región: qué sistema, qué planilla, qué mensajería?
- P2. ¿Qué documento acredita hoy que un servicio se prestó (manifiesto, guía, checklist, foto) y quién lo firma?
- P3. ¿Cómo se autoriza y se paga hoy un vehículo adicional? ¿Existe tarifa contractual de extra o se negocia caso a caso?
- P4. ¿Qué se discute realmente en el cierre mensual entre mandante y contratista?
- P5. ¿Qué condiciones de terreno limitan la herramienta: señal, dispositivo compartido, guantes, turno de noche?

**Sobre cumplimiento en Chile (L2)**
- P6. ¿Qué obligaciones aplican al transporte de trabajadores por un contratista (transporte privado remunerado de pasajeros, condiciones del vehículo y del conductor) y cuáles caen sobre el mandante por subcontratación?
- P7. ¿Qué exige la Ley 21.719 de protección de datos personales (vigente desde diciembre de 2026) a una plataforma que registra desplazamientos de trabajadores: base de licitud, retención, derechos del titular, encargado de tratamiento?
- P8. ¿Qué obligaciones de seguridad y salud (Ley 16.744, DS 40/DS 76 de subcontratación) generan registros que esta plataforma podría estar produciendo o reemplazando?
- P9. ¿Qué exigen las mineras a sus proveedores en materia de acreditación y control documental, según sus portales públicos?

**Sobre referencias internacionales (L3)**
- P10. Australia (FIFO/DIDO), Canadá (operaciones remotas), Perú (gran minería andina): ¿qué patrones de *journey management*, manifiesto digital y control de contratistas son transferibles a Chile y cuáles dependen del contexto?

**Sobre soluciones existentes (L4)**
- P11. ¿Qué cubren hoy los productos de *contractor management*, *workforce logistics/transport*, *journey management*, *fleet/dispatch* y *contract lifecycle management*? ¿Cuál es su modelo de licencia, esfuerzo de implantación, API y capacidad offline?
- P12. ¿Dónde queda el hueco real que justifica construir en vez de comprar o configurar?

**Sobre economía y adopción (L5)**
- P13. ¿Qué se ahorra medible: coordinación manual, doble digitación, extras no respaldados, tiempo de conciliación?
- P14. ¿Cuál es el costo de implantación proporcional para un piloto de un contrato?

## Fuentes prioritarias (en este orden)

1. **Normativa y autoridades**: BCN/LeyChile, Ministerio de Transportes, SUSESO/Dirección del Trabajo, Agencia de Protección de Datos, SERNAGEOMIN.
2. **Portales públicos de proveedores** de compañías mineras (requisitos de acreditación y estándares de contratistas).
3. **Documentación técnica y de precios** de productos existentes.
4. **Casos con cliente identificable y métricas verificables** (no material comercial como prueba de resultado).
5. **Entrevistas semiestructuradas** con la guía del manual — *dependen de acceso que solo Eduardo puede abrir* (V-02).
6. Fuentes secundarias solo para contexto.

**Horizonte:** 2023 en adelante; anterior solo si sigue vigente.

## Entregables de la fase (con su archivo)

| Entregable | Archivo | Compuerta |
|---|---|---|
| Matriz de evidencia trazable (H-###) | `01-investigacion/matriz-evidencia.csv` | G1 |
| Mapa as-is por actor y proceso | `02-descubrimiento/mapa-as-is.md` | G1 |
| Benchmark internacional | `01-investigacion/benchmark-internacional.md` | G1 |
| Catálogo de soluciones + comprar/configurar/integrar/construir | `03-producto/analisis-build-vs-buy.md` | G2 |
| Hipótesis HIP-01…05 validadas o refutadas | `01-investigacion/hipotesis.md` | G1 |
| Contradicciones, vacíos y riesgos | `01-investigacion/vacios-y-riesgos.md` | G1 |
| Recomendación de piloto y backlog priorizado | `07-backlog/roadmap.md` | G2 |

## Secuencia propuesta (sesiones de trabajo)

- **S1 — Cumplimiento chileno (L2).** Es lo que más condiciona el diseño y lo que sí tiene fuente primaria disponible sin depender de terceros. Salida: P6–P9 respondidas con norma citada.
- **S2 — Soluciones existentes y costo relativo (L4/L5).** Define si esto se compra o se construye, antes de gastar en especificar. Salida: P11–P14.
- **S3 — Referencias internacionales (L3).** Patrones transferibles. Salida: P10.
- **S4 — Operación local (L1).** Fuentes públicas de mineras + entrevistas si hay acceso. Salida: P1–P5, con lo no verificable declarado como vacío.
- **S5 — Consolidación y G1.** Mapa as-is, hipótesis resueltas, recomendación.

## Criterio de cierre

Cada decisión de alto impacto tiene fuente primaria o limitación explícita; los conflictos importantes están resueltos o acotados; una búsqueda adicional probablemente no cambiaría la recomendación.

## Vacíos que requieren información de Eduardo antes o durante la fase

- **V-01** ¿Cliente identificado o producto propio? Si hay cliente, S4 sube de prioridad; si es producto propio, S2 manda.
- **V-02** ¿Hay acceso a entrevistar operador, supervisor o trabajador? Sin esto, la evidencia observada quedará como vacío declarado.
- **V-03** Presupuesto y horizonte del piloto.
- **V-04** Residencia de datos y privacidad aceptables para el mandante.
- **V-05** ¿Se puede acceder a un contrato real de transporte, aunque sea anonimizado? Es la mejor fuente contractual posible.

## Riesgos de la fase

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Sin entrevistas, el as-is queda basado en normativa y no en la práctica | Alto | Declarar el vacío; no presentar inferencias como hechos; priorizar S1/S2, que no dependen de acceso |
| Material comercial de productos tomado como prueba de resultados | Medio | Solo documentación técnica y casos con cliente identificable |
| Investigación que se extiende sin cerrar decisión | Medio | Criterio de cierre por decisión, no por exhaustividad; G1 acota |
| Sesgo de confirmación hacia el prototipo ya construido | Alto | Las HIP-01…05 se tratan como hipótesis refutables, no como base |
