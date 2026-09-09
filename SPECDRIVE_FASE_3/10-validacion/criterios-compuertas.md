# Criterios de compuerta y Definition of Done

## G3-0 — Alineación

- paquete leído;
- conflictos con SPEC anteriores identificados;
- DEC-014 y siguientes propuestas;
- dudas bloqueantes presentadas al humano;
- sin código.

## G3-1 — SPEC aprobada

- problema, resultado y fuera de alcance claros;
- reglas numeradas;
- casos límite;
- permisos;
- datos;
- aceptación reproducible;
- aprobación humana escrita.

## G3-2 — Arquitectura aprobada

- ADR con alternativas;
- costos y límites verificados en fuentes vigentes;
- privacidad y región de datos;
- plan de reversión;
- autorización humana para crear recursos externos.

## G3-3 — Implementación

- trabajo en rama;
- prueba roja antes de corregir;
- cambios acotados;
- migraciones reversibles;
- sin secretos;
- sin datos reales;
- revisión del constructor.

## G3-4 — QA independiente

- revisor distinto del constructor;
- pruebas automatizadas y manuales;
- permisos adversariales;
- móvil;
- concurrencia;
- fallos documentados y corregidos;
- cero severidad crítica o alta abierta.

## G3-5 — Publicación piloto

- aprobación humana explícita;
- rollback;
- monitoreo;
- usuarios ficticios o base jurídica habilitante;
- aviso de demo;
- alcance y fecha de expiración;
- soporte definido.

## Definition of Done por corte

Un corte termina solo cuando:

1. SPEC aprobada.
2. Código revisado.
3. Migración y rollback probados.
4. Pruebas reproducibles PASS.
5. Seguridad y aislamiento PASS.
6. Documentación y estado actualizados.
7. Commit y push identificados.
8. Limitaciones declaradas.
9. Próximo paso no se ejecuta sin autorización.
