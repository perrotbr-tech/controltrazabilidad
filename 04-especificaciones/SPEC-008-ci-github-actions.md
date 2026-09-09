# SPEC-008 — CI básico con GitHub Actions

Estado: Verificada (validación local PASS; GitHub Actions run 34312457250 success en PR #3)
Propietario humano: Eduardo Perrot
Origen: instrucción DevOps pre–Corte 1 / DEC-005 (infraestructura de verificación, no producto)

## 1. Problema y resultado
Antes del Corte 1 no hay verificación automática en pull requests. Un cambio puede romper baseline, configuración o permisos sin detección. Resultado: cada PR ejecuta las pruebas existentes con Node 22, sin secretos ni despliegue.

## 2. Evidencia
Scripts existentes y verificados localmente: `scripts/check-baseline.cjs`, `scripts/check-config.cjs`, `scripts/check-permisos.cjs`, `scripts/e2e-contraprueba.js` (Playwright). Registro histórico en `08-validacion/resultado-baseline.md`.

## 3. Alcance
Incluido: workflow GitHub Actions en `pull_request`; Node 22; TZ `America/Santiago`; permisos mínimos (`contents: read`); job de checks Node (`baseline`, `config`, `permisos`, `corte1`); job E2E Playwright (`e2e-contraprueba` + regresión modal de extra).
Excluido: secretos, despliegue, cuentas externas, publicación de artefactos productivos.

## 4. Requisitos
REQ-CI-01 El workflow corre en cada `pull_request`.
REQ-CI-02 Usa Node.js 22 y `TZ=America/Santiago`.
REQ-CI-03 Ejecuta baseline, config y permisos; falla el job si algún script sale distinto de 0.
REQ-CI-04 No declara ni consume secretos; no despliega.
REQ-CI-05 Permisos del token: solo lectura de contenidos.
REQ-CI-06 Playwright se incluye solo con versión fijada y tras PASS local reproducible.

## 5. Reglas
R1 `check-baseline.cjs` valida el baseline (`prototipo-actual`), no `app/`.
R2 `check-config.cjs` y `check-permisos.cjs` validan `app/` por defecto.
R3 E2E no bloquea el diseño del Corte 1; si deja de ser reproducible, se desactiva con registro en validación.
R4 Capturas E2E en CI van a directorio temporal del runner; no se commitan.

## 6. Criterios de aceptación
AC-01 Dado un PR, cuando corre CI, entonces existen jobs que ejecutan los tres scripts Node y reportan PASS/FAIL.
AC-02 Dado el workflow, cuando se inspecciona YAML, entonces `permissions.contents` es `read` y no hay `secrets.*` ni pasos de deploy.
AC-03 Dado el entorno local con Node 22 y TZ America/Santiago, cuando se ejecutan los mismos comandos del workflow, entonces PASS.
AC-04 Dado Playwright 1.55.1 + Chromium, cuando se corre `e2e-contraprueba.js` dos veces, entonces 12/12 PASS (condición para mantenerlo en CI).

## 7. Tareas y pruebas
- Crear `.github/workflows/ci.yml`
- Añadir `package.json` / `package-lock.json` solo para Playwright fijado
- Documentar resultado en `08-validacion/resultado-ci.md`
- Actualizar backlog/estado; no tocar `app/`

## 8. Riesgos y decisiones abiertas
- E2E usa `waitForTimeout` y `file://`; puede volverse frágil en runners futuros → mitigación: job separado con `needs` y timeout.
- Costo de minutos Actions crece con instalación de Chromium → job E2E solo tras PASS de checks.
- `--with-deps` puede fallar por `Hash Sum mismatch` del apt de Google Chrome en `ubuntu-latest` → el workflow elimina esas sources list antes de instalar Chromium de Playwright.
- No requiere DEC nueva: es verificación del prototipo existente, no backend ni producción.
