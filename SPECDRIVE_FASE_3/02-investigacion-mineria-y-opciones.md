# Investigación de referencia — minería de Antofagasta

## Alcance y prudencia

La información operacional detallada de las mineras no suele ser pública. Estas referencias combinan normativa oficial y descripciones públicas de proveedores que declaran implementaciones mineras. Las afirmaciones comerciales deben validarse mediante demo, referencias de clientes y contrato antes de comprar.

## Hallazgos relevantes

### 1. Nómina, turno y marcaje de abordaje

Vigatec describe un caso en Minera Escondida con control de asistencia para 4.000 colaboradores, relojes fijos y dispositivos móviles PDA para registrar el ingreso a buses. Esto respalda un patrón en el que el viaje se vincula a una persona autorizada y al abordaje real, no solo a una reserva declarada.

Aplicación a Enjoy:

- precarga desde nómina y turno;
- identidad validada al abordar;
- diferencia entre asignado, confirmado, abordado y ausente;
- evidencia móvil del contratista.

### 2. Reserva anticipada, lista de espera y dimensionamiento

AllRide declara trabajar con operaciones de Antofagasta Minerals, SQM, Zaldívar, Antucoya, El Abra, ENAMI y Capstone Copper. Publica capacidades de reserva anticipada, lista de espera, rutas fijas o dinámicas, validación de abordaje y operación offline.

Aplicación a Enjoy:

- permitir confirmación o cambio dentro de una ventana;
- mostrar sobrecupo y lista de espera;
- proponer refuerzo, sin autorizarlo automáticamente;
- conservar al transportista existente y usar una capa neutral de control.

### 3. Transporte continuo y pasajeros autorizados

El DS 80 chileno define el transporte privado remunerado de pasajeros como un servicio contratado para pasajeros predeterminados, con origen y destino establecidos. Para servicios continuos de empresas, contempla portar documentación que acredite la relación con la empresa y la identificación de los pasajeros como trabajadores.

Aplicación a Enjoy:

- mantener nómina autorizada y manifiesto por servicio;
- registrar origen, destino, fecha, hora, vehículo y condición del pasajero;
- controlar documentos del operador y vehículos como vigencias, no como simples adjuntos.

## Tres modelos evaluados

| Modelo | Cómo trabaja | Ventaja | Riesgo | Costo relativo |
|---|---|---|---|---|
| A. Asignación rígida por turno | Nómina asigna viaje; trabajador solo consulta | Simple y controlable | Falla ante cambios frecuentes | Bajo |
| B. Reserva totalmente voluntaria | Cada trabajador busca y reserva | Demanda explícita | Olvidos y alta carga de uso | Medio-alto |
| C. Híbrido flexible | Sistema propone; trabajador confirma o cambia **T−48 a T−2** (DEC-015; el brief original decía T−24 — **histórica/supersedida por DEC-015**) | Equilibrio entre control y flexibilidad | Requiere reglas de excepción claras | Medio |

## Recomendación

Adoptar el modelo C. La experiencia principal debe ser:

> Este es el traslado que el sistema propone según tu turno. Confírmalo o cámbialo antes de las 21:00.

No debe parecer una venta de pasajes. Tampoco debe asumir que el turno precargado está siempre correcto.

## Funciones mineras que sí se adaptan

- Nómina autorizada.
- Confirmación anticipada.
- Lista de espera.
- Marcaje QR o identificador interno.
- Registro móvil de abordaje.
- Alertas de salida tardía, desvío o no-show.
- Modo de conectividad degradada para el contratista.
- Separación entre telemetría del vehículo y trazabilidad del pasajero.
- Panel neutral del mandante sobre uno o varios contratistas.

## Funciones que no se copian en el MVP

- Pago de pasaje por el trabajador.
- Reconocimiento facial.
- Hardware minero especializado.
- Optimización automática de rutas sin datos suficientes.
- Seguimiento continuo de personas.
- FMS de camiones de extracción.
