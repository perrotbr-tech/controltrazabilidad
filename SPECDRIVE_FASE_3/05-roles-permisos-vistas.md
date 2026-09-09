# Roles, permisos y vistas

## Principio

El sistema conoce el rol después de autenticar. No pregunta “¿qué rol eres?”. Si una persona tiene más de un rol autorizado, el cambio de contexto se ofrece únicamente para esas asignaciones y queda auditado.

## Trabajador

Vista inicial:

- tarjeta Próximo traslado;
- estado Propuesto, Confirmado, Espera, Bloqueado o Abordado;
- cuenta regresiva al cierre;
- horario, sentido, ruta y parada;
- acciones Confirmar, Cambiar, No viajaré;
- posición de su van solo desde el inicio operacional y solo si tiene reserva confirmada.

Puede:

- leer sus datos mínimos;
- confirmar o cambiar durante la ventana;
- solicitar excepción después del cierre;
- cancelar durante la ventana;
- mostrar QR;
- revisar historial propio.

No puede:

- escoger rol;
- ver nombres o traslados de terceros;
- ver contrato, tarifas o conciliación;
- crear capacidad;
- aprobar excepciones o extras.

## Contratista

Vista inicial: tablero de despacho de la jornada.

Puede:

- ver demanda agregada y manifiestos del contrato;
- asignar vehículo y conductor habilitados;
- solicitar van extra;
- registrar contingencia;
- validar abordaje;
- iniciar y finalizar ruta;
- emitir eventos de posición de la van;
- cargar evidencia;
- proponer correcciones.

No puede:

- ver datos ajenos al contrato;
- cambiar el monto fijo;
- aprobar su propia solicitud económica;
- cerrar conciliación del mandante;
- crear roles del mandante.

## Mandante

Vista inicial: centro de control de excepciones y cumplimiento.

Puede:

- ver demanda, capacidad y lista de espera;
- aprobar o rechazar extras y excepciones según política;
- observar incumplimientos;
- revisar trazabilidad;
- conciliar servicios respaldados;
- generar PDF;
- administrar parámetros contractuales mediante flujo controlado.

No puede:

- falsificar evidencia del contratista;
- modificar eventos históricos;
- confirmar cupos sobre capacidad;
- convertir KPI informativos en descuentos automáticos.

## Administrador

Puede:

- crear y desactivar usuarios;
- asignar roles y organizaciones;
- configurar contratos, calendarios, rutas y paradas;
- administrar vigencias documentales;
- revisar auditoría técnica.

No puede:

- reescribir auditoría;
- autorizarse operaciones comerciales fuera de sus asignaciones;
- cargar datos reales en ambiente demo.

## Permisos mínimos sugeridos

| Dominio | Trabajador | Contratista | Mandante | Administrador |
|---|---|---|---|---|
| Mis traslados | propio | lectura operativa | lectura contractual | soporte auditado |
| Inscripción ordinaria | propia, ventana abierta | no | no | no |
| Excepción | solicita | registra/propone | decide | configura política |
| Manifiesto | solo QR propio | sí, contrato | agregado y autorizado | soporte |
| Abordaje | presenta identidad | registra | consulta | audita |
| Extra | consulta estado propio si afecta | solicita/opera | autoriza/con/concilia | configura |
| GPS van | solo su salida | emite/ve su flota | ve contrato | configura |
| Contrato y dinero | no | condición operativa necesaria | completo | administración técnica |
| Roles | no | no | no | asigna |

## Separación multiempresa

Toda consulta debe filtrar por organización y contrato en servidor. Poseer un ID válido no habilita acceso. Las pruebas deben intentar acceso cruzado entre dos mandantes, dos contratistas y dos contratos.
