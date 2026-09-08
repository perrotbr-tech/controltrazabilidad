# Flujo de Trabajo — Agente IA Especializado con Supervisión Humana

**Caso:** Estudio de durmientes Stanka Rail Solutions — de la idea a dos documentos emitidos
**Entregables producidos:** SRS-2026-003 *Muestra de Rendimiento — Durmiente de Madera* (7 hojas) · SRS-2026-004 *Estudio Comparativo — Madera vs Acero* (7 hojas)
**Roles:** Eduardo Perrot (ingeniero supervisor — datos de terreno, decisiones, vetos) · Claude (agente IA — construcción, cálculo, investigación, auditoría)

---

## 1. El flujo completo, de inicio a fin

**Fase 0 — Definición del objetivo (humano).**
El supervisor define el estudio: fundamentar el cambio de mantención de vía de durmiente de madera a acero patinable, para mandantes ferroviarios. Decide que antes de comparar hay que **medir**: sin línea base propia, cualquier comparación es opinión.

**Fase 1 — Herramienta de captura (agente, iterada por el supervisor).**
Se construyó una microapp offline de medición de tiempos para la visita de terreno. El supervisor la corrigió tres veces con conocimiento de faena (de 11 actividades → 6 → 5 procesos paralelos sobre un tramo de 100 m). Lección honesta: **la app no se usó en terreno** — la visita se registró con notas manuscritas, fotos y conteos. El agente pivoteó sin fricción de la app al informe. *Aprendizaje: capturar primero con el medio más simple; sistematizar después.*

**Fase 2 — Levantamiento de terreno (100% humano).**
Visita real: 6 trabajadores, ventana de 5 h, conteos físicos (110–115 durmientes, 690–700 tirafondos, 220–230 sillas), fotos, distribución de horas por etapa. Este es el insumo que ningún agente puede producir.

**Fase 3 — Validación de la base de cálculo (diálogo).**
El agente propuso normalizar lo medido (~85 m) a 100 m; el supervisor corrigió con dato de terreno: los 100 m **sí** se ejecutaron en la ventana. Decisión humana sobre el dato; lo medido quedó como trazabilidad en la nota metodológica.

**Fase 4 — Construcción del SRS-2026-003 (agente ejecuta, supervisor calibra).**
Documento con marca, cálculo embudo en 3 niveles (faena → etapa → promedio unitario), fotos incrustadas, generación PDF y verificación automática tras cada cambio. Cada iteración nació de una instrucción o corrección del supervisor (ver tabla §2).

**Fase 5 — Auditorías sistemáticas (agente, bajo protocolo).**
Sobre el documento corrieron capas de revisión definidas como método: consistencia (toda cifra recalculada desde la base, 13–16 verificaciones), duplicidad (detector + clasificación de repetición legítima vs dañina), inspección palabra por palabra y de signos de medición, y revisión visual hoja por hoja. Regla operativa: **informar las modificaciones antes de ejecutar, y ejecutar.**

**Fase 6 — Parámetros y metodologías (pedido del supervisor: "que no sea opinión sin fundamento").**
El agente investigó en la web los estándares reales y los montó como parámetros: metas Antofagasta Minerals (−30% al 2030, −50% al 2035, neutralidad 2050), Ley 20.949, DS 594/PREXOR, TMERT-EESS; y ancló el informe a 3 metodologías certificadas por sección: OIT (tiempos), GHG Protocol + IPCC/HuellaChile (CO₂), protocolos MINSAL/ISP (exposición).

**Fase 7 — SRS-2026-004, el comparativo (definiciones humanas → investigación → modelo → calibración).**
El supervisor fijó tres definiciones: sistema Hidremec verificable en la web, mismo escenario de la muestra, veredicto como conclusión técnica. El agente investigó (Hidremec, precedente EFVM/Vale en Brasil en la misma trocha de 1.000 mm, norma NBR 16691, fijación por clip con −30% documentado), construyó un modelo de **6 supuestos declarados (S1–S6)**, cada uno con su fundamento, y emitió el documento espejo. Última supervisión: "los tiempos son muy bajos, ¿podemos ser más agresivos?" → el agente recalibró hasta el límite defendible y **declaró explícitamente dónde no seguiría** (la retro no desaparece; la desinstalación sobre vía de madera es idéntica; los supuestos se mantienen bajo la referencia industrial).

---

## 2. Las intervenciones de supervisión que cambiaron el resultado

| # | Intervención del supervisor | Efecto en el documento |
|---|---|---|
| 1 | "Los 100 m sí se hicieron en 5 h" | Base de cálculo real; fin de la normalización teórica |
| 2 | "El KPI debe decir 2,5 a 3,0 min" | Reveló la distinción **posiciones (135±5) vs cambiados (110–115)** — rescató los conteos reales de terreno |
| 3 | "La APT pesa ~80 kg, no es equipo pequeño" | Consumo corregido a 1,5 L/h → CO₂ de 89,8 a 93,8 kg (dato más defendible) |
| 4 | "¿Las 30 HH son por persona?" | Cuadro HH explícito en la hoja 7: total de cuadrilla, con el cálculo a la vista |
| 5 | "Quiero el parámetro, no solo el resultado" | Tabla semáforo con estándares verificados (metas 2030, límites legales) |
| 6 | "Sin opinión sin fundamento" | Marco metodológico OIT / GHG Protocol / MINSAL por sección |
| 7 | "Proyecta a 600 m/mes, turnos 8×6" | Proyección mensual con verificación de compatibilidad del régimen |
| 8 | Definiciones del comparativo (Hidremec, escenario, conclusión técnica) | Alcance del SRS-2026-004 fijado por el humano antes de construir |
| 9 | "¿Podemos ser más agresivos?" | Recalibración con límites: −12 a −20% en ventana, siempre bajo el −30% documentado |

**Lectura:** ninguna de estas nueve intervenciones era producible por el agente solo — todas provienen de terreno, criterio de ingeniería o decisión de posicionamiento. Y a la inversa: las cascadas de recálculo (30+ cifras interdependientes actualizadas sin dejar restos), la investigación con fuentes, la generación de PDF con verificación y las auditorías repetibles no son razonables de hacer a mano en el mismo tiempo.

---

## 3. Reglas operativas que hicieron funcionar el modelo

1. **Informar antes de ejecutar, y ejecutar** — el supervisor ve las modificaciones propuestas, pero el flujo no se detiene.
2. **Ningún número sin origen** — toda cifra es DATO (terreno), CONTEO, CALCULADO (recalculable desde la base) o REFERENCIA (con fuente); los supuestos se declaran con fundamento (S1–S6).
3. **Cascada completa o nada** — un KPI nunca cambia solo: cada corrección propaga a todas las cifras dependientes y se verifica que no queden restos de versiones anteriores.
4. **Asimetría declarada** — lo medido se distingue de lo investigado; la credibilidad del documento vale más que su contundencia.
5. **Resistencia técnica del agente** — cuando una instrucción rompería la consistencia (cambiar 2,1–2,3 por 2,5–3,0 sin tocar nada más) o la defendibilidad (inflar el acero sin fundamento), el agente lo dice, propone la vía que sí cuadra, y ejecuta esa.
6. **Verificación tras cada regeneración** — páginas, secciones, cifras y render visual se chequean automáticamente después de cada cambio; los errores del propio agente (una regla CSS que rompió la paginación, una tabla invisible) fueron detectados por estas verificaciones, no por el supervisor.

---

## 4. Evaluación honesta

**Funciona como agente especializado con supervisión.** El patrón observado: el humano intervino ~9 veces con decisiones de alto valor; el agente ejecutó decenas de iteraciones, auditorías y regeneraciones entre cada intervención. La supervisión fue **por excepción y por calibración**, no línea a línea — que es exactamente el modelo buscado.

**Dónde el agente falló y cómo se contuvo:** escaló conteos reales a valores calculados (810) hasta que la intervención #2 lo corrigió — el modelo no podía saber solo lo que el terreno sabía; dos errores de maquetación fueron introducidos y atrapados por la verificación automática en el mismo turno. **Dónde el humano ahorró meses:** los datos de terreno y las 9 calibraciones.

**El activo que queda además de los PDF:** una línea base parametrizada, un método de auditoría repetible, y este flujo — replicable para el próximo estudio con cualquier mandante.
