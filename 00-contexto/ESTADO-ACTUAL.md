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

## Respuestas del dueño (2026-09-08, tarde)
- Contraprueba manual de SPEC-002: **OK** → SPEC-002 Verificada; `app/index.html` es la copia de trabajo vigente.
- DEC-006: el conductor lo controla el contratista; no es usuario de la plataforma (SPEC-001 D5 resuelta).
- DEC-007: V-10 autorizado → S2b ejecutado: **parcialmente cerrado** (H-016…H-021). AllRide declara conciliación de lo ejecutado; no se halló fijo/extras con causal, autorización y cierre reproducible. Diferenciador estrechado, no refutado.
- Rama: sin pull request; el remoto no tiene rama principal, esta rama es el tronco.
- Dato nuevo **V-16**: "24 viajes, 4 vans, cerca de 15 pasajeros" contradice la configuración del prototipo (4 cupos/van, 16 salidas). SPEC-003 en borrador con preguntas Q1–Q5; **el prototipo no se toca hasta precisar**.

## Respuestas Q1–Q5 y SPEC-003 (2026-09-08, cierre de sesión)
- DEC-008: capacidad 15–17 por van (15 garantizados, configurable), salidas cada hora 23–06 en ambos sentidos, 2 rutas con puntos por definir, 2 vans extra completas a disposición con cobro por van, planilla de trabajadores (a anonimizar).
- SPEC-003 implementada en `app/` (constructor), revisada (revisor-qa, sin bloqueantes), correcciones QA aplicadas: clave `trazabilidad_v3`, semilla coherente, R6 estricta. Pruebas: check-config 15/15, check-permisos 21/21, baseline PASS.
- Nuevas tareas: T-11 SPEC-004 reserva por sentido y puntos (depende de la planilla anonimizada, plantilla en `02-descubrimiento/`); T-12 maestro de vehículos con capacidad real por patente y habilitación TTEPRIV.
- Cifra "24 viajes" sigue sin reconciliar; se revisará con la planilla.

- Contraprueba de SPEC-003: el dueño no pudo abrir el archivo (GitHub muestra el código). El Supervisor ejecutó una contraprueba E2E en Chromium real (12/12, `scripts/e2e-contraprueba.js`, capturas en `08-validacion/capturas-e2e/`) y publicó la app como página privada para que el dueño la recorra desde el navegador. Cómo abrir localmente: descomprimir el zip y hacer doble clic en `09-plataforma/app/index.html`; en GitHub, el botón "Raw" o "Download" descarga el archivo.

## Cierre de etapa parcial (2026-09-08, final)
Ver `06-gobernanza/cierre-etapa-1.md`. Nuevas decisiones: DEC-009 extra ex post (madrugada sin autorizador; solicitud al día siguiente), DEC-010 SPEC-001 D1–D6 aprobadas, DEC-011 contacto AllRide autorizado. Evidencia nueva H-022: horario real del contratista 00:15, 01:35, 02:35, 03:35, 04:35, 05:35, 06:45 (7 salidas, no "cada hora en punto"); no aplicado aún a la semilla.

## Prioridad de arranque (próxima sesión)
0. Leer `06-gobernanza/cierre-etapa-1.md` y seguir su orden: SPEC-003b (H-022), SPEC-005 (DEC-009), SPEC-004 (planilla), SPEC-001 completa, V-10, ADR-001.
1. Observaciones del dueño tras la demo.
2. Planilla de trabajadores **anonimizada** según `02-descubrimiento/LEEME-planilla.md` → SPEC-004 (puntos de bajada y encuentro, reserva por sentido).
3. Decisiones D1–D4 y D6 de SPEC-001 (basta un "sí" a las opciones sugeridas o corregirlas).
4. Autorización para demo o contacto con AllRide (cierre total de V-10); PDF fechado de sus páginas.
5. Decisión de diseño: ¿tope de 2 vans extra por jornada o por solicitud? (hoy por solicitud).
6. T-10 huso horario; T-02 URLs primarias H-001/H-002/H-003; ADR-001 antes de cualquier backend.

## Estado técnico
No hay backend implementado, autenticación real, base de datos o aislamiento multiempresa. La copia `app/` corrige autorización en el navegador; no es seguridad de producción. La migración requiere diseño y controles nuevos, no simplemente conectar el HTML a una API.
