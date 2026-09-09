# Matriz maestra de pruebas — Fase 3

## Compuerta V1: reglas temporales

- apertura T−48 (DEC-015);
- bloqueo T−2;
- frontera 20:59:59/21:00:00 (con T0=23:00);
- reloj del servidor;
- America/Santiago y horario estacional;
- servicios de madrugada asociados a la jornada correcta;
- parámetros de jornada configurables (no 480/420 fijos).

## Compuerta V2: identidad y aislamiento

- trabajador solo registro propio;
- roles no autoasignables;
- acceso por ID ajeno denegado;
- contratista aislado por contrato;
- mandante aislado por organización;
- sesión vencida y usuario inactivo.

## Compuerta V3: capacidad

- concurrencia por último cupo;
- cambio atómico;
- lista de espera;
- tope dos vans por jornada;
- distribución Norte/Sur;
- demanda 93 contra máximo 90;
- extra rechazado y consumo de tope.

## Compuerta V4: operación

- asignación de vehículo/conductor vigente;
- manifiesto cerrado;
- QR válido, inválido y duplicado;
- abordaje offline y resincronización;
- no-show;
- inicio y término de ruta;
- contingencia.

## Compuerta V5: contrato

- monto fijo invariable;
- extras con/sin evidencia;
- observado bloquea;
- exclusión motivada;
- cierre único;
- PDF correlativo;
- tarifa versionada;
- datos demo identificados.

## Compuerta V6: seguridad y calidad

- XSS en todos los campos libres;
- inyección de IDs;
- manipulación de reloj cliente;
- doble clic y reintento;
- pérdida de red;
- resolución móvil 390 px;
- accesibilidad de teclado y etiquetas;
- logs sin datos sensibles.

## Formato de evidencia

Cada prueba registra:

- ID;
- SPEC y requisito;
- precondición;
- datos de prueba;
- comando o recorrido;
- esperado;
- obtenido;
- PASS/FAIL;
- evidencia;
- commit;
- ejecutor;
- fecha.

Un conteo PASS sin evidencia reproducible no cierra la compuerta.
