# PLATAFORMA DE TRAZABILIDAD DE TRANSPORTE — MODELO CONTRACTUAL Y DE PAGOS
### Prompt ajustado — listo para ejecutar

---

## 0. Alcance y arquitectura (definiciones de partida)

**Alcance:** construir la plataforma desde cero incorporando esta lógica contractual desde el diseño. Si existe una versión anterior del sistema, se entregará como archivo o referencia al inicio y esta instrucción **prevalece** sobre cualquier lógica previa que relacione el pago base con pasajeros, abordajes o viajes individuales.

**Arquitectura de esta etapa:** prototipo demostrable en un solo archivo HTML (funciona offline, datos de ejemplo realistas y editables, persistencia en localStorage), con el **modelo de datos ya estructurado para migrar a backend multiusuario** (Firebase o equivalente) sin rediseño. Los tres roles se simulan con un selector de perfil que restringe acciones:

* **Trabajador**: reserva y consulta su transporte.
* **Contratista**: ve demanda, solicita vehículos adicionales, registra abordajes y evidencias.
* **Mandante**: autoriza/rechaza extras, ve paneles de control y ejecuta la conciliación.

**Principio de entrega:** el archivo maestro (con datos de trabajo y controles internos) se separa del entregable demostrable; los documentos que la plataforma emita llevan correlativo automático derivado de un solo campo editable.

---

## 1. Principio contractual

El mandante mantiene un contrato vigente con la empresa de transporte, con un precio previamente acordado. Por lo tanto:

* El pago base **no** se calcula por pasajero.
* El pago base **no** cambia automáticamente según la ocupación.
* Un trabajador ausente **no** descuenta automáticamente el contrato.
* Un viaje con pocos pasajeros **no** modifica por sí mismo el precio acordado.
* La plataforma **no** inventa tarifas ni recalcula el contrato.

La trazabilidad operacional se utiliza para verificar: disponibilidad efectiva del servicio, cuántas personas lo usan, nivel real de ocupación, si la capacidad contratada es adecuada, rutas o frecuencias sobredimensionadas, necesidad de modificar el contrato a futuro, y si un vehículo adicional fue realmente necesario.

Advertencia fija visible en todos los indicadores económicos:

> "Los indicadores de costo por usuario y ocupación miden eficiencia operacional. No modifican el monto contractual salvo que el contrato establezca expresamente un ajuste."

---

## 2. Configuración del contrato

Módulo **"Contrato de transporte"** con: empresa mandante · empresa contratista · fecha de inicio · fecha de término · monto fijo mensual · cantidad de vehículos incluidos · capacidad contratada · rutas incluidas · frecuencias incluidas · horarios comprometidos · tipos de vehículos comprometidos · condiciones de reajuste · servicios extraordinarios permitidos · tarifa contractual de vehículo adicional (si existe) · requisitos para autorizar un vehículo adicional · documentos y anexos · estado del contrato.

**Reglas:**
* La tarifa del vehículo adicional solo existe si está expresamente configurada en el contrato. Sin tarifa configurada, el flujo de extras opera igual (solicitud/autorización/verificación) pero el monto queda como "según contrato — por definir" y el extra no puede conciliarse económicamente.
* Las **condiciones de reajuste son informativas**: la plataforma muestra la condición y alerta cuando corresponde aplicarla, pero no recalcula montos por sí misma (coherente con "no inventar tarifas"). El monto reajustado se ingresa manualmente con trazabilidad.

---

## 3. Control de eficiencia — indicadores con fórmula definida

El sistema compara el costo fijo contratado con la utilización real, **sin modificar el pago**. Fórmulas:

* **% Ocupación** = pasajeros transportados ÷ capacidad disponible del período × 100.
* **% Ausentismo** = (reservas confirmadas − abordajes) ÷ reservas confirmadas × 100.
* **Costo contractual por servicio ejecutado** = monto fijo mensual ÷ servicios efectivamente ejecutados.
* **Costo por pasajero transportado** = monto fijo mensual ÷ pasajeros transportados del período.
* **Costo por asiento disponible** = monto fijo mensual ÷ (capacidad contratada × servicios ejecutados).
* **Costo de capacidad no utilizada** = costo por asiento × cupos no utilizados.

**Reglas de cálculo:** si un denominador es 0, el indicador muestra "—" (nunca error ni infinito). Los meses incompletos se etiquetan "mes parcial" y no se comparan contra meses cerrados sin advertencia. Desgloses: por ruta, por horario, por punto de parada; tendencia semanal y mensual.

Estos indicadores son gerenciales: generan alertas y análisis, **nunca** descuentos, multas o modificaciones automáticas del pago.

---

## 4. Vehículo adicional — flujo completo

Solicitud con: fecha y servicio · ruta · horario · vehículo base y su capacidad · pasajeros reservados · capacidad faltante · motivo · contratista solicitante · fecha/hora de solicitud · vehículo adicional propuesto y su capacidad · tarifa contractual (si corresponde) · evidencia posterior de utilización.

**Estados y transiciones permitidas:**

```
Solicitado → En revisión → Autorizado → Despachado → Utilizado / No utilizado → Conciliado
                        ↘ Rechazado (terminal)
Utilizado / No utilizado / Sin autorización previa → Observado → Conciliado (solo si se subsana) 
```

* **Rechazado** es terminal (una nueva necesidad = nueva solicitud).
* **Observado → Conciliado** solo si el contratista subsana la evidencia dentro del período de conciliación; la subsanación queda registrada (qué se agregó, quién, cuándo).
* Toda transición registra usuario, fecha/hora y motivo. Nada cambia de estado en silencio.

---

## 5. Justificación del vehículo adicional

El sistema evalúa con datos; **la decisión final es del mandante**.

* **Justificación cuantitativa**: demanda confirmada (reservas + lista de espera) supera la capacidad operativa disponible. El sistema la marca automáticamente como "cuantitativamente justificada".
* **Justificación operacional** (excepciones válidas): falla del vehículo base · separación obligatoria de destinos · cambio extraordinario de turno · restricción de seguridad · contingencia autorizada. Toda excepción registra motivo, evidencia y responsable de la autorización.

---

## 6. Validación posterior

Comparar: pasajeros que justificaron la solicitud · reservados · efectivamente transportados en el extra · capacidad adicional contratada · % ocupación del extra · hora real de salida · ruta efectiva · patente y conductor · autorización previa o emergencia validada.

Clasificación: **Necesidad confirmada · Parcialmente confirmada · Subutilizado · Sin utilización · Sin respaldo suficiente · Contingencia justificada.**

**Regla de juicio justo:** el sistema no concluye que un extra fue innecesario solo por baja ocupación — la clasificación considera la información disponible **al momento de solicitarlo** (la demanda que lo justificó) y las contingencias posteriores. La clasificación es una propuesta del sistema; el mandante puede reclasificar con motivo registrado.

---

## 7. Control económico de extras

El pago base mensual permanece **siempre separado**. Módulo independiente de extras: valor contractual · solicitados · autorizados · ejecutados · efectivamente utilizados · monto presentado · monto respaldado · monto observado · motivo de observación.

**Evidencia mínima para considerar un extra respaldado** (todas las condiciones):
1. Autorización previa **o** emergencia posteriormente validada por el mandante.
2. Vehículo identificado (patente, conductor).
3. Registro de salida (fecha/hora).
4. Manifiesto asociado con los pasajeros transportados.
5. Tarifa coincidente con el contrato.

La plataforma ayuda a validar el respaldo; **no crea ni modifica la obligación contractual**.

---

## 8. Panel del mandante

Tres vistas (reemplazan cualquier panel de "pago por servicio"):

* **Control contractual**: monto fijo · cumplimiento de servicios · capacidad contratada vs utilización real · costo efectivo por usuario · costo por servicio · capacidad no utilizada · desviaciones.
* **Vehículos adicionales**: solicitados / autorizados / rechazados / ejecutados / sin respaldo · ocupación de cada extra · costo extraordinario respaldado vs observado.
* **Análisis de demanda**: usuarios por día, turno, ruta y parada · reservas vs abordajes · horarios pico · días con capacidad superada · días con capacidad subutilizada.

---

## 9. Conciliación mensual (módulo con entregable)

La conciliación es el cierre económico del período y produce un **documento entregable** separado del maestro:

**Proceso:** seleccionar período → el sistema presenta monto fijo contractual + lista de extras del período con su estado y respaldo → el mandante resuelve los observados (subsanados o excluidos) → se cierra el período (los registros del período quedan inmutables, con trazabilidad de quién cerró).

**Entregable de conciliación** (1 página, correlativo automático CT-AAAA-NN): monto fijo del contrato · servicios ejecutados vs comprometidos · extras respaldados (detalle y monto) · extras observados/excluidos (monto y motivo) · **total del período = fijo + extras respaldados** · indicadores gerenciales del mes (ocupación, costo por usuario) con la advertencia fija de la sección 1. Digital, sin bloque de firmas, sin controles internos visibles.

---

## 10. Modelo de datos

Entidades: contratos · períodos contractuales · capacidades contratadas · servicios incluidos · tarifas de extraordinarios · solicitudes de vehículo adicional · autorizaciones · extras ejecutados · pasajeros por vehículo · evidencias · observaciones contractuales · conciliaciones mensuales.

Cada viaje se relaciona con: contrato · ruta · vehículo base · vehículo adicional (si corresponde) · reservas · abordajes · eventos de auditoría. Toda modificación guarda usuario, fecha y valor anterior.

---

## 11. Pruebas de aceptación (16)

1. La cantidad de pasajeros no modifica el precio fijo mensual.
2. El sistema calcula ocupación y costo efectivo por usuario.
3. Una baja ocupación genera un indicador, no un descuento automático.
4. El contratista puede solicitar un vehículo adicional.
5. La solicitud muestra demanda y capacidad disponibles.
6. El mandante puede autorizar o rechazar el extra.
7. Una autorización queda registrada con usuario, fecha y motivo.
8. Los pasajeros pueden asignarse al vehículo base o al adicional.
9. El sistema calcula la ocupación real del vehículo adicional.
10. Un extra sin autorización ni emergencia validada queda Observado.
11. El valor de un extra debe provenir del contrato.
12. La conciliación mensual separa el fijo de los extraordinarios respaldados.
13. Toda modificación mantiene trazabilidad de usuario, fecha y valor anterior.
14. Denominadores en 0 muestran "—", nunca error; meses parciales quedan etiquetados.
15. Un Observado subsanado pasa a Conciliado dejando huella de la subsanación; un Rechazado no puede revivir.
16. El selector de rol restringe las acciones (un trabajador no autoriza; un contratista no concilia).

Al cierre de la construcción: **contraprueba** (perfiles diversos, carga alta, valores límite, entradas dañadas) y **revisión de estructura** de todo documento o pantalla emitida.

---

## 12. Resultado esperado

Un trabajador reserva su transporte → el contratista conoce la demanda → el sistema compara demanda con capacidad → si es necesario se solicita un vehículo adicional → el mandante lo autoriza o rechaza → el contratista registra el abordaje por vehículo → el mandante analiza utilización, cumplimiento y eficiencia → la conciliación separa el monto contractual fijo de los servicios extraordinarios respaldados y emite su documento.

**La plataforma es una herramienta de trazabilidad, control de utilización y apoyo a decisiones contractuales. No determina unilateralmente cuánto debe pagarse.**
