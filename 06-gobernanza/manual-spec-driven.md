# Manual rector — Sistema agéntico supervisado (extracción de texto)
Fuente: `06-gobernanza/Sistema_Agentico_Mineria_SpecDriven.docx` (recibido 2026-09-08, 53 KB). Este Markdown es una extracción fiel del texto para que los agentes puedan leerlo; el Word es el original. No se alteró contenido.

## Correspondencia con el estado actual del proyecto (nota del Supervisor, no parte del manual)
- El manual fue escrito con caso "minería"; DEC-003 fijó el piloto en Hotel Enjoy Antofagasta y CLAUDE.md prohíbe aplicar normativa minera por analogía. Las secciones 05 (L1 operación local) y 13 (roadmap) se leen con ese reencuadre.
- Compuertas: G0 aprobada (DEC-001/002/003); G1, G2 y G3 saltadas por DEC-005 para el MVP. Cualquier ampliación mayor vuelve a pasar por compuerta (abreviada) y se registra.
- Seis funciones del manual (sección 15) ↔ cinco especialistas en `.claude/agents/`: Investigador Chile + Investigador internacional → `investigador`; Analista de producto/mercado + Analista de procesos/contratos → `analista-spec` (mercado con apoyo de `investigador`); Arquitecto/seguridad → `arquitecto`; Constructor → `constructor`; QA → `revisor-qa`. Supervisor = sesión principal.
- Archivos que el prompt maestro (sección 16) exige y se crearon desde el manual: `00-contexto/vision-y-alcance.md` (sección 03), `04-especificaciones/PLANTILLA-SPEC.md` (sección 09), `06-gobernanza/compuertas.md` (sección 11). `AGENTS.md` ya existía.
- Formato de entrega entre funciones (sección 15) y política de detención (sección 11) rigen desde esta sesión.

---

MANUAL DE TRABAJO
Sistema agéntico supervisado
Investigación y desarrollo spec-driven para operaciones y contratos mineros
| Caso inicial: transporte de trabajadores · Región de Antofagasta · Multiempresa y multicontrato |
|---|

Preparado para Eduardo Perrot · Septiembre de 2026
# Cómo usar este documento
Cárgalo como archivo base en un proyecto o conversación de Work Mode.
Copia el Prompt Maestro de la última sección para iniciar al Supervisor.
El Supervisor comienza en modo RESEARCH y no programa hasta superar las compuertas humanas.
La estructura lógica de carpetas sigue siendo la indicada en este manual; el archivo Word reúne su contenido para que pueda abrirse sin ZIP.
## Estructura lógica
00-contexto — visión, alcance e inventario del MVP
01-investigacion — plan, fuentes, matriz de evidencia y entrevistas
02-descubrimiento — procesos as-is y to-be
03-producto — propuesta de valor y estrategia
04-especificaciones — requisitos y criterios de aceptación
05-arquitectura — datos, permisos, seguridad e integraciones
06-gobernanza — compuertas y decisiones humanas
07-backlog — roadmap priorizado por evidencia
08-validacion — pruebas y condición de piloto
09-plataforma — implementación aprobada y prototipo de referencia
agentes — responsabilidades especializadas
# 01 · Instrucciones del proyecto
Este proyecto define cómo investigar, especificar y construir una plataforma multiempresa para controlar contratos y servicios operacionales. El primer caso de uso es la trazabilidad de transporte de trabajadores; la arquitectura debe permitir incorporar alojamiento, alimentación, flota, mantenimiento u otros servicios sin rehacer el núcleo.
## Principio de trabajo
La plataforma se desarrolla mediante especificaciones. Ningún agente puede convertir una idea, una práctica observada o una función del prototipo en código de producción sin:
evidencia o necesidad identificada;
requisito trazable;
criterio de aceptación verificable;
análisis de seguridad, datos y permisos;
aprobación humana en la compuerta correspondiente.
## Cómo iniciar una sesión de trabajo
Leer AGENTS.md y 00-contexto/vision-y-alcance.md.
Registrar el objetivo de la sesión en 06-gobernanza/registro-aprobaciones.md.
Ejecutar solo la fase autorizada: investigación, definición, diseño, construcción o validación.
Actualizar la matriz de evidencia y el registro de decisiones.
Detenerse en cada compuerta que requiera aprobación de Eduardo.
## Flujo
investigación -> mapa operativo -> oportunidades -> producto -> especificaciones -> arquitectura -> implementación -> validación -> piloto
El prototipo adjunto se conserva en 09-plataforma/prototipo-actual/index.html como referencia funcional, no como fuente única de verdad.
# 02 · Reglas del agente supervisor
## Misión
Investigar cómo las compañías mineras y sus contratistas gestionan servicios, usuarios, evidencias y contratos en Antofagasta y en mercados internacionales de referencia; identificar prácticas exitosas y económicamente adaptables; luego especificar y construir una plataforma multiempresa con supervisión humana.
## Alcance inicial
Núcleo: organizaciones, usuarios, contratos, servicios, solicitudes, aprobaciones, evidencias, auditoría, indicadores y conciliación.
Primer módulo: transporte de trabajadores y control de capacidad/servicios adicionales.
Extensible: alojamiento, alimentación, equipos, mantenimiento, acceso y otros contratos de servicio.
Geografía prioritaria: Región de Antofagasta y Chile.
Referencias internacionales: Australia, Canadá, Perú y, cuando agregue valor, Sudáfrica o Estados Unidos.
Horizonte de evidencia: priorizar 2023 en adelante; usar antecedentes anteriores solo si siguen vigentes.
## Reglas intransables
No asumir que una práctica declarada es una práctica real. Etiquetar evidencia como normativa, contractual, declarada, observada o inferida.
No inventar procesos internos de una minera. Si no hay fuente pública o entrevista, declarar el vacío.
Separar requisito común de configuración particular de un contrato.
Mantener aislamiento entre empresas, contratos y centros de costo.
Aplicar mínimo privilegio y autorización de servidor; ocultar pestañas no sustituye el control de acceso.
Registrar toda aprobación, rechazo, cambio de estado y modificación económica en un log inmutable.
No vincular automáticamente el pago fijo del contrato con cada viaje o prestación. El uso mide eficiencia; solo afecta el pago si la cláusula contractual lo establece.
Ningún agente puede publicar, contratar servicios, usar datos personales reales ni desplegar a producción sin aprobación humana expresa.
Toda función propuesta debe indicar problema, usuario, evidencia, beneficio, complejidad, costo relativo y riesgo.
Si la evidencia contradice el prototipo, elevar la decisión; no alterar silenciosamente el alcance.
## Modos autorizables
RESEARCH: buscar y sintetizar evidencia; no programar.
DISCOVERY: modelar procesos y oportunidades; no programar.
SPEC: redactar requisitos y criterios; no programar.
BUILD: implementar únicamente especificaciones aprobadas.
VERIFY: probar contra criterios aprobados; no ampliar alcance.
El modo predeterminado es RESEARCH. Un cambio de modo requiere registro explícito en 06-gobernanza/registro-aprobaciones.md.
## Roles internos
El Supervisor coordina seis funciones especializadas descritas en agentes/roles.md. Pueden trabajar en paralelo durante investigación, pero el Supervisor es el único que consolida conclusiones, cambia estados y presenta decisiones al humano.
## Protocolo spec-driven
Cada capacidad nace como CAP-###, se vincula con hallazgos H-###, se convierte en requisito REQ-###, se desarrolla bajo una especificación SPEC-### y se valida con pruebas AC-###. No se acepta código huérfano sin estos vínculos.
## Definición de terminado
Una fase solo termina cuando sus documentos están actualizados, las incertidumbres están explícitas, los riesgos altos tienen tratamiento y la compuerta humana quedó aprobada. “Funciona en demo” no equivale a “listo para piloto”.
# 03 · Visión y alcance
## Problema
En contratos operacionales participan mandantes, contratistas, trabajadores, supervisores y administradores. Las reservas, confirmaciones, recursos adicionales, evidencias, autorizaciones, desempeño y cierres económicos suelen quedar dispersos. Esto dificulta saber qué se solicitó, qué se prestó, por qué se usó capacidad extra, qué estaba autorizado y cómo se comporta el contrato.
## Visión
Una plataforma única, multiempresa y modular que conecte la operación diaria con el control contractual sin confundir indicadores de uso con reglas de pago. Cada usuario ve solo las tareas y datos que le corresponden según su organización, contrato y asignación.
## Decisión de producto inicial
El transporte es el primer módulo y banco de pruebas. El núcleo del producto será genérico y los detalles —rutas, turnos, capacidades, tarifas, evidencias y reglas de aprobación— serán configurables por contrato.
## Usuarios iniciales
| Usuario | Necesidad principal | Límite |
|---|---|---|
| Trabajador | Reservar/cancelar y conocer su traslado | Solo sus datos y servicios habilitados |
| Operador contratista | Planificar, ejecutar y acreditar el servicio | Solo contratos y recursos asignados |
| Supervisor mandante | Ver cumplimiento y autorizar excepciones | Solo contratos bajo su responsabilidad |
| Administrador de organización | Gestionar usuarios y asignaciones | Sin acceso económico automático |
| Gestor contractual | Configurar contrato, KPI y conciliación | Sin alterar evidencia operacional histórica |
| Auditor | Consultar trazabilidad | Lectura, exportación controlada |

## Fuera de alcance hasta nueva aprobación
Nómina, remuneraciones o asistencia laboral completa.
Facturación electrónica y contabilidad general.
Rastreo continuo de personas.
Decisiones automáticas de sanción, rechazo o pago sin revisión humana.
Integraciones específicas antes de validar procesos y datos.
## Indicadores de éxito del piloto
Trazabilidad completa de solicitud a cierre.
Disminución de coordinación manual y doble digitación.
Evidencia suficiente para explicar servicios adicionales.
Datos separados y seguros por organización/contrato.
Tiempo de adopción razonable para trabajador y operador.
Costo de implantación proporcional al ahorro o riesgo reducido.
# 04 · Inventario del MVP actual
Fuente revisada: index(1).html, MVP v2, aplicación autónoma en navegador.
## Capacidades presentes
Organizaciones mandante y contratista.
Usuarios y asignaciones de rol por contrato.
Interfaces diferentes para trabajador, contratista, mandante y administrador.
Reserva y cancelación de traslados.
Rutas, paradas, salidas, cupos y jornada nocturna.
Solicitud, autorización, rechazo y observación de vehículos extra.
Evidencia de patente, salida y manifiesto.
Panel contractual con ocupación y costos informativos.
Conciliación mensual: monto fijo más extras respaldados.
Auditoría de acciones y accesos denegados.
Punto central de permisos (requirePermission).
## Decisiones correctas que deben preservarse como hipótesis
Los roles los asigna la administración; no los elige el usuario.
Las vistas dependen del contexto contractual del usuario.
El valor fijo mensual no cambia por el nivel de uso salvo cláusula expresa.
Un servicio extra requiere causal, autorización y evidencia.
Los indicadores operacionales no sustituyen la conciliación contractual.
## Limitaciones antes de piloto
Estado, usuarios y datos persisten solo en localStorage.
La autorización ocurre en el navegador y no protege datos reales.
Hay un único contrato y una semilla ficticia.
No existe identidad empresarial, SSO, MFA ni ciclo de alta/baja real.
No hay base de datos, API, cola, almacenamiento documental ni integración.
Las fechas, tarifas, rutas, capacidades y reglas están codificadas.
No existe gestión formal de versiones contractuales ni vigencia de reglas.
La auditoría no es inmutable ni está protegida contra manipulación.
Falta modelar privacidad, retención, respaldo, continuidad y respuesta a incidentes.
## Regla de uso
El MVP sirve para validar lenguaje, flujo y experiencia. No debe evolucionar directamente a producción; la implementación nueva comienza desde especificaciones aprobadas y puede reutilizar componentes visuales cuando superen la validación.
# 05 · Plan de investigación profunda
## Pregunta decisional
¿Qué prácticas y componentes tecnológicos ya funcionan en minería y servicios intensivos en contratistas, y cuáles conviene adaptar para una plataforma multiempresa de costo relativo, comenzando por transporte de trabajadores en Antofagasta?
## Líneas de investigación
### L1. Operación local
Faenas de la Región de Antofagasta y sus modelos de turnos, transporte, acceso y coordinación de contratistas.
Relación mandante–contratista–subcontratista.
Programación, manifiestos, capacidad, contingencias, evidencias, KPI y cierre.
Restricciones de conectividad, dispositivos compartidos y uso en terreno.
### L2. Contratos y cumplimiento en Chile
Deberes aplicables a subcontratación, transporte privado/remunerado según corresponda, seguridad y salud, privacidad y ciberseguridad.
Evidencia contractual, segregación de funciones, retención y auditoría.
Estándares y requisitos públicos de proveedores de compañías mineras.
### L3. Referencias internacionales
Australia: FIFO/DIDO, camp/transport logistics y contractor management.
Canadá: operaciones remotas, camp workforce y seguridad del contratista.
Perú: transporte y control de contratistas en gran minería andina.
Sudáfrica/EE. UU.: solo para cerrar vacíos relevantes.
### L4. Productos existentes y patrones reutilizables
Contractor management, workforce logistics, journey management, fleet/dispatch, procurement/contract lifecycle management y field service.
Distinguir comprar, integrar, configurar y construir.
Comparar licencias, esfuerzo de implantación, dependencia del proveedor, localización, APIs y capacidad offline.
### L5. Economía y adopción
Costos visibles y ocultos.
Ahorro por reducción de coordinación, sobredemanda, extras no respaldados y tiempo de conciliación.
Viabilidad para piloto de una operación y expansión multicontrato.
## Fuentes prioritarias
Normativa, autoridades, estándares y documentación oficial vigente.
Portales y manuales públicos de proveedores de mineras/contratistas.
Documentación técnica y contractual de productos existentes.
Casos de estudio con cliente identificable y métricas verificables.
Entrevistas semiestructuradas con usuarios locales.
Fuentes secundarias solo para contexto o descubrimiento.
## Entregables
Mapa as-is por actor y proceso.
Matriz comparativa Chile/internacional.
Catálogo de soluciones existentes y análisis comprar/configurar/construir.
Hallazgos trazables, contradicciones y vacíos.
Recomendación de producto, arquitectura y piloto.
Backlog priorizado por valor, costo, riesgo y evidencia.
## Criterio de cierre
La investigación se cierra cuando cada decisión de alto impacto tiene fuente primaria o limitación explícita, los conflictos importantes están resueltos/acotados y una búsqueda adicional probablemente no cambiaría la recomendación.
# 06 · Guía de entrevistas
Entrevistar por separado a trabajador, operador/despachador, supervisor mandante, administrador de contrato y auditor/prevención. No registrar datos personales innecesarios.
## Preguntas núcleo
¿Qué evento inicia el proceso y quién lo registra?
¿Qué información se vuelve a escribir en WhatsApp, Excel, correo u otro sistema?
¿Qué decisión necesita autorización y cuál es la evidencia mínima?
¿Qué ocurre cuando cambia la demanda, falla un equipo o llega una persona no registrada?
¿Cómo se acredita que el servicio se ejecutó?
¿Qué dato usa el contrato y qué dato es solo operacional?
¿Qué errores o discusiones se repiten al cierre mensual?
¿Qué puede ver cada empresa y qué no debería ver?
¿Qué sucede sin señal o con un dispositivo compartido?
¿Cuál sería una mejora valiosa que no complique el turno?
## Registro
Por cada entrevista crear una ficha anonimizada con: rol, contexto, proceso, cita autorizada/paráfrasis, dolor, frecuencia, impacto, solución actual, restricción y nivel de confianza. Las opiniones no se presentan como hechos generales.
# 07 · Catálogo de procesos
| Código | Proceso | Inicio | Resultado |
|---|---|---|---|
| PR-01 | Alta de organización | Contrato o invitación aprobada | Tenant configurado |
| PR-02 | Alta y asignación de usuario | Usuario validado | Acceso limitado por organización/contrato |
| PR-03 | Configuración contractual | Contrato vigente | Reglas versionadas y activas |
| PR-04 | Planificación de servicio | Demanda/plan contractual | Capacidad y calendario publicados |
| PR-05 | Solicitud/reserva | Necesidad del usuario | Cupo solicitado y trazable |
| PR-06 | Ejecución | Servicio programado | Prestación y eventos registrados |
| PR-07 | Excepción/extra | Brecha o contingencia | Solicitud decidida con evidencia |
| PR-08 | Validación | Evidencias disponibles | Servicio aceptado, observado o rechazado |
| PR-09 | Medición | Periodo operativo | KPI con denominadores claros |
| PR-10 | Conciliación | Periodo cerrable | Cierre reproducible y aprobado |
| PR-11 | Auditoría | Consulta/incidente | Historia íntegra y exportable |
| PR-12 | Baja/revocación | Fin de relación o cambio | Acceso retirado sin borrar historia |

Para cada proceso se debe crear un as-is, un to-be, variantes por contrato, excepciones, datos, responsables y controles.
# 08 · Brief de producto
## Propuesta
Una capa de control operativo-contractual que reúne a mandante y contratistas sin mezclar propiedad de datos ni autoridad. Convierte eventos diarios en evidencia y esa evidencia en control del contrato.
## Núcleo común
Identidad, organizaciones y relaciones multiempresa.
Contratos y versiones de reglas.
Catálogo de servicios y recursos.
Flujos configurables de solicitud, aprobación y excepción.
Evidencias, documentos y firmas/atestaciones según necesidad.
Auditoría inmutable.
KPI operacionales y contractuales separados.
Conciliación y exportación; facturación solo por integración futura.
## Estrategia de costo relativo
Reutilizar servicios administrados y estándares abiertos.
Construir el diferenciador: modelo contractual-operacional y experiencia por actor.
Integrar capacidades commodity: identidad, almacenamiento, notificaciones, analítica y mapas.
Evitar personalizaciones por cliente; usar reglas y plantillas versionadas por contrato.
Pilotear con un contrato y métricas de valor antes de ampliar módulos.
## Hipótesis que la investigación debe validar
El principal valor está en excepciones y evidencia, no solo en reservar.
La unidad correcta de autorización es la asignación usuario–organización–contrato, no un rol global.
La configuración contractual puede cubrir diferencias entre faenas sin bifurcar el producto.
Un modo degradado/offline es necesario en ciertos puntos operacionales.
El mismo núcleo puede sostener servicios distintos al transporte.
# 09 · Plantilla de especificación
Estado: Borrador | En revisión | Aprobada | En desarrollo | Verificada | Rechazada
Propietario humano:
## 1. Problema y resultado
Problema, usuario afectado, frecuencia e impacto. Resultado medible esperado.
## 2. Evidencia
Hallazgos vinculados: H-###. Indicar qué es hecho, inferencia o supuesto pendiente.
## 3. Alcance
Incluido y excluido. Contratos, organizaciones, actores y variantes alcanzadas.
## 4. Requisitos
REQ-### redacción verificable.
## 5. Reglas de negocio
Estados, transiciones, vigencias, límites, precedencia de reglas y manejo de excepciones.
## 6. Autorización y datos
Quién puede crear, leer, modificar, aprobar y exportar; alcance por organización y contrato; datos sensibles; retención; auditoría.
## 7. Experiencia
Flujo principal, errores, operación sin conexión, accesibilidad y dispositivo objetivo.
## 8. Criterios de aceptación
AC-### Dado / Cuando / Entonces.
Incluir al menos un caso autorizado, uno denegado, uno concurrente y uno de auditoría.
## 9. Observabilidad y métricas
Eventos, KPI, alertas, responsable y denominadores.
## 10. Migración y reversibilidad
Datos iniciales, compatibilidad, rollback y efectos sobre registros históricos.
## 11. Riesgos y decisiones abiertas
Riesgo, probabilidad, impacto, mitigación y decisión humana requerida.
## 12. Aprobaciones
Producto / Operación / Contrato / Seguridad-privacidad / Técnico.
# 10 · Principios de arquitectura
Multiempresa desde el modelo de datos: organization, contract, membership, assignment y scope explícitos.
Un usuario puede pertenecer a varias organizaciones y tener distintas funciones por contrato.
La autorización se aplica en API y base de datos; la interfaz solo refleja permisos ya resueltos.
Reglas contractuales versionadas con fecha de vigencia; no sobrescribir historia.
Separar evento operacional, evidencia, decisión y consecuencia económica.
Auditoría append-only con actor, organización, contrato, tiempo, acción, estado anterior/nuevo y correlación.
Arquitectura modular primero; microservicios solo cuando escala, seguridad o equipos lo justifiquen.
API e integraciones idempotentes; evitar duplicar reservas, servicios o cierres.
Cola/sincronización para conectividad intermitente y conflictos explícitos.
Datos mínimos, cifrado, respaldo, recuperación y observabilidad desde el piloto.
## Dominios candidatos
IAM y organizaciones.
Contratos y reglas.
Catálogo/planificación de servicios.
Solicitudes y asignaciones.
Ejecución y evidencias.
Excepciones y aprobaciones.
Medición y conciliación.
Auditoría, notificaciones e integraciones.
La selección tecnológica se posterga hasta cerrar la investigación de integraciones, conectividad, residencia de datos, volumen, presupuesto y capacidades del equipo.
# 11 · Compuertas de supervisión
| Compuerta | Decide | Entrada mínima | Salida |
|---|---|---|---|
| G0 Alcance | Eduardo | Visión, límites, países, primer caso | Investigación autorizada |
| G1 Evidencia | Eduardo + referente operativo | Fuentes, entrevistas, vacíos, mapa as-is | Hallazgos aceptados |
| G2 Producto | Eduardo | Opciones comprar/configurar/construir, costo y riesgo | Dirección elegida |
| G3 Especificación | Dueño de producto + operación/contrato | SPEC y criterios de aceptación | Desarrollo autorizado |
| G4 Arquitectura y seguridad | Responsable técnico + seguridad | Modelo, amenazas, datos, costo | Implementación autorizada |
| G5 Piloto | Dueños operativo y contractual | Pruebas, migración, soporte y rollback | Piloto controlado |
| G6 Producción | Dirección autorizada | Evidencia del piloto y riesgos residuales | Despliegue o iteración |

## Acciones que siempre requieren humano
Elegir empresa/faena piloto y comprometer a terceros.
Aprobar interpretación contractual o regulatoria.
Definir datos personales reales y periodos de retención.
Aprobar tarifas, conciliaciones, pagos o sanciones.
Seleccionar proveedor con costo o dependencia relevante.
Cambiar permisos, publicar o desplegar.
Aceptar riesgo alto o excepción de seguridad.
## Política de detención
El agente se detiene si faltan fuentes para una afirmación crítica, hay conflicto contractual, la identidad del aprobador no es clara, el cambio amplía materialmente el alcance o puede afectar dinero, acceso, privacidad o producción.
# 12 · Registro de aprobaciones
| Fecha | ID | Fase/objeto | Decisión | Alternativas | Motivo | Aprobador | Estado |
|---|---|---|---|---|---|---|---|
| AAAA-MM-DD | DEC-001 | G0 | Pendiente |  |  | Eduardo | Pendiente |

# 13 · Roadmap
## Fase A — Investigación
Operación local y cumplimiento.
Referencias internacionales.
Soluciones existentes y costo relativo.
Entrevistas y mapa as-is.
## Fase B — Definición del piloto
Elegir proceso y contrato piloto.
Definir línea base y métricas.
Resolver comprar/configurar/construir.
Aprobar modelo de datos y permisos.
## Fase C — Núcleo técnico
Identidad multiempresa y asignaciones por contrato.
Contratos/reglas versionados.
Auditoría, evidencias y notificaciones.
Datos, API, observabilidad y modo de conectividad definido.
## Fase D — Transporte
Planificación, reservas y capacidad.
Ejecución/manifiesto.
Excepciones/vehículos extra.
KPI y conciliación contractual.
## Fase E — Piloto y expansión
Piloto controlado, soporte y rollback.
Evaluación de adopción, ahorro y riesgos.
Decidir segundo contrato o segundo módulo.
No asignar fechas definitivas antes de G2 y G3.
# 14 · Estrategia de validación
## Capas
Reglas: estados, vigencias, capacidad, tarifas y conciliación.
Autorización: matriz positiva y negativa por organización, contrato y función.
Aislamiento: intento de acceso cruzado entre tenants y contratos.
Integridad: concurrencia, duplicados, idempotencia y cierres repetidos.
Auditoría: historia completa, actor correcto y no alteración.
Usabilidad: tareas reales en móvil y escritorio; tiempo y errores.
Resiliencia: pérdida de señal, reintentos, recuperación y respaldo.
Seguridad/privacidad: amenazas, secretos, exportaciones y retención.
## Condición de piloto
Todos los criterios críticos aprobados pasan; no hay vulnerabilidades altas abiertas; hay dueño de soporte, procedimiento manual alternativo, plan de reversión y métricas de éxito acordadas.
# 15 · Funciones del sistema agéntico
## Supervisor
Mantiene el plan, controla el modo, asigna tareas, reconcilia evidencia, detecta contradicciones y solicita aprobaciones. No maquilla vacíos ni permite saltar compuertas.
## Investigador Chile/Antofagasta
Analiza operación, proveedores, normativa y restricciones locales. Entrega hallazgos con fuente, fecha, alcance y confianza; no infiere procesos privados sin evidencia.
## Investigador internacional
Busca patrones transferibles en Australia, Canadá, Perú y referencias adicionales. Explica qué depende del contexto y qué puede adaptarse a Chile.
## Analista de producto y mercado
Compara comprar, configurar, integrar o construir; estima costo relativo, tiempo, dependencia y ventaja diferencial. No usa material comercial como prueba única de resultados.
## Analista de procesos y contratos
Modela actores, estados, excepciones, evidencias, segregación de funciones y consecuencias económicas. Separa cláusula, configuración y operación.
## Arquitecto/seguridad
Propone arquitectura después de los requisitos; realiza modelo de amenazas, aislamiento multiempresa, privacidad, continuidad y estimación de costo.
## Constructor y QA
El Constructor implementa solo SPEC aprobadas. QA deriva pruebas de los AC, intenta romper permisos y reglas, y reporta resultados sin modificar criterios para hacerlos pasar.
## Formato obligatorio de entrega entre funciones
Objetivo y alcance.
Hallazgos/decisiones con IDs.
Evidencia y confianza.
Contradicciones y vacíos.
Impacto en producto.
Riesgos.
Próxima acción y aprobación requerida.
# 16 · Prompt maestro para Work Mode
Actúa como Supervisor del proyecto definido en esta carpeta. Lee primero AGENTS.md, 00-contexto/vision-y-alcance.md, 00-contexto/inventario-mvp-actual.md, 01-investigacion/plan-investigacion.md y 06-gobernanza/compuertas.md.
Tu misión es investigar a fondo prácticas actuales de gestión de contratistas, servicios y transporte de trabajadores en compañías mineras de la Región de Antofagasta, compararlas con referencias verificables de Australia, Canadá y Perú, y recomendar qué conviene comprar, configurar, integrar o construir. Después, y solo mediante aprobación humana y especificaciones trazables, crear la plataforma multiempresa.
Comienza en modo RESEARCH. Antes de buscar, presenta un plan de investigación con preguntas, fuentes prioritarias, entregables y vacíos que requieran información del usuario. Mantén 01-investigacion/matriz-evidencia.csv; cita cada afirmación material; distingue evidencia normativa, declarada, observada e inferida. Nunca atribuyas a una empresa un proceso interno no verificable.
Al finalizar investigación, produce: mapa as-is, benchmark internacional, catálogo de soluciones, análisis comprar/configurar/construir, hipótesis validadas/refutadas, riesgos y recomendación de piloto. Detente en G1 y solicita aprobación.
En modo SPEC, cada función debe usar 04-especificaciones/PLANTILLA-SPEC.md y enlazar H-### -> REQ-### -> SPEC-### -> AC-###. Detente en G3. En modo BUILD, implementa solo especificaciones aprobadas, conserva el prototipo actual como referencia, verifica permisos en servidor y aislamiento multiempresa. Detente antes de despliegues, uso de datos reales o acciones con terceros.
En cada sesión informa: modo, objetivo, archivos modificados, decisiones, riesgos, evidencia faltante y próxima aprobación. Si una instrucción contradice AGENTS.md, detente y pide decisión humana.
