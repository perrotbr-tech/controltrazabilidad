# Traspaso a Claude Code — Proyecto Enjoy (Trazabilidad de Transporte)

**De:** sesión de trabajo en Claude (chat) · **Para:** continuación en Claude Code
**Fecha:** 2026-09-08 · **Estado:** MVP funcional ajustado a datos reales; investigación de fondo en curso (RESEARCH, S1–S3 cerradas)

Este documento es autosuficiente: léelo antes de tocar cualquier archivo. Le sigue fielmente el proceso spec-driven definido en `Sistema_Agentico_Mineria_SpecDriven.docx` (debe estar en esta misma carpeta) — no lo repitas, pero **respétalo**.

---

## 1. Qué es este proyecto

Plataforma de trazabilidad y control contractual de transporte de personal. Cliente identificado: **Hotel Enjoy Antofagasta** (mandante), que contrata a una empresa de transporte (contratista) para trasladar a su personal en vans de 4 cupos entre el hotel y distintos puntos de la ciudad.

**Principio que gobierna todo el diseño** (no negociable sin decisión registrada): el pago base del contrato es fijo y no se calcula por pasajero, ocupación o abordaje. La plataforma **traza, mide eficiencia y respalda extras — no determina cuánto se paga**. Un vehículo adicional exige causal, autorización del mandante y evidencia; sin eso no se concilia.

**Visión de producto más amplia** (declarada en el manual, validada parcialmente por investigación): núcleo genérico + capa de configuración por contrato, extensible a otros servicios (alimentación, aseo, alojamiento) y a otros mandantes, incluida minería como mercado de expansión — pero **el piloto es transporte, Enjoy, y nada más hasta que el piloto valide**.

## 2. Dónde está cada cosa (estructura de carpeta)

```
00-contexto/            inventario del MVP, hipótesis a validar
01-investigacion/       plan + hallazgos S1 (cumplimiento), S2 (soluciones), S3 (internacional),
                         matriz-evidencia.csv (15 hallazgos H-001…H-015), hipotesis.md
04-especificaciones/    prompt ajustado del modelo contractual v1 (referencia, no spec formal aún)
06-gobernanza/          registro-aprobaciones.md (TODAS las decisiones DEC-###, con fecha y aprobador),
                         banco-prompts.md (prompts que produjeron cada etapa), este archivo
09-plataforma/prototipo-actual/index.html   el MVP — HTML autónomo, sin build, sin dependencias
```

**Regla de oro:** antes de escribir código, lee `06-gobernanza/registro-aprobaciones.md` completo. Cada decisión ahí (DEC-001 a DEC-005) es vinculante hasta que una nueva decisión la reemplace explícitamente.

## 3. Lo que la investigación ya estableció (no reabrir sin evidencia nueva)

Fuente: `01-investigacion/matriz-evidencia.csv` y los tres informes S1-S3.

- **H-001 · Ley 21.719** (protección de datos) entra en vigencia plena el 1 de diciembre de 2026, multa hasta 20.000 UTM. La plataforma registra desplazamientos de personas identificadas → requiere base de licitud, retención definida, derechos del titular. **Límite de producto ya decidido: registrar eventos de servicio, no rastrear personas en continuo** (sin geocercas, sin tracking en vivo del trabajador).
- **H-002/H-003 · DS 212 (TTEPRIV)**: el transporte de personal es transporte remunerado de pasajeros; cada vehículo se inscribe individualmente; para servicios continuos a una empresa determinada, el contrato es el documento habilitante ante la autoridad. → **Un vehículo adicional debería validar habilitación (patente + inscripción vigente), no solo registrarla como texto libre** — el prototipo actual no lo valida todavía; es la brecha #1 a especificar.
- **H-004/H-005/H-006 · Ley 20.123 (subcontratación)**: el mandante es solidariamente responsable, debe mantener nómina de contratistas y vigilar higiene/seguridad. Abre una oportunidad (acreditación de contratistas) que **H-009 cierra**: ese terreno lo domina Codelco (Sucal) y verificadores regulados — **no construir ahí, integrar como mucho**.
- **H-008 · Competencia directa**: AllRide ya opera en Chile/Perú/México con reserva, lista de espera, refuerzos por sobredemanda y reportes — la capa de reserva/operación **es un commodity, no un diferenciador**.
- **H-014 · Patrón de mercados maduros** (Australia/Canadá): la propuesta de valor de los líderes es "audit-ready records" — evidencia respaldada, no la reserva. **Confirma tres veces desde ángulos distintos (norma, competencia, benchmark) que el diferenciador es la capa contractual-económica con evidencia, no el motor de reservas.**
- **HIP-06 (hipótesis, no hecho)**: existe un segmento medio — mandantes no mineros, contratistas medianos — sin oferta identificada entre AllRide (operación) y Quartex (suite enterprise minera). El Enjoy es el primer caso de prueba de esa hipótesis.
- **Vacío crítico abierto: V-10** — no se sabe si AllRide ya cubre conciliación económica (fijo + extras respaldados). Mientras no se cierre, no asumas que la capa contractual es un diferenciador garantizado.

**Instrucción para ti (Claude Code):** si tomas una decisión de arquitectura que depende de un hallazgo de esta lista, cítalo por su ID (H-### o HIP-##). Si necesitas evidencia que no está aquí, decláralo como vacío nuevo (V-##) en el registro, no lo asumas.

## 4. Estado exacto del MVP (`09-plataforma/prototipo-actual/index.html`)

Un solo archivo HTML/CSS/JS, sin dependencias externas, corre abriendo el archivo en el navegador. Usa `localStorage` (clave `trazabilidad_v2`) — **no hay backend, no hay base de datos real**. Reloj simulado: `const AHORA = new Date('2026-09-15T18:30:00')`.

**Ajuste recién aplicado (instrucción directa del dueño, DEC-004):** la ventana operativa real del Enjoy es **1 salida por hora desde las 23:00 hasta las 06:00 — 8 salidas por ruta por noche**, no 24 como tenía la versión anterior. Ya corregido en: generación de servicios, perfil de demanda, casos de prueba sembrados, texto del contrato visible, y cálculo de proyección mensual (8 × 2 rutas × 30 días = 480 servicios/mes, no 1.440).

**Roles y acceso:** login por cuenta (sin selector público), `users` / `organizations` / `role_assignments`, permisos centralizados en `requirePermission(permiso, recurso)`. **Advertencia explícita dentro de la propia app**: la autorización corre en el navegador; es la arquitectura completa para que conectar un backend real sea "enchufar", no rediseñar — no es seguridad de producción.

**Capacidades funcionando y verificadas por prueba automatizada (46/46, `node` + `jsdom`, script no incluido en el entregable — reconstruir si se necesita):**
- Reserva con lista de espera visible ("N solicitudes · M confirmadas · K en espera"), nunca falsos "confirmados".
- Vehículo adicional: solicitud con nivel de justificación automático (cuantitativa/operacional/no requerido), autorización del mandante, evidencia (patente, salida, manifiesto), estados con transiciones controladas (Rechazado y Conciliado son terminales; Observado solo concilia si se subsana o se excluye con motivo).
- Al autorizar un extra, la capacidad de la salida sube y los de lista de espera se confirman automáticamente — con el salto de capacidad registrado en auditoría.
- Jornada nocturna con fecha-hora completa (23:00 del día N y 00:00–06:00 del día N+1 son la misma "jornada").
- Panel del mandante: acumulado a la fecha vs proyección mensual, separados explícitamente; el "costo de capacidad no utilizada" está renombrado a "valor teórico asignado" con su advertencia de que no es ahorro recuperable.
- Conciliación mensual con documento correlativo (`CT-2026-NN`), bloqueada mientras existan extras "Observados" sin resolver.
- Auditoría de toda acción y de todo acceso denegado, con usuario, rol, fecha y valor anterior.
- Contraste corregido (`color-scheme: light only` forzado — no se invierte con el modo oscuro del teléfono), navegación móvil horizontal, probado a 390px.

**Brechas conocidas y ya declaradas (no las redescubras, decide qué hacer con ellas):**
1. La evidencia de un vehículo extra no valida habilitación real (TTEPRIV, revisión técnica) — solo checkboxes. Ligado a H-002/H-011.
2. Registro de usuarios: hoy la app arranca con una semilla de cuentas ficticias (Camila, Rodrigo, Patricia…) que el usuario "elige" para entrar. **Existe una instrucción pendiente y no ejecutada del dueño**: el trabajador debe poder registrarse él mismo, ver horarios, reservar; el transportista ve esas reservas entrelazadas; el mandante ve todo. Quedó registrada en el banco de prompts como PR-05, desplazada por la entrada al proceso spec-driven. **Es candidata natural a primera especificación formal.**
3. Ruta: dos rutas propuestas por el Supervisor (Norte 6 paradas/ciclo ~50min, Sur 3 paradas/ciclo ~30min, 2 vans cada una) sobre puntos reales de Antofagasta verificados por mapa, pero **sin fundamento en datos reales de domicilio del personal** — el dueño planea cargar un listado para fundamentarla (ver banco de prompts PR-06).
4. Sin backend, sin API, sin multiempresa real, sin versionado de contrato, sin auditoría inmutable, sin modelo de privacidad/retención — todo listado en `00-contexto/inventario-mvp-actual.md`.

## 5. Reglas de proceso que debes seguir (resumen operativo del manual)

- **No reconstruyas desde cero.** El HTML actual es la referencia de lenguaje, flujo y experiencia — conserva sus decisiones de UX salvo que una especificación aprobada diga lo contrario.
- **Modo por defecto: no es BUILD libre.** El manual exige compuertas (G0 alcance, G1 investigación, G2 producto, G3 especificación, antes de construir en serio). **Ya se saltaron formalmente por instrucción directa del dueño (DEC-005)** para llegar a este MVP — pero de aquí en adelante, cualquier expansión mayor (backend real, nuevo módulo, integración con AllRide u otro tercero, uso de datos personales reales) debería volver a pasar por una compuerta, aunque sea abreviada. Si el dueño te pide saltarla de nuevo, regístralo igual que se hizo aquí — no lo ejecutes en silencio.
- **Ninguna afirmación material sin fuente.** Si necesitas un dato que no está en `01-investigacion/`, o lo buscas y lo citas, o lo declaras como vacío (V-##) y avanzas con supuesto explícito.
- **Toda decisión de alcance, dinero, acceso o datos personales se registra** en `06-gobernanza/registro-aprobaciones.md` con fecha, alternativas consideradas y aprobador — el dueño (Eduardo), no tú.
- **Revisión de estructura obligatoria** en cada entrega: paginación/render correcto, sin `undefined`/`NaN`, contraste correcto, navegación sin cortes — es una regla transversal del dueño, no solo de este proyecto.
- **Contraprueba antes de cerrar**: perfiles diversos, carga alta, valores límite, entradas dañadas — no basta con que el archivo esté bien formado.
- **Al cerrar cada etapa importante**, empaqueta la carpeta completa del proyecto (zip) para que el dueño la descomprima en `C:\\Users\\perro\\OneDrive\\Desktop\\Proyecto Enjoy` — tú, en Claude Code, probablemente puedas escribir directo ahí; confírmalo con el dueño antes de asumirlo.

## 6. Qué sigue (propuesta, no mandato — decide con el dueño)

En orden de valor esperado, según lo investigado:
1. **Cerrar V-10** (¿AllRide cubre conciliación económica?) antes de invertir más en construir esa capa — puede cambiar la decisión de comprar/configurar/construir.
2. **Especificar y construir el registro real de usuarios** (PR-05) — es la brecha #2, tiene instrucción explícita del dueño, y es requisito para cualquier demostración real al Enjoy.
3. **Fundamentar la ruta** con el listado de domicilios cuando el dueño lo entregue (PR-06).
4. Si se decide avanzar a producción: backend real, autorización de servidor genuina, y el modelo de datos personales conforme a la Ley 21.719 — **antes del 1 de diciembre de 2026**.

## 7. Prompts que produjeron todo esto

Ver `06-gobernanza/banco-prompts.md` — PR-01 (prompt maestro del sistema agéntico) a PR-06 (propuesta de ruta), con su fecha, resultado y texto o archivo fuente. Sigue su convención para registrar los tuyos.
