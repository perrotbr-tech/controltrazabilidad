# Modelo funcional híbrido

## 1. Unidad central: jornada operacional

La jornada se identifica por la fecha local en que comienza a las 23:00. Todos los movimientos posteriores a medianoche y hasta el fin operacional configurado pertenecen a esa jornada.

Parámetros iniciales:

- Zona horaria: America/Santiago.
- Inicio: 23:00.
- Apertura de inscripción: T−48h (DEC-015).
- Bloqueo: T−2h, es decir 21:00 con T0=23:00.
- Última salida: configurable; config operacional actual 06:45 (DEC-022 / H-022).

No usar una ventana técnica de 23:00 a 22:59 como definición de servicio. El término debe ser explícito y configurable.

## 2. Formación de la demanda

### Paso 1: precarga

La empresa carga o integra trabajador, fecha de turno, hora de entrada o salida, sector o parada habitual, sentido habitual, empresa, contrato y estado de habilitación.

El motor crea una propuesta de traslado con horario, ruta y parada sugeridos.

### Paso 2: ventana flexible

Entre T−24 y T−2 el trabajador puede:

- confirmar la propuesta;
- seleccionar otro horario permitido;
- cambiar de parada dentro de las opciones habilitadas;
- cambiar sentido cuando su turno lo justifique;
- declarar que no utilizará el servicio;
- anotarse aunque no exista propuesta, si está habilitado por empresa y contrato.

### Paso 3: bloqueo

A T−2:

- se bloquea el autoservicio;
- cada registro obtiene versión y sello de cierre;
- se calcula demanda por salida, ruta y sentido;
- se generan listas de espera y alertas;
- el contratista recibe el manifiesto operativo;
- el mandante recibe el estado de capacidad y excepciones.

### Paso 4: excepción

Después del cierre:

- el trabajador no cambia directamente;
- solicita una excepción o contacta el canal definido;
- contratista o supervisor registra la solicitud;
- un autorizador permitido aprueba o rechaza;
- el sistema comprueba capacidad y deja trazabilidad;
- si no hay cupo, queda en espera aunque la excepción sea justificada.

## 3. Capacidad

- Capacidad base por vehículo: parámetro contractual; demo actual 15 garantizados.
- Capacidad base por salida: suma de vehículos efectivamente asignados.
- Extras: máximo contractual acumulado por jornada, no por solicitud.
- Las vans son indivisibles: asignar una van completa a una ruta puede dejar capacidad o demanda residual en otra.
- Nunca confirmar más pasajeros que los asientos disponibles.
- Si la demanda supera el máximo, mantener excedente en espera y emitir alerta crítica.

## 4. Experiencia por perfil

### Trabajador

Una pantalla principal con próximo traslado propuesto, cuenta regresiva al cierre, botones Confirmar, Cambiar y No viajaré, estado del cupo, parada, hora y ubicación de la van solo cuando corresponda a su salida confirmada.

### Contratista

Tablero por jornada con reloj hasta cierre, demanda por salida y ruta, manifiesto, vehículos, conductores, lista de espera, extras, despacho, abordaje, salida, término, contingencias y evidencias.

### Mandante

Centro de control con cobertura de demanda, alertas, excepciones, servicios tardíos, extras por estado, cumplimiento contractual y conciliación sin modificar automáticamente el monto fijo.

### Administrador

Organizaciones, contratos, usuarios, roles, parámetros de jornada, rutas, paradas, vigencias documentales y auditoría.

## 5. Modos de inscripción

El contrato puede configurar uno de tres modos por grupo:

1. PROPUESTA_REQUIERE_CONFIRMACION: recomendado para turnos variables.
2. ASIGNACION_AUTOMATICA_CON_CANCELACION: útil para grupos estables.
3. INSCRIPCION_MANUAL: solo para personal sin patrón de turno.

Para Enjoy, usar el modo 1 como predeterminado.
