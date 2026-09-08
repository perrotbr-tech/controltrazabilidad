# Visión y alcance
Fuente: manual rector, sección 03 (`06-gobernanza/manual-spec-driven.md`). Reencuadre vigente: DEC-003 fija el piloto en el transporte de personal del Hotel Enjoy Antofagasta; minería es expansión posterior (CLAUDE.md).

## Problema
En contratos operacionales participan mandantes, contratistas, trabajadores, supervisores y administradores. Las reservas, confirmaciones, recursos adicionales, evidencias, autorizaciones, desempeño y cierres económicos suelen quedar dispersos. Esto dificulta saber qué se solicitó, qué se prestó, por qué se usó capacidad extra, qué estaba autorizado y cómo se comporta el contrato.

## Visión
Una plataforma única, multiempresa y modular que conecte la operación diaria con el control contractual sin confundir indicadores de uso con reglas de pago. Cada usuario ve solo las tareas y datos que le corresponden según su organización, contrato y asignación.

## Decisión de producto inicial
El transporte es el primer módulo y banco de pruebas. El núcleo del producto será genérico y los detalles (rutas, turnos, capacidades, tarifas, evidencias y reglas de aprobación) serán configurables por contrato.

## Usuarios iniciales
| Usuario | Necesidad principal | Límite |
|---|---|---|
| Trabajador | Reservar/cancelar y conocer su traslado | Solo sus datos y servicios habilitados |
| Operador contratista | Planificar, ejecutar y acreditar el servicio | Solo contratos y recursos asignados |
| Supervisor mandante | Ver cumplimiento y autorizar excepciones | Solo contratos bajo su responsabilidad |
| Administrador de organización | Gestionar usuarios y asignaciones | Sin acceso económico automático |
| Gestor contractual | Configurar contrato, KPI y conciliación | Sin alterar evidencia operacional histórica |
| Auditor | Consultar trazabilidad | Lectura, exportación controlada |

Nota: el prototipo implementa cuatro de estos seis perfiles (trabajador, contratista, mandante, administrador). Gestor contractual y auditor no existen aún; ADR-001 pide distinguir conductor/operador y administrador técnico/mandante económico.

## Fuera de alcance hasta nueva aprobación
- Nómina, remuneraciones o asistencia laboral completa.
- Facturación electrónica y contabilidad general.
- Rastreo continuo de personas (reforzado por H-001, Ley 21.719).
- Decisiones automáticas de sanción, rechazo o pago sin revisión humana.
- Integraciones específicas antes de validar procesos y datos.

## Indicadores de éxito del piloto
- Trazabilidad completa de solicitud a cierre.
- Disminución de coordinación manual y doble digitación.
- Evidencia suficiente para explicar servicios adicionales.
- Datos separados y seguros por organización/contrato.
- Tiempo de adopción razonable para trabajador y operador.
- Costo de implantación proporcional al ahorro o riesgo reducido (V-13 pendiente: línea base del Enjoy).
