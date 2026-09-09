# Tareas de continuación
| ID | Trabajo | Estado / alcance | Cierre |
|---|---|---|---|
| T-01 | Baseline, horarios, permisos, semilla y almacenamiento previo | **Permisos: hecho** (SPEC-002). Pendiente menor: versionado/migración localStorage post-003b (Q-003b-1), `reset` demo (QA D-3) | SPEC de defecto + reproducción + prueba |
| T-02 | Fuentes/IDs/CSV y V-10 | V-10 parcial; pendiente PDF fechado AllRide y demo (DEC-011, contacto humano) | URLs y matriz coherentes |
| T-03 | SPEC-001 alta trabajador y cadena de acceso | D1–D6 decididas (DEC-006/010); **ampliar con DEC-014/015/017/023** (híbrido, ventana, no auto-confirmar). Plantilla 12 secciones + Corte 1 | AC y política definidos |
| T-04 | ADR-001 / ADR-F3-001 backend y costo | **DEC-021**: arquitectura recomendada PWA+Supabase+Vercel; falta ficha costo/región/seguridad/respaldo/migración antes de implementar | Ficha concreta para Eduardo |
| T-05 | Implementar Corte 1 (identidad + inscripción híbrida) | Depende de: aprobación de construcción + (si backend) ficha DEC-021. Simulación `app/` solo con autorización explícita | AC de SPEC-CORTE-1 |
| T-06 | S4 operación Enjoy | Datos/entrevistas pendientes | As-is y contrato anonimizado |
| T-07 | S5 síntesis comprar/configurar/construir | Depende de evidencia + DEC-011 | Recomendación con costos |
| T-08 | Extras/evidencia/cierre inmutable | Cubierto en Corte 3 (DEC-019) + SPEC-005 / F3-004 | Cierre reproducible |
| T-09 | SPEC-003 configuración | **Superada en horarios por SPEC-003b (DEC-022)**; capacidad/extras vigentes como config | — |
| T-11 | SPEC-004 puntos/sectores y sentido | **SPEC creada**; depende planilla anonimizada + DEC-030; no duplica F3-001 | Sectores, paradas, sentido |
| T-12 | Maestro de vehículos / TTEPRIV | Corte 2; capacidad real por patente | Extra valida vehículo habilitado |
| T-13 | SPEC-003b horario y demanda | Implementada; T-15 PASS CON LIMITACIONES | Salvedades E2E/T-10 |
| T-14 | SPEC-005 extra ex post | **SPEC creada** (DEC-009/028/026); Corte 3; no duplica F3-002/004 | Plazo 12:00 + validación mandante |
| T-15 | QA independiente SPEC-003b | **PASS CON LIMITACIONES** (2026-09-09). Abierto: E2E 003b, T-10, doc 16/16 (doc hecha), Q-003b-1 | Informe + evidencia |
| T-16 | MVP móvil en línea (cortes DEC-019) | Reordenado: 1 inscripción · 2 abordaje · 3 extras/PDF · 4 GPS. Bloqueado a ficha DEC-021 para infra | Cada corte con SPEC, prueba y QA |
| T-17 | SPEC-006 posición van | Corte 4; DEC-024/030; emisor = operador contratista | AC aislamiento y retención |
| T-10 | Huso America/Santiago | **Pendiente**; requerido por salvedad T-15 y AC Corte 1 (reloj controlado) | Prueba cruce medianoche / DST |
| T-18 | E2E específica SPEC-003b | Nueva: 7 salidas, horario H-022, proyección referencial bajo config | Script + capturas |
| T-19 | Ficha pre-implementación DEC-021 | Costo, región, seguridad, respaldo, migración; sin crear cuentas | Aprobación humana de construcción |
| T-20 | Alinear SPECDRIVE_FASE_3 a T−48h / DEC-024 | **Hecha en corrección QA 2026-09-09** (LEEME, modelo, flujos, F3-005, fuentes, plan-agentes, investigación) | Docs F3 coherentes con DEC-015/024 |
| T-21 | CI básico GitHub Actions pre–Corte 1 (SPEC-008) | **Hecha**: workflow en PR, Node 22, permisos `contents: read`, checks + E2E Playwright 1.55.1; sin secretos ni deploy; `app/` intacta | Workflow verde en PR + `validate-ci-local.cjs` PASS |

El alcance actual no incluye módulos mineros literales, alojamiento o alimentación. Evitar dividir el MVP en múltiples servicios antes de justificarlo. **No implementar Corte 1 sin aprobación explícita del dueño.**
