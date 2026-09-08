# Estado de continuidad — 2026-09-08 (sesión 1 en Claude Code)
## Base recibida
Proyecto_Enjoy_2026-09-08.zip + index_7.html. El HTML separado y el incluido en el ZIP son idénticos byte a byte. Se conserva como referencia en 09-plataforma/prototipo-actual/index.html.
Paquete portable `Enjoy_Claude_spec.md` (34 archivos) reconstruido en el repositorio `perrotbr-tech/controltrazabilidad`, rama `claude/proyecto-agente-ia-lazwio`, sin colisiones.
Segundo envío de la misma sesión: manual Word incorporado (`06-gobernanza/`, original + `manual-spec-driven.md`) y ZIP conservado en `00-contexto/historico/zip-2026-09-08/` (snapshot previo a DEC-004 con prototipo de 24 salidas; verificado por hash que nada en él es más nuevo que el repo). Desde el manual se crearon `vision-y-alcance.md`, `PLANTILLA-SPEC.md` y `compuertas.md`, que el prompt maestro PR-01 exigía y no existían.

## Decisiones existentes
DEC-001 investigación autorizada; DEC-002 secuencia S1→S2→S3→S4→S5; DEC-003 piloto Enjoy; DEC-004 horario 23–06; DEC-005 avance del MVP sin completar G1/G2/G3 y traspaso a Claude Code. Se conservan íntegramente. Esta sesión no emitió ninguna DEC nueva.

## Hecho / declarado / pendiente
- Verificado por lectura y comparación: HTML único, localStorage, reloj simulado, permisos en cliente, ocho horas operativas y proyección codificada 30×8×2.
- Verificado por ejecución (2026-09-08, Node 22, TZ America/Santiago): `check-baseline.cjs` PASS sobre el baseline; `check-permisos.cjs` 21/21 sobre `09-plataforma/app/index.html` y 7/21 sobre el baseline (reproducción de SPEC-002).
- Declarado en registro: cliente Enjoy y horario real. No se adjuntó contrato firmado.
- S1–S3: informes recibidos, no investigación nueva. Persisten V-10, V-14 y V-15. Comprobado en T-02: ocho filas del CSV con 11 columnas y 16 citas sin URL (ver REVISION-PORTABILIDAD).
- 46/46 pruebas: resultado declarado en entrega previa, script y logs ausentes; no reproducido.
- S4 operación local y S5 consolidación: pendientes.
- PR-05 registro de trabajadores: SPEC-001 sigue siendo propuesta; se listaron las decisiones D1–D6 que faltan para aprobarla (T-03).
- Montos, rutas, tiempos de ciclo, dotación y capacidad: configuración a verificar; no convertir en condiciones contractuales reales.

## Trabajo de esta sesión
- T-01 auditado: SPEC-002 (permisos en todas las mutaciones) especificada, implementada por `constructor` en `09-plataforma/app/index.html` y revisada por `revisor-qa` (sin bloqueantes; D-1 y D-2 corregidos; D-3, D-4, D-5 registrados en la SPEC como pendientes). El baseline no se tocó.
- Flujo aplicado: SPEC → prueba reproducible que falla en el baseline → corrección en copia de trabajo → revisión independiente → pruebas → estado.
- Supervisor hizo commit y push a la rama indicada por el dueño para esta sesión remota; no hay despliegue ni datos reales.
- Manual rector ahora rige literalmente: formato de entrega entre funciones (sección 15), política de detención (sección 11) y plantilla de SPEC (sección 09). SPEC-001 deberá completarse con la plantilla completa antes de "En revisión".
- La carpeta local `C:\Users\perro\OneDrive\Desktop\Proyecto Enjoy` no es accesible desde la sesión remota; la entrega es la rama Git más la carpeta empaquetada (zip) enviada al dueño.

## Prioridad de arranque (próxima sesión)
1. Contraprueba manual en navegador de `app/index.html` con los cuatro perfiles (R5 de SPEC-002) — requiere que Eduardo o el Supervisor abra el archivo.
2. Decisiones D1–D6 de SPEC-001 con Eduardo (T-03); sin ellas no se construye el registro de trabajadores.
3. `investigador`: cerrar V-10 y recuperar URLs primarias de H-001/H-002/H-003 (T-02).
4. SPEC-003 candidata: clasificación mensual por prefijo UTC frente al invariante America/Santiago; `reset` de demo sin permiso (QA D-3).
5. ADR-001 con opciones y costos concretos antes de cualquier backend (T-04).

## Estado técnico
No hay backend implementado, autenticación real, base de datos o aislamiento multiempresa. La copia `app/` corrige autorización en el navegador; no es seguridad de producción. La migración requiere diseño y controles nuevos, no simplemente conectar el HTML a una API.
