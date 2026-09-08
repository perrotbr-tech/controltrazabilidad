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

Alcance: JavaScript con DOM simulado. No acredita interfaz en navegador, E2E, autenticación real ni seguridad de servidor. Contraprueba manual de los cuatro perfiles en navegador: pendiente (R5 de SPEC-002).
