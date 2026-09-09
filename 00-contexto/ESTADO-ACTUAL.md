# Estado de continuidad — 2026-09-09 (Corte 1 autorizado en simulación)
## Base recibida
Proyecto_Enjoy en `perrotbr-tech/controltrazabilidad`, tronco `claude/proyecto-agente-ia-lazwio`. Paquete `SPECDRIVE_FASE_3/` incorporado. Copia de trabajo: `09-plataforma/app/`. Baseline intacto: `09-plataforma/prototipo-actual/`.

## Decisiones
DEC-001…DEC-013 conservadas. **DEC-014…DEC-031 aprobadas** el 2026-09-09. **DEC-032 aprobada** el 2026-09-09:
- **DEC-032**: config actual **8 salidas** (23:00 reservable + 00:15…06:45); T0=23:00 ancla y primera salida real; proyección derivada (no 480 fijo). Sustituye solo el “7 salidas” de DEC-022; resto DEC-022 vigente.
- Híbrido con confirmación obligatoria (014/017); ventana **T−48h / T−2h** configurable (015).
- Post-bloqueo = excepción + manifiesto versionado (016/023).
- Orden de cortes 1→4 (019); arquitectura PWA+Supabase+Vercel **solo planificada** (021, sin cuentas/despliegue).
- Config operacional actual: 8 salidas, T0 23:00, última 06:45, 4 vans, 15/van, 2 extras/jornada (022 resto + 025 + **032**).
- QR ID interno aleatorio (027); extra ex post hasta 12:00 día siguiente America/Santiago (028).
- 90/93 = parámetros piloto (029); geodatos anonimizados (030); fijo contractual no automático (031).

## Hecho / declarado / pendiente
- G3-0: impacto F3, contradicciones, preguntas humanas — **cerrado**.
- T-15: **PASS CON LIMITACIONES**. Pendiente: E2E específica 003b alineada a 8 salidas, T-10 huso.
- SPEC-003 **superada por SPEC-003b** en horarios/cantidad (DEC-022); **DEC-032** actualiza catálogo a 8 salidas con 23:00 reservable.
- Criterios Corte 1: `04-especificaciones/SPEC-CORTE-1-inscripcion-hibrida.md` — **construcción simulada autorizada**.
- Configurables vs invariantes: `06-gobernanza/configurables-vs-invariantes.md` (DEC-032).
- T-21 / SPEC-008: CI GitHub Actions verificado; sin deploy.
- **Construcción Corte 1**: autorizada solo como simulación en `app/` (sin backend).

## Trabajo de esta sesión
- **DEC-032 registrada**; SPEC-CORTE-1 y configurables alineados.
- **Corte 1 simulación implementada** en `09-plataforma/app/` (`trazabilidad_v4`): ventana T−48/T−2, estados híbridos, 8 salidas con 23:00 reservable, UI trabajador, `scripts/check-corte1.cjs` 22/22.
- QA independiente: PASS CON LIMITACIONES (XSS corregido).
- Sin commit/push/PR hasta autorización del dueño. Sin backend/deploy.
1. Presentar ficha costo/región/seguridad/respaldo/migración (DEC-021) antes de cualquier recurso externo.
2. Alinear T-18/E2E a 8 salidas tras DEC-032.
3. SPEC-004 con sectores anonimizados (DEC-030) cuando haya planilla/B1.
4. Cortes 2–4 según DEC-019 (siguen sin autorización de construcción).

## Estado técnico
HTML local con reglas de capacidad/extras/horario demo. CI de PR cubre scripts Node y E2E del prototipo. La simulación del Corte 1 en navegador **no** es seguridad ni concurrencia de producción. Migración a PWA+Supabase requiere ficha DEC-021.
