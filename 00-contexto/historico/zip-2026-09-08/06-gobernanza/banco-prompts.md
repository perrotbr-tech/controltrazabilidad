# Banco de prompts — Proyecto Enjoy · Trazabilidad de Transporte

Registro de los prompts que produjeron cada etapa. Sirven para reproducir, auditar y reutilizar el proceso con el agente. Cada entrada indica: fecha, etapa, resultado producido y el texto (íntegro o resumido con su archivo fuente).

---

## PR-01 · Prompt maestro para Work Mode (Supervisor)
**Fecha:** 2026-09-08 · **Etapa:** arranque del sistema agéntico · **Origen:** `Sistema_Agentico_Mineria_SpecDriven.docx`, sección 16
**Resultado:** estructura de carpetas, registro de gobernanza, plan de investigación, G0.

> Actúa como Supervisor del proyecto definido en esta carpeta. Lee primero AGENTS.md, 00-contexto/vision-y-alcance.md, 00-contexto/inventario-mvp-actual.md, 01-investigacion/plan-investigacion.md y 06-gobernanza/compuertas.md.
> Tu misión es investigar a fondo prácticas actuales de gestión de contratistas, servicios y transporte de trabajadores en compañías mineras de la Región de Antofagasta, compararlas con referencias verificables de Australia, Canadá y Perú, y recomendar qué conviene comprar, configurar, integrar o construir. Después, y solo mediante aprobación humana y especificaciones trazables, crear la plataforma multiempresa.
> Comienza en modo RESEARCH. Antes de buscar, presenta un plan de investigación con preguntas, fuentes prioritarias, entregables y vacíos que requieran información del usuario. Mantén 01-investigacion/matriz-evidencia.csv; cita cada afirmación material; distingue evidencia normativa, declarada, observada e inferida. Nunca atribuyas a una empresa un proceso interno no verificable.
> Al finalizar investigación, produce: mapa as-is, benchmark internacional, catálogo de soluciones, análisis comprar/configurar/construir, hipótesis validadas/refutadas, riesgos y recomendación de piloto. Detente en G1 y solicita aprobación.
> En modo SPEC, cada función debe usar 04-especificaciones/PLANTILLA-SPEC.md y enlazar H-### -> REQ-### -> SPEC-### -> AC-###. Detente en G3. En modo BUILD, implementa solo especificaciones aprobadas, conserva el prototipo actual como referencia, verifica permisos en servidor y aislamiento multiempresa. Detente antes de despliegues, uso de datos reales o acciones con terceros.
> En cada sesión informa: modo, objetivo, archivos modificados, decisiones, riesgos, evidencia faltante y próxima aprobación. Si una instrucción contradice AGENTS.md, detente y pide decisión humana.

**Modos:** RESEARCH (predeterminado) · DISCOVERY · SPEC · BUILD · VERIFY. Un cambio de modo requiere registro en `06-gobernanza/registro-aprobaciones.md`.

---

## PR-02 · Modelo contractual y de pagos (prompt ajustado)
**Fecha:** sesión previa · **Etapa:** prototipo v1 · **Archivo:** `Prompt_Ajustado_Plataforma_Transporte.md`
**Resultado:** MVP v1 con contrato, indicadores con fórmulas, flujo de vehículo adicional con estados, conciliación con correlativo CT-AAAA-NN, 16 pruebas de aceptación.
**Principio rector (reutilizable en cualquier contrato de servicio):** el pago base no se calcula por unidad de uso; la plataforma traza, mide eficiencia y respalda extras — no determina cuánto se paga.

---

## PR-03 · Segunda iteración del MVP (experiencia móvil y reglas)
**Fecha:** sesión previa · **Etapa:** prototipo v2
**Resultado:** contraste/modo oscuro corregido, identidad desde sesión, capacidad con lista de espera (11 solicitudes · 8 confirmadas · 3 en espera → 12 al autorizar), justificación automática del extra, jornada nocturna con fecha-hora completa, acumulado vs proyección, navegación móvil, 10 pruebas obligatorias.
**Texto:** documento pegado en conversación — "Revisa el MVP existente de 'Trazabilidad de Transporte' y realiza una segunda iteración…" (11 puntos). Conservar el original en esta carpeta como `PR-03-iteracion-2.txt`.

---

## PR-04 · Sistema de roles (perfil automático al iniciar sesión)
**Fecha:** sesión previa · **Etapa:** prototipo v2
**Resultado:** login, users/organizations/role_assignments, requirePermission(permiso, recurso), rutas por rol, cambio de contexto solo entre roles autorizados, auditoría de accesos denegados, modo demostración marcado.
**Texto:** documento pegado en conversación — "Corrige el sistema de roles de 'Trazabilidad de Transporte'…" (10 puntos). Conservar como `PR-04-roles.txt`.
**Salvedad registrada:** la validación de servidor no existe en un HTML autónomo; el prototipo centraliza la autorización para que la migración a backend sea conectar, no rediseñar.

---

## PR-05 · Definición de la cadena Usuario → Transportista → Mandante
**Fecha:** sesión previa · **Etapa:** pendiente (no ejecutada — desplazada por el manual spec-driven)
**Texto del dueño:** "En el módulo Usuario la persona registra su nombre de usuario, ingresa y ahí puede ver los horarios del transporte. Luego el transportista tiene acceso porque va a estar entrelazado a la solicitud que hizo el usuario, y el mandante tiene acceso sobre todo esto."
**Estado:** registrado como necesidad en `00-contexto/inventario-mvp-actual.md`; se especificará bajo SPEC tras G3.

---

## PR-06 · Propuesta de ruta (Enjoy → Antofagasta → Enjoy)
**Fecha:** sesión previa · **Etapa:** diseño operativo
**Texto del dueño:** "El cliente es el Hotel Enjoy. Desde ahí a toda Antofagasta: una ruta con puntos de referencia establecidos donde se recogen y dejan pasajeros, a tal horario, calculando que los vehículos salen del Enjoy y regresan. La ruta se divide por van: 2 vans a tales puntos y 2 a tales puntos."
**Resultado:** Ruta Norte (6 paradas, ciclo ~50 min) y Ruta Sur (3 paradas, ciclo ~30 min), 2 vans cada una, salidas cada hora desde las 23:00; puntos verificados con coordenadas. **Pendiente:** listado de domicilios del personal para fundamentar los puntos de acercamiento por densidad real.

---

## Convención para nuevos prompts
`PR-## · título · fecha · etapa · resultado · texto o archivo`. Los prompts que cambian alcance, dinero, acceso o datos personales se vinculan además a la decisión DEC-### del registro de aprobaciones.
