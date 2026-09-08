# Proyecto Enjoy — instrucciones para Claude Code
Idioma de trabajo: español. Dueño: Eduardo Perrot.

## Leer al iniciar
1. `00-contexto/ESTADO-ACTUAL.md`
2. `06-gobernanza/registro-aprobaciones.md`
3. `07-backlog/tareas.md`
4. `06-gobernanza/traspaso-claude-code.md`
Luego cargar solo las fuentes y especificaciones de la tarea activa.

## Autoridad y alcance
Las instrucciones actuales de Eduardo prevalecen. Conservar DEC-001…DEC-005; no inventar aprobaciones. DEC-005 autoriza el avance del MVP y el traspaso: no reiniciar G0 ni bloquear correcciones del prototipo por G1/G2/G3. Backend real, nuevos módulos, integración comercial, datos reales y producción necesitan la decisión específica que falta según el traspaso recibido. Preparar diseño y alternativas antes de pedirla. Nunca autoaprobar.
El piloto es transporte del Hotel Enjoy Antofagasta; minería es expansión posterior. No incorporar normativa minera al hotel por analogía.

## Invariantes
- Fijo contractual separado del uso y extras; ningún KPI genera descuentos o pagos automáticos.
- Horarios declarados: 23:00–06:00 inclusive, ocho salidas/ruta/noche; usar America/Santiago, no el huso de la computadora.
- Dos rutas y cuatro vans de cuatro plazas son configuración del prototipo; rutas, tarifas, domicilios y montos necesitan respaldo del cliente.
- Usuario nunca se autoasigna privilegios. Acceso por organización, contrato, rol, recurso y titularidad; ocultar pestañas no protege datos.
- Reserva confirmada no equivale a abordaje real. Evidencia y autorización son registros diferentes.
- No almacenar secretos ni datos personales reales en Git; no seguimiento continuo del trabajador.

## Flujo spec-driven ligero
Antes de cada cambio redactar/actualizar SPEC breve: problema, origen (DEC/PR/H), alcance, reglas, AC verificables, tareas y pruebas. Para correcciones ya autorizadas informar y ejecutar; para ampliaciones presentar decisión concreta. Mantener H → REQ → SPEC → AC → prueba → tarea. No convertir referencias históricas en hechos revalidados.

## Delegación
La sesión principal actúa como Supervisor. Hay cinco especialistas en `.claude/agents/`. Pasar tarea, archivos, alcance autorizado y resultado esperado a cada uno; no asumir que heredan la conversación. Máximo dos especialistas simultáneos, sin delegación recursiva. Investigación/revisión pueden coincidir; un solo escritor de código por archivo. Supervisor integra, actualiza estado y comunica. Los límites en Markdown son instrucciones; no sustituyen permisos de herramientas ni controles de aplicación.

## Verificación y continuidad
Comprobación acotada: `node scripts/check-baseline.cjs`. No equivale a pruebas E2E o de seguridad. Las 46/46 pruebas históricas no vienen en el ZIP; no repetir esa afirmación como verificación propia.
Mantener referencia HTML intacta; trabajar en `09-plataforma/app/` cuando una tarea de construcción esté autorizada. Inspeccionar repositorio y cambios locales antes de editar; no sobrescribir trabajo del usuario. No desplegar ni hacer push como parte de una corrección local.
Al cerrar: objetivo, archivos, pruebas realmente corridas, riesgos, tarea siguiente y decisión pendiente en ESTADO-ACTUAL y registro de sesiones. No guardar cadenas de razonamiento ni credenciales.
