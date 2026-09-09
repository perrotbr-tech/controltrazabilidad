# Reglas de negocio y restricciones

## A. Tiempo y jornada

| ID | Regla |
|---|---|
| RN-001 | Toda fecha operativa se calcula en America/Santiago, incluyendo horario de verano. |
| RN-002 | La jornada comienza a las 23:00 y termina en una hora configurable posterior a la última salida. |
| RN-003 | La inscripción abre exactamente 24 horas antes de T0. |
| RN-004 | El autoservicio se bloquea exactamente 2 horas antes de T0. Para T0=23:00, bloquea a las 21:00. |
| RN-005 | El servidor determina la hora; nunca el reloj del teléfono. |
| RN-006 | Si cambia T0, apertura y bloqueo se recalculan automáticamente. |
| RN-007 | El cierre genera una versión inmutable del manifiesto; los cambios posteriores son anexos de excepción. |

## B. Inscripción flexible

| ID | Regla |
|---|---|
| RN-010 | Una propuesta precargada no equivale a confirmación cuando el grupo usa PROPUESTA_REQUIERE_CONFIRMACION. |
| RN-011 | El trabajador puede confirmar, cambiar o declinar solamente durante la ventana abierta. |
| RN-012 | Un trabajador no puede mantener dos reservas activas incompatibles para el mismo tramo y jornada. |
| RN-013 | Cambiar horario libera el cupo anterior de forma transaccional: el nuevo cupo debe asegurarse antes de liberar el anterior o la operación debe revertirse. |
| RN-014 | Si el nuevo servicio está lleno, el usuario puede conservar su cupo anterior o aceptar lista de espera; nunca perderlo silenciosamente. |
| RN-015 | El sistema informa hora de cierre y tiempo restante en todas las pantallas de inscripción. |
| RN-016 | No confirmar automáticamente a quien no respondió salvo que su grupo tenga ASIGNACION_AUTOMATICA_CON_CANCELACION. |
| RN-017 | Un trabajador inactivo o sin relación vigente con empresa y contrato no puede inscribirse. |

## C. Bloqueo y excepciones

| ID | Regla |
|---|---|
| RN-020 | Después de las 21:00, toda mutación ordinaria del trabajador devuelve BLOQUEADO_POR_CIERRE. |
| RN-021 | La excepción exige tipo, motivo, solicitante, fecha, autorizador y decisión. |
| RN-022 | La excepción aprobada no crea capacidad. Si no hay cupo, queda en espera. |
| RN-023 | Las excepciones ex post se registran separadas del manifiesto original y muestran antes/después. |
| RN-024 | El supervisor del mandante puede aprobar excepciones definidas; el contratista solo puede proponer o registrar, salvo emergencia previamente regulada. |
| RN-025 | Ninguna excepción puede borrar el historial del registro original. |

## D. Capacidad, rutas y extras

| ID | Regla |
|---|---|
| RN-030 | La capacidad confirmable es la suma de asientos habilitados de vehículos asignados al servicio. |
| RN-031 | Está prohibido confirmar o abordar sobre capacidad. |
| RN-032 | El tope inicial es dos vans extra acumuladas por jornada completa y entre todas las rutas. |
| RN-033 | Solicitudes rechazadas no consumen el tope; solicitadas, en revisión, autorizadas, despachadas o utilizadas sí lo consumen hasta resolución. |
| RN-034 | Una van extra se asigna a una ruta y salida concretas; no se cuentan fracciones. |
| RN-035 | Si el total de demanda supera 90 o la distribución por rutas deja excedentes, se genera alerta crítica y lista de espera. |
| RN-036 | El sistema puede recomendar reasignación, segundo viaje u otro medio, pero requiere decisión humana y respaldo contractual. |
| RN-037 | Rutas y paradas se basan en sectores anonimizados; no se publican domicilios. |

## E. Abordaje y operación

| ID | Regla |
|---|---|
| RN-040 | Solo puede abordar una persona habilitada y asociada al servicio o a una excepción aprobada. |
| RN-041 | Cada abordaje registra servicio, trabajador, hora, parada, vehículo, método y operador. |
| RN-042 | La validación recomendada para MVP es QR más búsqueda por identificador interno como contingencia. |
| RN-043 | Sin conexión, el dispositivo usa un manifiesto firmado y descargado; al sincronizar no sobrescribe eventos más recientes sin reconciliación. |
| RN-044 | Un no-show no elimina la reserva ni la evidencia; cambia el estado y registra hora de cierre de abordaje. |
| RN-045 | La posición compartida es la de la van, no la del trabajador. |

## F. Contrato y conciliación

| ID | Regla |
|---|---|
| RN-050 | El monto fijo mensual no cambia por ocupación, reservas, no-show o costo por pasajero. |
| RN-051 | Los KPI de costo unitario son informativos, salvo regla contractual expresa y aprobada. |
| RN-052 | Un extra se concilia solo con autorización o excepción válida, patente, salida, manifiesto y tarifa contractual vigente. |
| RN-053 | Valores de demo se marcan ficticios hasta validar V-05. |
| RN-054 | Un servicio observado bloquea el cierre económico hasta subsanación o exclusión motivada. |
| RN-055 | El PDF de conciliación conserva correlativo, versión, emisor y evidencia referenciada. |

## G. Seguridad, privacidad y auditoría

| ID | Regla |
|---|---|
| RN-060 | Los roles se asignan por administrador; ningún usuario elige su rol. |
| RN-061 | Las políticas se aplican en servidor y base de datos, no solo en la interfaz. |
| RN-062 | El trabajador solo ve sus traslados; el contratista solo contratos asignados; el mandante solo sus empresas y contratos. |
| RN-063 | Todo texto ingresado se valida y escapa; no se inserta HTML del usuario. |
| RN-064 | La auditoría registra actor, rol, organización, contrato, acción, objeto, antes, después, hora y resultado. |
| RN-065 | La demo usa datos ficticios. Los datos reales requieren decisión, base jurídica, política de retención y contrato correspondiente. |
| RN-066 | No almacenar un rastro completo del trabajador. |
| RN-067 | Patentes, licencias y autorizaciones tienen fecha de vigencia y alertas de vencimiento. |

## Casos límite obligatorios

1. Trabajador confirma exactamente a las 20:59:59: permitido.
2. Intenta a las 21:00:00: bloqueado.
3. El teléfono tiene hora incorrecta: prevalece el servidor.
4. Horario de verano cambia durante la ventana: no duplica ni pierde reservas.
5. Cambio de turno después de cierre: excepción.
6. Dos usuarios intentan el último cupo: solo uno queda confirmado.
7. Dos solicitudes de una van agotan el tope; una tercera se bloquea.
8. Dos vans extra se concentran en Norte y queda demanda en Sur: alerta de distribución.
9. Demanda total 93, capacidad máxima 90: mínimo tres en espera y posible excedente mayor por distribución.
10. Operación offline registra dos veces el mismo QR: deduplicación y alerta.
