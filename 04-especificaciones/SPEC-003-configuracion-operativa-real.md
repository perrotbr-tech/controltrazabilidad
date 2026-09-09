# SPEC-003 — Configuración operativa real del Enjoy (vans, capacidad, extras)
Estado (PLANTILLA-SPEC): **Parcialmente superada (2026-09-09, DEC-022).** Capacidad/extras (DEC-008/012/013) siguen vigentes como parámetros; **horarios, cantidad de salidas y proyección fija quedan supersedidos por SPEC-003b + DEC-022**. Propietario humano: Eduardo Perrot.
Origen: declaraciones del dueño 2026-09-08 (V-16 y respuestas Q1–Q5) · DEC-004 · DEC-022 · invariante CLAUDE.md sobre configuración a respaldar por el cliente.

## Nota de supersesión (DEC-022)
- **Vigente desde SPEC-003b:** 7 salidas con minutos H-022 (00:15…06:45), proyección **calculada** = días × salidasPorJornada × rutas (referencial demo 30×7×2=420, no regla fija).
- **Dejan de ser AC/REQ obligatorios de esta SPEC:** AC-04 (8 salidas 23:00–06:00) y REQ-013 (8×2×30=480).
- **Siguen vigentes:** capacidadVan referencial 15, vansExtraDisponibles/tope jornada 2 (DEC-013/025), cobro por van, REQ-010/011/012, AC de capacidad/extras no horarios.
- Toda cifra de salidas/proyección debe leerse desde **configuración de jornada**, nunca hardcodeada como invariante del sistema.

## 1. Problema y resultado
El prototipo codifica vans de 4 cupos, extra de +4 y una demanda sembrada de 3 a 13 personas por salida. El dueño declara vans de 15 a 17 pasajeros, dos vans adicionales completas a disposición y cobro por van. Con la capacidad real, la lista de espera y los casos de prueba actuales no representan la operación. Resultado: `app/` con la configuración real declarada, sin cambiar reglas contractuales, fórmulas ni permisos.

## 2. Evidencia (declarada por el dueño, 2026-09-08; sin documento contractual aún, V-05)
| Dato | Valor declarado | Lectura del Supervisor |
|---|---|---|
| Capacidad por van | entre 15 y 17 pasajeros por salida | Se usa **15 como cupo garantizado** por salida; la capacidad exacta por vehículo pasará al maestro de vehículos (T-08, H-002). Configurable |
| Ventana | 23:00 a 06:00, una salida cada hora | Confirma DEC-004: 8 salidas por ruta por noche |
| Sentido | del hotel a las casas y de las casas al hotel | Cada ciclo horario tiene ida y vuelta. **El modelo de reserva por sentido queda para SPEC-004**, porque depende de los puntos |
| Rutas y puntos | siguen las 2 rutas; hay que definir dónde se bajan (ida) y dónde se les encuentra (vuelta) | Puntos actuales son propuesta del Supervisor sin respaldo (PR-06); se definirán con la planilla de trabajadores anonimizada |
| Extras | 2 vans que quedan a disposición completas; se cobra por van, no por pasajero | `vansExtraDisponibles = 2`; un extra siempre es una van completa; tarifa por van (ya así) |
| "24 viajes de 4 vans" (mensaje anterior) | no reconciliado con 8 salidas × 2 rutas = 16 salidas | Se conserva como nota; no se usa en la semilla. Puede corresponder a viajes de ida y vuelta contados por separado. Pendiente de la planilla |
| Planilla | con datos de trabajadores, no del prestador | Debe entregarse **anonimizada** (sin nombre, RUT, teléfono ni dirección exacta): Ley 21.719 (H-001) y regla CLAUDE.md "no datos personales reales en Git". Plantilla en `02-descubrimiento/plantilla-planilla-trabajadores.csv` |

## 3. Alcance
Incluido (solo `09-plataforma/app/index.html` y un script nuevo de prueba):
- Contrato: `capacidadVan: 15`, `vansExtraDisponibles: 2`, textos de `tiposVehiculo`, `horarios`, `frecuencias` y una línea de sentido ida/vuelta; `requisitosExtra` sin cambio.
- Semilla: capacidad base de cada salida = `R.vans * contrato.capacidadVan` (hoy `R.vans*4`); perfil de demanda reescalado para que existan salidas con lista de espera y salidas con capacidad disponible; los tres casos sembrados (extra #1 cuantitativo utilizado, #2 operacional observado, #3 rechazado) conservan su lógica con las cifras nuevas.
- Solicitud de extra: capacidad propuesta y textos usan `contrato.capacidadVan` (hoy "+4 (1 van)" fijo); el selector de vans ofrece de 1 a `vansExtraDisponibles`; `creaSolicitud` rechaza más vans que las disponibles.
- Vista Contrato: muestra capacidad por van, vans base, vans extra disponibles y cobro por van.
Excluido: reserva por sentido y puntos de bajada/encuentro (SPEC-004), maestro de vehículos con capacidad 15–17 por patente (T-08), fórmulas, estados, permisos, conciliación, baseline `prototipo-actual/`.

## 4. Requisitos
- REQ-010 Capacidad por van, vans por ruta, vans extra disponibles y salidas por noche son parámetros del contrato; ninguna constante numérica de capacidad queda dispersa en semilla o textos.
- REQ-011 Los casos sembrados se regeneran en proporción a la capacidad real y siguen demostrando lista de espera, extra autorizado, extra observado y extra rechazado.
- REQ-012 Un extra es siempre una van completa, con tarifa por van; no puede solicitarse más vans que `vansExtraDisponibles`.
- REQ-013 ~~La proyección mensual sigue siendo 8 × 2 × 30 (DEC-004)~~ **DEROGADO por DEC-022 / SPEC-003b**: la proyección se calcula desde la configuración vigente (`días × salidasPorJornada × rutas`).

## 5. Reglas de negocio
Sin cambio: fijo separado del uso; extra con causal, autorización y evidencia; observado no concilia sin subsanar o excluir. Regla nueva R6: `vans` de una solicitud ∈ [1, `vansExtraDisponibles`].

## 8. Criterios de aceptación (`node scripts/check-config.cjs`, sobre `app/`)
- AC-01 `contrato.capacidadVan === 15` y `contrato.vansExtraDisponibles === 2`.
- AC-02 Toda salida sembrada tiene `capacidadBase === vans_de_su_ruta × 15` (30 en ambas rutas).
- AC-03 Existe al menos una salida sembrada con lista de espera (solicitudes > 30) y al menos una con capacidad disponible.
- AC-04 Sigue habiendo 8 salidas por jornada y ruta, todas entre 23:00 y 06:00.
- AC-05 Extra #1 sembrado: `capacidadExtra === 15`, estado Utilizado, respaldado; extra #3: Rechazado con demanda ≤ 30.
- AC-06 `creaSolicitud` con 3 vans es rechazada (no crea extra); con 2 vans crea extra con `capacidadExtra === 30` y `tarifa === 2 × tarifaExtra`.
- AC-07 Al autorizar un extra de 1 van sobre una salida con 38 solicitudes, la capacidad pasa de 30 a 45 y la lista de espera queda en 0.
- AC-08 Ningún texto del HTML de `app/` contiene "4 cupos", "+4 cupos" ni "+4 (1 van)".
- AC-09 `check-permisos.cjs` sigue 21/21 sobre `app/`; `check-baseline.cjs` sigue PASS sobre el baseline intacto.

## 11. Riesgos y decisiones abiertas
- Capacidad 15 vs 17: usar 15 puede mostrar lista de espera donde en la práctica cabían 2 personas más. Se resuelve con el maestro de vehículos (T-08).
- "24 viajes" sin reconciliar: no afecta esta SPEC; se revisa con la planilla.
- Ida y vuelta (SPEC-004) cambia el modelo de reserva; hasta entonces la app sigue mostrando solo la salida desde el hotel.
- Planilla con datos personales: **no subir al repositorio sin anonimizar**.

## Resultado (2026-09-08)
- Implementada por `constructor` en `app/index.html`; revisada por `revisor-qa`: **sin defectos bloqueantes**. Corregidos por el Supervisor en la misma sesión: D-1 clave de `localStorage` versionada a `trazabilidad_v3` y `cargar()` rechaza estados sin la configuración nueva (AC-14); D-2 la salida del extra #1 sembrado tiene capacidad ampliada y auditoría coherente (AC-11); D-3 la semilla no reutiliza el userId de Camila (AC-12); D-4 R6 exige entero (AC-13); D-7 comentario de proyección (AC-15). AC-10 añadido para el extra #2 (REQ-011).
- Registrados sin corregir: D-5 constantes "15–17" en textos del contrato (se resuelve con el maestro de vehículos, T-12); D-6 la fila "Capacidad propuesta" del modal no cambia al elegir 2 vans; D-8 rama muerta del perfil de demanda; R6 limita por solicitud, no por jornada (decisión de diseño pendiente: ¿tope de 2 vans por jornada?).
- Pruebas: `check-config.cjs` 15/15, `check-permisos.cjs` 21/21, `check-baseline.cjs` PASS, baseline intacto.
- Pendiente: contraprueba manual del dueño en navegador. **Importante:** por el cambio de clave, la app arranca limpia; si se desea borrar el estado antiguo del prototipo, se usa `app.reset()` en el baseline.

## 12. Aprobaciones
Producto/Operación: Eduardo, DEC-008 (2026-09-08). Técnico: revisor-qa sin bloqueantes (2026-09-08). Verificación en navegador: contraprueba E2E en Chromium 12/12 por el Supervisor (`scripts/e2e-contraprueba.js`, capturas en `08-validacion/capturas-e2e/`); la revisión visual del dueño se hace sobre la publicación privada de la app. Estado: **Verificada**.
