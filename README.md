# Proyecto Enjoy — listo para continuar en Claude Code
## Inicio
Abrir esta carpeta (la que contiene CLAUDE.md) como proyecto en Claude Code. Si se usa terminal con Claude Code instalado: entrar a esta raíz y ejecutar `claude`.
Pegar INICIO-CLAUDE-CODE.txt. No hace falta instalar un framework agéntico ni activar agentes experimentales.
La sesión principal será Supervisor; cinco agentes locales cubren investigación, especificación, arquitectura, construcción y revisión. No están ejecutándose hasta que Claude Code los convoque.
## Entrega
Se conservaron todos los archivos recibidos: el traspaso antiguo está bajo 00-contexto/historico y el ZIP previo a DEC-004 en 00-contexto/historico/zip-2026-09-08. HTML independiente y HTML del ZIP portable son iguales. (El manifest.json mencionado en el paquete original no venía incluido; los hashes de la reconstrucción están en el registro de sesión.)
Manual rector: `06-gobernanza/Sistema_Agentico_Mineria_SpecDriven.docx` con extracción legible en `06-gobernanza/manual-spec-driven.md`. Plantilla de SPEC en `04-especificaciones/PLANTILLA-SPEC.md`; compuertas en `06-gobernanza/compuertas.md`.
Copia de trabajo del prototipo con SPEC-002 y SPEC-003 aplicadas: `09-plataforma/app/index.html`. **Para abrir la app:** descargar el archivo (en GitHub, botón "Raw" o "Download", o descomprimir el zip de entrega) y hacer doble clic; funciona sin servidor ni instalación. Ver el código en GitHub no ejecuta la app.
Pruebas con DOM simulado: `node scripts/check-baseline.cjs`, `node scripts/check-permisos.cjs`, `node scripts/check-config.cjs` (o `npm test`). Contraprueba E2E en Chromium: `npm ci` y `npm run test:e2e` (Playwright 1.55.1; capturas en `08-validacion/capturas-e2e/` o `CAPTURAS=`). CI en cada pull request: `.github/workflows/ci.yml` (SPEC-008; sin secretos ni despliegue). Validación local del workflow: `TZ=America/Santiago node scripts/validate-ci-local.cjs` (`INCLUDE_E2E=1` para incluir Playwright).
## Trabajo diario
Una tarea acotada → SPEC → cambio autorizado → pruebas → estado y siguiente tarea. Respetar DEC-005 sin reiniciar compuertas; elevar solo decisiones que realmente faltan.
Fuentes del formato: https://code.claude.com/docs/en/memory y https://code.claude.com/docs/en/sub-agents (consulta 2026-09-08). Configuración creada y revisada estructuralmente; falta comprobar carga en la instalación del usuario.
