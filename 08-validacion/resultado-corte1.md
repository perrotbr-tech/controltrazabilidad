# Resultado Corte 1 — inscripción híbrida (simulación)
Fecha: 2026-09-09. Autorización: construcción simulada en `09-plataforma/app/` + DEC-032.
Entorno: Node 22, `TZ=America/Santiago`. Sin commit/push/PR (pendiente revisión humana).

## Resultado global: **PASS CON LIMITACIONES**

| Suite | Resultado |
|---|---|
| `TZ=America/Santiago node scripts/check-corte1.cjs` | **22/22 PASS** |
| `node scripts/check-config.cjs` | **16/16 PASS** |
| `node scripts/check-permisos.cjs` | **21/21 PASS** |
| `node scripts/check-baseline.cjs` | **PASS** (prototipo-actual intacto) |
| QA independiente (`revisor-qa`) | **PASS CON LIMITACIONES** (tras corrección XSS D1) |

## Alcance verificado
- 8 salidas (23:00 reservable + 00:15…06:45), T−48 / T−2, PROPUESTO ≠ CONFIRMADO
- Confirmar / cambiar / rechazar; no confirmado libera cupo al cierre; post-cierre bloqueado + excepción auditada
- Reloj inyectable America/Santiago; roles asignados; proyección derivada de `salidasPorJornada`
- Marca explícita de simulación (no seguridad/concurrencia de producción)

## Limitaciones
- Simulación en navegador: permisos y reloj en cliente.
- Sin concurrencia real de último cupo (AC-C1-12 parcial).
- Cierre de manifiesto vía `aplicarCierreJornada` explícito (no job automático).
- E2E móvil Playwright del recorrido híbrido: capturas headless; no sustituye contraprueba humana.

## CI / regresión modal (cierre técnico)
- `check-corte1.cjs` en job `checks` del workflow.
- `check-e2e-regresion-salir-extra.cjs` en job `e2e` + `npm run test:e2e-regresion-modal` / `test:e2e:all`.
- Regresión determinista: A (inválido sin motivo → modal abierto + alerta), B (válido → cierra), C (Salir disponible); selección por semántica/fixture, sin depender del orden ni de 23:00 como primera opción.

## Costo relativo
Bajo–medio: HTML/JS único + scripts Node; sin proveedores externos ni deploy.
