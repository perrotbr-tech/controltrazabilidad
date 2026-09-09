# Estado de continuidad — 2026-09-09 (CI pre–Corte 1)
## Base recibida
Proyecto_Enjoy en `perrotbr-tech/controltrazabilidad`, tronco `claude/proyecto-agente-ia-lazwio`. Paquete `SPECDRIVE_FASE_3/` incorporado. Copia de trabajo: `09-plataforma/app/`. Baseline intacto: `09-plataforma/prototipo-actual/`.

## Decisiones
DEC-001…DEC-013 conservadas. **DEC-014…DEC-031 aprobadas** el 2026-09-09 (ver `06-gobernanza/registro-aprobaciones.md`). Destacados:
- Híbrido con confirmación obligatoria (014/017); ventana **T−48h / T−2h** configurable (015).
- Post-bloqueo = excepción + manifiesto versionado (016/023).
- Orden de cortes 1→4 (019); arquitectura PWA+Supabase+Vercel **solo planificada** (021, sin cuentas/despliegue).
- Config operacional actual: 7 salidas, T0 23:00, última 06:45, 4 vans, 15/van, 2 extras/jornada (022/025); proyecciones calculadas, no fijas.
- QR ID interno aleatorio (027); extra ex post hasta 12:00 día siguiente America/Santiago (028).
- 90/93 = parámetros piloto (029); geodatos anonimizados (030); fijo contractual no automático (031).

## Hecho / declarado / pendiente
- G3-0: impacto F3, contradicciones, preguntas humanas — **cerrado** (sesión análisis previa).
- T-15: **PASS CON LIMITACIONES** (revisor-qa + scripts 16/16, 21/21, baseline PASS). Pendiente: E2E específica 003b, T-10 huso, Q-003b-1 migración localStorage.
- SPEC-003 **superada por SPEC-003b** en horarios/cantidad (DEC-022); documentado.
- SPEC-004 y SPEC-005 creadas (borrador/en revisión documental); no duplican F3-002/004.
- Criterios de aceptación Corte 1 redactados (`04-especificaciones/SPEC-CORTE-1-inscripcion-hibrida.md`).
- Configurables vs invariantes: `06-gobernanza/configurables-vs-invariantes.md`.
- **T-21 / SPEC-008**: CI GitHub Actions en cada PR (Node 22, `contents: read`, baseline+config+permisos, E2E Playwright 1.55.1). Validación local **PASS**. Sin secretos, sin deploy, **sin tocar `app/`**, **sin iniciar Corte 1**.
- **No hay** backend, cuentas externas ni despliegue.

## Trabajo de esta sesión
Infraestructura de verificación (SPEC-008): `.github/workflows/ci.yml`, `package.json`/`package-lock.json` (solo Playwright), `scripts/validate-ci-local.cjs`, `08-validacion/resultado-ci.md`. Rama `cursor/ci-github-actions-ac60`, PR Draft. Corte 1 no iniciado.

## Prioridad de arranque (próxima sesión — requiere aprobación explícita de construcción)
0. Presentar ficha de costo/región/seguridad/respaldo/migración (DEC-021) antes de cualquier recurso externo.
1. Corte 1: identidad + inscripción híbrida según SPEC-CORTE-1 / F3-001 ajustada a T−48h (simulación en `app/` solo si se autoriza; real tras ficha DEC-021).
2. Cerrar salvedades T-15 (E2E 003b, T-10) sin bloquear el diseño del Corte 1.
3. SPEC-004 con sectores anonimizados (DEC-030) cuando haya planilla/B1.
4. Cortes 2–4 según DEC-019.

## Estado técnico
HTML local con reglas de capacidad/extras/horario demo. CI de PR cubre scripts Node y E2E del prototipo. No autenticación real, no multiempresa en servidor, no cierre T−2h en servidor. La migración a PWA+Supabase requiere ficha DEC-021 y autorización de implementación.
