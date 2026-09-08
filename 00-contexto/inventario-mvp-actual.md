# Inventario actualizado
Referencia: index_7.html, idéntico al index.html del ZIP recibido.
Conserva roles, reservas/lista de espera, extras, conciliación e indicadores del avance. El inventario anterior está en historico para trazabilidad.
## Límites comprobados por lectura
- localStorage reutiliza la clave trazabilidad_v2: un navegador con datos de versión anterior puede conservar horarios antiguos; definir migración/versionado y respaldo antes de resetear.
- AHORA y MES fijos; tiempos locales del navegador y clasificación mensual por prefijo UTC pueden discrepar de jornada chilena.
- Proyección 30×8×2: solo supuesto del mes demo; calendario por contrato pendiente.
- Reservas confirmadas alimentan rsHasta; no prueban personas transportadas.
- requirePermission no cubre por sí solo contrato y recurso en todas las mutaciones; revisar transicion, cambia, subsana, decideOk, reclasificaOk y excluyeOk por llamadas directas.
- Evidencias booleanas, auditoría mutable y documentos derivados de estado vivo; no equivalen a respaldo de producción.
- Caso extra rechazado #3 indica seis reservas, mientras el perfil horario a las 06:00 genera mayor demanda: reconciliar causal y semilla.
## Evidencia de pruebas
46/46 es declaración histórica sin script. scripts/check-baseline.cjs es una comprobación nueva acotada (arranque con DOM simulado, horarios y asociaciones), sin revisión visual o E2E.
