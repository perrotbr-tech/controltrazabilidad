# Registro de aprobaciones y decisiones

| Fecha | ID | Fase/objeto | Decisión | Alternativas | Motivo | Aprobador | Estado |
|---|---|---|---|---|---|---|---|
| 2026-09-08 | DEC-001 | G0 Alcance | **Aprobada** — investigación autorizada bajo 01-investigacion/plan-investigacion.md | (a) investigar primero; (b) cerrar el módulo de usuarios del prototipo antes | Se privilegia construir sobre evidencia antes de ampliar el prototipo | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-002 | G0 Secuencia | **Aprobada** — orden S1 cumplimiento → S2 soluciones → S3 internacional → S4 operación local → S5 consolidación | Empezar por operación local | El cumplimiento condiciona el diseño y tiene fuente primaria sin depender de terceros | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-003 | G0 Alcance | **Cliente identificado: Hotel Enjoy Antofagasta** (mandante). Caso piloto = transporte de su personal | Producto propio sin cliente | Existe contraparte real; el piloto deja de ser hipotético | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-004 | Ventana operativa | **Confirmado por el dueño**: las vans del Enjoy operan 1 salida por hora desde las 23:00 hasta las 06:00 (8 salidas/ruta/noche, no 24) | — | Dato operativo real entregado por el cliente | Eduardo | **Aprobada — evidencia declarada** |
| 2026-09-08 | DEC-005 | Modo de trabajo | Ejecutar MVP ahora, saltando G1/G2/G3 formales, y trasladar el proyecto a Claude Code para continuar | Completar compuertas antes de construir | Instrucción directa del dueño | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-006 | SPEC-001 D5 — acceso y datos | **El conductor lo controla la empresa para la que trabaja (contratista)**: no es usuario de la plataforma en el piloto; el operador del contratista ve el manifiesto y responde por la identificación de conductor y vehículo (H-002) | Conductor como usuario con acceso propio al manifiesto | Instrucción directa del dueño; minimización de datos (H-001) | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-007 | Investigación V-10 | **Autorizado** cerrar V-10 (alcance real del "cumplimiento contractual" de AllRide) con el especialista `investigador`, fuentes públicas, sin contacto comercial | Esperar demo del proveedor | Es la consulta que decide comprar/configurar/construir (S2) | Eduardo | **Aprobada** |
| 2026-09-08 | DEC-008 | Configuración operativa real (SPEC-003) | **Aprobada por el dueño**: capacidad 15–17 pasajeros por salida por van (se usa 15 como cupo garantizado, configurable); salidas cada hora 23:00–06:00 en ambos sentidos (hotel → casas y casas → hotel); se mantienen las 2 rutas, con puntos de bajada y encuentro por definir con la planilla de trabajadores; **2 vans adicionales completas a disposición, cobro por van, no por pasajero**; la planilla que se entregue es de trabajadores, no del prestador (debe anonimizarse antes de entrar al repositorio) | Mantener 4 cupos del prototipo | Respuestas Q1–Q5 del dueño | Eduardo | **Aprobada — evidencia declarada, sin contrato adjunto (V-05)** |
| 2026-09-08 | V-16 (declarado, precisado por DEC-008; queda solo la cifra "24 viajes") | Configuración operativa real | El dueño declara: "las 24 viajes son de 4 vans diferentes, cerca de 15 pasajeros". Contradice la configuración del prototipo (vans de 4 cupos, 2 rutas × 2 vans, 8 salidas/ruta/noche = 16 salidas). **No se altera el prototipo hasta precisar**: ver SPEC-003 borrador | — | Evidencia declarada; el manual exige elevar la decisión, no alterar en silencio | Eduardo (pendiente) | **Pendiente de precisión** |

## Sesiones
| Fecha | Modo | Objetivo | Archivos | Compuerta |
|---|---|---|---|---|
| 2026-09-08 | RESEARCH | Estructura, inventario del prototipo y plan de investigación para G0 | 00-contexto/, 01-investigacion/, 06-gobernanza/ | G0 **aprobada** |
| 2026-09-08 | RESEARCH | S1 — Cumplimiento chileno (L2): P6–P9 | 01-investigacion/S1-cumplimiento-chile.md, matriz-evidencia.csv | rumbo a G1 |
| 2026-09-08 | RESEARCH | S2 — Soluciones existentes y comprar/configurar/construir (L4–L5): P11–P12 | 01-investigacion/S2-soluciones-existentes.md, matriz-evidencia.csv (H-008…H-012) | rumbo a G1/G2 |
| 2026-09-08 | RESEARCH | S3 — Referencias internacionales (L3): P10 | 01-investigacion/S3-referencias-internacionales.md, matriz (H-013…H-015), HIP-06 | rumbo a G1 |
| 2026-09-08 | BUILD (instrucción directa) | Ajustar MVP a ventana operativa real (23:00–06:00, 8 salidas/ruta) y preparar traspaso a Claude Code | 09-plataforma/prototipo-actual/index.html, 06-gobernanza/traspaso-claude-code.md | **G1/G2/G3 no completadas — salto explícito registrado por instrucción del dueño; el MVP se mantiene como prototipo no productivo** |
| 2026-09-08 | SPEC + BUILD acotado (DEC-005) — sesión 1 Claude Code | Reconstruir paquete portable en el repositorio; T-01 auditoría con SPEC-002 y corrección de permisos en copia `app/`; T-02 comprobación CSV/citas; SPEC-001 con decisiones pendientes | 34 archivos reconstruidos; 04-especificaciones/SPEC-002-permisos-en-mutaciones.md; scripts/check-permisos.cjs; 09-plataforma/app/index.html; SPEC-001; REVISION-PORTABILIDAD; 08-validacion/resultado-baseline.md; ESTADO-ACTUAL; tareas.md; banco-prompts PR-07 | Sin DEC nueva. Corrección bajo DEC-005; constructor y revisor-qa delegados; push a rama `claude/proyecto-agente-ia-lazwio` por instrucción del dueño para esta sesión remota |
| 2026-09-08 | Incorporación de fuentes — sesión 1 (continuación) | Recibir manual Word y ZIP; verificar contra el repo; incorporar manual y archivos que el prompt maestro exige; conservar ZIP como histórico | 06-gobernanza/Sistema_Agentico_Mineria_SpecDriven.docx, manual-spec-driven.md, compuertas.md; 00-contexto/vision-y-alcance.md; 04-especificaciones/PLANTILLA-SPEC.md; 00-contexto/historico/zip-2026-09-08/; README; ESTADO-ACTUAL; banco-prompts PR-07 | Sin DEC nueva. Ningún archivo sobrescrito; ZIP es anterior a DEC-004 |
| 2026-09-08 | RESEARCH (V-10) + SPEC — sesión 1 (respuestas del dueño) | Registrar respuestas: contraprueba manual de SPEC-002 OK (R5 verificada); DEC-006 conductor; DEC-007 V-10; V-16 configuración real declarada. Investigador sobre V-10. SPEC-003 borrador | registro-aprobaciones, SPEC-001, SPEC-002, SPEC-003 (nuevo), 01-investigacion/V-10-*.md, matriz, hipotesis, ESTADO-ACTUAL, tareas | Decisión del Supervisor sobre la rama: el remoto no tiene rama principal (HEAD apunta a `claude/proyecto-agente-ia-lazwio`), por lo que un pull request no tiene base; la rama actual es el tronco de trabajo y se propone crear `main` desde ella al cerrar la primera compuerta abreviada |
| 2026-09-08 | SPEC + BUILD acotado (DEC-008) — sesión 1 (cierre) | Implementar SPEC-003 en `app/` con constructor; revisión revisor-qa; correcciones QA D-1…D-4, D-7; pruebas | 09-plataforma/app/index.html; scripts/check-config.cjs; SPEC-003; 08-validacion/resultado-baseline.md; ESTADO-ACTUAL; tareas (T-11, T-12) | Sin DEC nueva. QA sin bloqueantes. Pendiente contraprueba del dueño y planilla anonimizada |

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
- **V-10** Alcance real del "cumplimiento contractual" de AllRide — **parcialmente cerrado 2026-09-08 (S2b, H-016…H-019)**: declara conciliación factura–servicio ejecutado y estados de pago; no se halló fijo separado de extras, causal, autorización distinta de evidencia ni cierre reproducible. Falta: PDF fechado de las páginas (sin aprobación) y demo con preguntas cerradas (**requiere autorización de Eduardo para el contacto comercial**).
- **V-11** API/exportación disponible en las plataformas candidatas.
- **V-12** Precio y modelo de licencia (no publicado; solicitar).
- **V-13** Ahorro medible hoy en el Enjoy: horas de coordinación, extras discutidos, tiempo de conciliación (entrevista).

- **V-14** Perú: sin fuente primaria levantada; pendiente si G1 lo exige.
- **V-15** Ningún caso internacional con cliente identificable y métrica verificable: benchmark de patrones, no de resultados.
- **V-16** Configuración operativa real del Enjoy: el dueño declara 24 viajes, 4 vans distintas y cerca de 15 pasajeros. Falta precisar: (a) ¿15 es la capacidad de cada van o el promedio de pasajeros por viaje?; (b) ¿24 viajes es el total por noche entre las 4 vans (6 por van) o por ruta?; (c) ¿se mantienen 2 rutas y la ventana 23:00–06:00 de DEC-004?; (d) ¿el "extra" sigue siendo una van adicional completa? Ver SPEC-003.

## Instrucción operativa del dueño del proyecto (2026-09-08)
Al cerrar cada etapa importante, registrar el proceso y el banco de prompts en la carpeta local
`C:\Users\perro\OneDrive\Desktop\Proyecto Enjoy` — el Supervisor entrega la carpeta empaquetada (zip)
al cierre de cada compuerta o sesión relevante; la escritura directa en disco local corresponde a Claude Desktop/Cowork.

## Actualización de portabilidad a Claude Code
2026-09-08: solicitud actual del usuario de actualizar el sistema con el ZIP y HTML adjuntos para partir en Claude Code. Se agregan instrucciones nativas, especialistas, backlog y SPEC-001 propuesta. No se concede nueva aprobación de backend/producción ni se reemplazan DEC-001…005.
