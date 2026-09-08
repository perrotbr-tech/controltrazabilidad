# Inventario del MVP actual (referencia, no fuente de verdad)

Archivo: 09-plataforma/prototipo-actual/index.html — aplicación autónoma en navegador. Ventana operativa real (DEC-004): 1 salida/hora de 23:00 a 06:00, 8 salidas por ruta por noche.

## Capacidades presentes (verificadas: 46/46 pruebas automatizadas)
Organizaciones mandante/contratista · usuarios y asignaciones de rol por contrato · interfaces por actor
(trabajador, contratista, mandante, administrador) · reserva y cancelación · rutas, paradas, salidas, cupos y
jornada nocturna con fecha-hora completa · lista de espera y ampliación de capacidad al autorizar un extra ·
solicitud/autorización/rechazo/observación de vehículos extra con causal y evidencia (patente, salida,
manifiesto) · panel contractual con acumulado y proyección separados · conciliación mensual (fijo + extras
respaldados) con documento correlativo · auditoría de acciones y accesos denegados · punto central de
permisos (requirePermission).

## Hipótesis a preservar (validar con evidencia, no asumir)
- HIP-01 Los roles los asigna la administración; no los elige el usuario.
- HIP-02 Las vistas dependen del contexto contractual del usuario.
- HIP-03 El valor fijo mensual no cambia por nivel de uso salvo cláusula expresa.
- HIP-04 Un servicio extra requiere causal, autorización y evidencia.
- HIP-05 Los indicadores operacionales no sustituyen la conciliación contractual.

## Limitaciones antes de piloto
localStorage · autorización solo en el navegador · contrato único con semilla ficticia · sin identidad
empresarial, SSO ni MFA · sin base de datos, API ni almacenamiento documental · reglas, tarifas y rutas
codificadas · sin versionado contractual · auditoría no inmutable · sin modelo de privacidad, retención,
respaldo ni continuidad.

## Deuda funcional detectada en la última sesión (pendiente de especificación)
- El alta de usuarios es una semilla de cuentas ficticias; falta el registro real del trabajador y el
  ciclo de alta/aprobación de operador y supervisor. Registrado como necesidad, no implementado.

## Regla de uso
Valida lenguaje, flujo y experiencia. No evoluciona a producción.
