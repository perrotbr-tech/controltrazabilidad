# Flujos y máquinas de estado

## 1. Estado del traslado del trabajador

Estados:

- PROPUESTO
- CONFIRMADO
- DECLINADO
- EN_ESPERA
- BLOQUEADO
- EXCEPCION_SOLICITADA
- EXCEPCION_APROBADA
- EXCEPCION_RECHAZADA
- ABORDADO
- NO_SHOW
- CANCELADO

Transiciones principales:

| Desde | Acción | Hacia | Condición |
|---|---|---|---|
| PROPUESTO | confirmar | CONFIRMADO | ventana abierta y cupo |
| PROPUESTO | confirmar | EN_ESPERA | ventana abierta sin cupo |
| PROPUESTO | no viajaré | DECLINADO | ventana abierta |
| CONFIRMADO | cambiar | CONFIRMADO | nuevo cupo asegurado |
| CONFIRMADO | cambiar | EN_ESPERA | usuario acepta espera sin perder silenciosamente el anterior |
| cualquiera ordinario | llega cierre | BLOQUEADO | snapshot a las 21:00 |
| BLOQUEADO | solicitar | EXCEPCION_SOLICITADA | motivo obligatorio |
| EXCEPCION_SOLICITADA | aprobar | EXCEPCION_APROBADA o EN_ESPERA | según capacidad |
| CONFIRMADO/EXCEPCION_APROBADA | escanear | ABORDADO | identidad y servicio válidos |
| CONFIRMADO | cerrar abordaje | NO_SHOW | no existe abordaje |

Una implementación puede separar estado de reserva, bloqueo y abordaje en campos distintos, pero debe conservar la semántica y el historial.

## 2. Flujo diario

### T−24h — apertura

1. Importar última nómina y turnos.
2. Resolver trabajador, contrato, sentido, horario y parada sugerida.
3. Crear propuestas idempotentes.
4. Notificar disponibilidad sin exponer datos sensibles.

### Ventana abierta

1. Trabajador entra con enlace seguro.
2. Ve una propuesta simple.
3. Confirma o cambia.
4. Sistema recalcula capacidad en tiempo real.
5. Contratista y mandante ven agregados preliminares.

### T−2h — cierre

1. El servidor bloquea mutaciones ordinarias.
2. Crea snapshot del manifiesto.
3. Calcula faltantes y sobrecupos.
4. Genera recomendaciones de extras.
5. Notifica al contratista y mandante.

### Operación

1. Contratista asigna vehículo/conductor.
2. Conductor inicia ruta.
3. Trabajador ve estado y posición de la van.
4. Se registra abordaje.
5. Se registran hitos y contingencias.
6. Conductor finaliza ruta.

### Cierre posterior

1. Conciliar manifiesto, abordaje y evidencia.
2. Clasificar no-show, espera no resuelta y servicio excepcional.
3. Observar faltantes.
4. Incluir extras respaldados en conciliación.

## 3. Extra de vehículo

Estados conservados:

SOLICITADO → EN_REVISION → AUTORIZADO → DESPACHADO → UTILIZADO/NO_UTILIZADO → OBSERVADO/CONCILIADO.

Reglas adicionales:

- validar tope acumulado por jornada antes de crear y autorizar;
- validar distribución por ruta;
- capturar razón cuantitativa u operacional;
- registrar si fue preventivo, emergencia o ex post;
- no sumar al pago mientras no esté respaldado.

## 4. Flujo offline del abordaje

1. Antes de salir, el dispositivo descarga manifiesto, versión y firma.
2. Cada escaneo crea evento local con ID único y hora monotónica.
3. Si el pasajero no está en la nómina offline, queda como excepción pendiente; no se confirma silenciosamente.
4. Al recuperar conexión, sincroniza eventos.
5. El servidor deduplica y reporta conflictos.
6. Un operador autorizado resuelve conflictos sin borrar originales.

## 5. Notificaciones

Prioridad:

- alta: cierre cercano sin respuesta, cupo perdido, excepción decidida;
- crítica: sobrecupo, salida sin vehículo, documento vencido, atraso relevante;
- informativa: inscripción abierta, viaje confirmado, van próxima.

No depender solo de notificaciones push. La pantalla principal siempre refleja el estado del servidor.
