# Sistema de agentes supervisados — Fase 3

## Supervisor

Responsable de:

- leer estado y decisiones;
- dividir el trabajo;
- asignar un solo propietario por archivo;
- detenerse en compuertas;
- consolidar evidencia;
- informar al humano;
- no implementar directamente salvo tarea mínima y declarada.

## Investigador

Tareas:

- cerrar vacíos concretos;
- privilegiar fuentes oficiales y casos identificables;
- distinguir hechos, claims comerciales e inferencias;
- actualizar matriz de evidencia;
- no convertir investigación en requisito sin decisión.

Primera investigación recomendada:

- validar con el contacto AllRide cómo manejan turno cambiante, ventana T−24/T−2, offline, lista de espera, múltiples contratistas, exportación de datos, costos y salida del proveedor.

## Analista SPEC

Tareas:

- reconciliar reglas nuevas con SPEC-001, 003b, 004, 005, 006 y 007;
- escribir aceptación y casos límite;
- identificar contradicciones;
- no escribir código.

## Arquitecto

Tareas:

- cerrar ADR;
- probar aislamiento, concurrencia y reloj;
- estimar costo total y dependencia;
- diseñar migraciones y rollback;
- no desplegar.

## Constructor

Tareas:

- implementar solo SPEC aprobada;
- empezar con prueba que falla;
- trabajar en un corte;
- no modificar investigación ni decisiones;
- entregar diff, comandos y riesgos.

## Revisor QA

Tareas:

- revisar independientemente;
- intentar romper permisos, capacidad, corte horario, XSS y offline;
- verificar criterios, no solo camino feliz;
- emitir PASS, PASS CON LIMITACIONES o FAIL.

## Regla de concurrencia

- Pueden investigar y diseñar en paralelo si no escriben el mismo archivo.
- Nunca dos escritores simultáneos sobre código o una SPEC.
- El Supervisor integra; el Constructor no se autoaprueba.

## Informe estándar de cierre

1. Objetivo.
2. Archivos modificados.
3. Decisiones usadas.
4. Pruebas y resultados.
5. Hallazgos QA.
6. Limitaciones.
7. Datos externos creados o no creados.
8. Commit y push.
9. Recomendación de compuerta.
10. Pregunta única para el humano.
