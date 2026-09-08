# SPEC-002 — Permisos en todas las mutaciones del prototipo
Estado: defecto especificado; corrección autorizada bajo DEC-005 (corrección del MVP, no ampliación).
Origen: T-01 auditoría de baseline · 00-contexto/inventario-mvp-actual.md ("requirePermission no cubre por sí solo contrato y recurso en todas las mutaciones") · invariante CLAUDE.md "ocultar pestañas no protege datos" · HIP-01/HIP-04.

## Problema
`requirePermission()` es el punto único de autorización, pero varias funciones que mutan estado no lo invocan. Como las funciones del script son globales y `window.app` expone `transicion`, cualquier sesión (o ninguna) puede desde la consola del navegador autorizar, reclasificar, excluir, despachar o conciliar. Además `cierraPeriodo()` solo bloquea por interfaz: el botón se deshabilita con observados pendientes, pero la función cierra igual si se invoca directamente.

Verificado por lectura de `09-plataforma/prototipo-actual/index.html` (2026-09-08):

| Función | Línea | Chequeo actual | Rol que debería operar |
|---|---|---|---|
| `transicion` | 546 | ninguno; expuesta en `window.app` | según estado destino (ver reglas) |
| `cambia` | 595 | ninguno | CONTRATISTA |
| `subsana` | 596 | ninguno | CONTRATISTA |
| `decideOk` | 700 | solo en `decide()` (el modal), no en la confirmación | MANDANTE |
| `reclasifica` / `reclasificaOk` | 718 / 725 | ninguno | MANDANTE |
| `excluye` / `excluyeOk` | 730 / 732 | ninguno | MANDANTE |
| `cierraPeriodo` | 756 | permiso sí; regla de observados no | MANDANTE |

## Alcance
- Corregir en una copia de trabajo `09-plataforma/app/index.html`; el baseline `prototipo-actual/index.html` queda intacto como referencia.
- Solo autorización y regla de cierre. No cambiar UX, textos, semilla, horarios, fórmulas ni el modelo de datos.
- Sigue siendo autorización en el navegador: no sustituye la validación de servidor (REQ-005 de SPEC-001).

## Reglas
R1. Toda función que muta `S` invoca `requirePermission` antes de mutar; si es denegada, no muta, audita el intento (ya lo hace `deny`) y avisa por `alert`.
R2. `transicion(e, nuevo, motivo)` exige el permiso asociado al estado destino:
  - `En revisión`, `Autorizado`, `Rechazado`, `Observado` → `autorizar:extra` (MANDANTE)
  - `Despachado`, `Utilizado`, `No utilizado` → `operar:extra` (CONTRATISTA; permiso nuevo en `PERMISOS`)
  - `Conciliado` → `conciliar:periodo` (MANDANTE), salvo la subsanación: `subsana()` la ejecuta el CONTRATISTA con `registrar:evidencia` y solo si `respaldado(e)` es verdadero (comportamiento ya existente, ahora explícito).
  - Precisión aplicada en la implementación (constructor, aceptada por el Supervisor): la excepción de subsanación vale únicamente para `Observado → Conciliado`; un `Utilizado` respaldado lo concilia el MANDANTE al cerrar el período, no el contratista desde consola.
R3. `decideOk` exige `autorizar:extra`; `reclasifica`/`reclasificaOk` exigen `autorizar:extra`; `excluye`/`excluyeOk` exigen `conciliar:periodo`; `cambia` exige `operar:extra`.
R4. `cierraPeriodo` se rechaza en la función (no solo en el botón) mientras exista un extra en estado `Observado`.
R5. La interfaz existente sigue funcionando igual para cada rol: ninguna acción hoy disponible en pantalla deja de estar disponible.

## Aceptación (verificables con `node scripts/check-permisos.cjs`)
AC-01…AC-07: sin sesión o como TRABAJADOR, las llamadas directas a `transicion`, `decideOk`, `reclasificaOk`, `excluyeOk`, `cambia` y `subsana` no cambian estado, autorización, clasificación, exclusión ni capacidad.
AC-08: como MANDANTE, `cierraPeriodo()` no crea conciliación si hay un Observado sin resolver.
AC-09, AC-11, AC-12: los caminos legítimos siguen funcionando (mandante autoriza y amplía capacidad; mandante reclasifica; contratista despacha y marca utilizado).
AC-10, AC-13, AC-14: mandante no despacha; contratista no se autoautoriza ni excluye.
AC-15: cada intento rechazado queda en auditoría como ACCESO DENEGADO.

## Pruebas
- Reproducción del defecto: `node scripts/check-permisos.cjs 09-plataforma/prototipo-actual/index.html` → debe FALLAR (documenta el defecto en el baseline).
- Corrección: `node scripts/check-permisos.cjs` (app/) → debe PASAR. `node scripts/check-baseline.cjs` debe seguir pasando sobre el baseline.
- Contraprueba manual pendiente en navegador: recorrer los cuatro perfiles y confirmar R5 (sin cambio de experiencia).

## Tareas
- T-01a Escribir prueba y SPEC (esta) — Supervisor.
- T-01b Implementar en `09-plataforma/app/index.html` — constructor.
- T-01c Revisión independiente del diff — revisor-qa.
- T-01d Registrar resultado en `08-validacion/` y estado.

## Fuera de alcance (registrado, no corregido aquí)
- Clasificación mensual por prefijo UTC (`s.salida.startsWith(MES)`) frente al invariante America/Santiago: requiere SPEC propia (candidata SPEC-003).
- Validación de habilitación del vehículo (H-002/H-011) y versionado de la clave `trazabilidad_v2`: T-08 y SPEC posteriores.
