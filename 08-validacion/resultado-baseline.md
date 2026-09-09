# Verificación de esta actualización
Comando: node scripts/check-baseline.cjs
Resultado: PASS en el entorno de preparación.
Alcance: ejecución JavaScript con DOM simulado, servicios en 23–06, ocho salidas por jornada/ruta, extras asociados y división con cero.
No se verificó la interfaz en navegador ni se ejecutó Claude Code. No acredita autenticación, seguridad, red, datos reales o las 46 pruebas históricas.
Comparación SHA-256: index_7.html coincide con el HTML del ZIP.

# Verificación en Claude Code — 2026-09-08
Entorno: contenedor remoto Linux, Node v22.22.2, TZ America/Santiago, sin paquetes npm.

| Comando | Archivo | Resultado |
|---|---|---|
| `node scripts/check-baseline.cjs` | prototipo-actual/index.html (reconstruido, sha256 7e710bef…) | PASS |
| `node scripts/check-permisos.cjs 09-plataforma/prototipo-actual/index.html` | baseline | FAIL, 7/21 correctos (los que pasan lo hacen por efecto cascada del propio defecto) — reproducción de SPEC-002, exit 1 |
| `node scripts/check-permisos.cjs` | app/index.html (SPEC-002 aplicada, incl. correcciones QA D-1/D-2) | PASS 21/21, exit 0 |

Nota: `check-baseline.cjs` lee solo el baseline; su PASS no dice nada sobre `app/` (observación del revisor-qa).

# Verificación SPEC-003 — 2026-09-08 (tarde)
| Comando | Archivo | Resultado |
|---|---|---|
| `node scripts/check-config.cjs` | app/index.html antes de implementar | FAIL 2/9 (reproducción) |
| `node scripts/check-config.cjs` | app/index.html con SPEC-003 + correcciones QA | PASS 15/15, exit 0 |
| `node scripts/check-permisos.cjs` | app/index.html | PASS 21/21 (SPEC-002 conservada) |
| `node scripts/check-baseline.cjs` | prototipo-actual (intacto) | PASS |

Contraprueba manual del dueño: no pudo realizarse (al abrir el archivo desde GitHub se muestra el código fuente, no la app). Reemplazada por contraprueba E2E automatizada del Supervisor:

# Contraprueba E2E en Chromium — 2026-09-08
Comando: `CHROMIUM=/opt/pw-browsers/chromium node scripts/e2e-contraprueba.js` (Playwright 1.55, Chromium real, viewport 390×844 y 1280×800, TZ America/Santiago).
Resultado: **12/12 PASS**, sin errores de JavaScript en consola ni alertas inesperadas. Capturas en `08-validacion/capturas-e2e/` (11 pantallas).
Recorrido: login → trabajador ve 30/30 cupos → contratista abre solicitud (selector 1 o 2 vans, +15/+30) y pide 2 vans ($90.000) → mandante ve capacidad propuesta +30, autoriza → auditoría "capacidad 30 → 60" → vista Contrato con 15 cupos garantizados, 2 vans adicionales y sentido → conciliación bloqueada por el Observado.
Revisión visual del Supervisor sobre las capturas: sin `undefined`/`NaN`, contraste correcto, navegación móvil sin cortes.
Publicación para revisión del dueño: artefacto privado "Trazabilidad de Transporte" (misma copia `app/` verificada, sin cambios de código).
Alcance: recorrido feliz de SPEC-003 + bloqueo de conciliación; no cubre todos los perfiles ni casos negativos (esos están en los scripts con DOM simulado).

Alcance: JavaScript con DOM simulado. No acredita interfaz en navegador, E2E, autenticación real ni seguridad de servidor. Contraprueba manual de los cuatro perfiles en navegador: pendiente (R5 de SPEC-002).

# Verificación SPEC-003b + T-15 — 2026-09-09
Entorno: contenedor remoto Linux, Node v22.14.0, `TZ=America/Santiago`. Sin modificación de `09-plataforma/app/` en esta sesión.

| Comando | Archivo | Resultado |
|---|---|---|
| `node scripts/check-baseline.cjs` | prototipo-actual (intacto) | PASS |
| `node scripts/check-config.cjs` | app/index.html (SPEC-003b) | **PASS 16/16**, exit 0 |
| `node scripts/check-permisos.cjs` | app/index.html | **PASS 21/21**, exit 0 |
| `node scripts/check-permisos.cjs 09-plataforma/prototipo-actual/index.html` | baseline | FAIL 7/21 (histórico esperado) |

Revisión independiente `revisor-qa` (T-15): **PASS CON LIMITACIONES**.
Limitaciones abiertas (sin bloqueantes de código por lectura):
1. Documentar 16/16 aquí (cumplido en este párrafo).
2. E2E específica pendiente: asertar 7 salidas H-022, proyección referencial bajo config actual y horario real (el E2E 12/12 cubre SPEC-003, no estos asertos de 003b).
3. Validación huso America/Santiago / cruce medianoche (T-10) con reloj controlado.
4. Migración `trazabilidad_v3`: `cargar()` no invalida explícitamente estados con `salidasPorJornada !== 7` (Q-003b-1; diferido, sin tocar app en esta sesión).

DEC-022: proyección 420 es **referencial** de la configuración actual, no regla fija del sistema.
