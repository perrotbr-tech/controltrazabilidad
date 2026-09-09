# SPEC-007 — MVP móvil en línea (multiusuario real)
Estado: **Borrador — arquitectura recomendada DEC-021; sin despliegue.** Propietario humano: Eduardo Perrot.
Origen: DEC-019 · DEC-021 · SPEC-001 · SPEC-CORTE-1 · ADR-001 · ADR-F3-001.

## 1. Problema y resultado
El HTML vive en un solo navegador. Resultado: PWA instalable con datos compartidos y permisos en servidor, por cortes.

## 3. Alcance
Incluido a término: PWA, auth enlace de un solo uso (DEC-010 D3), datos compartidos, reglas de negocio en servidor.
Excluido ahora: crear cuentas, producción, datos reales, despliegue público.

## Plan de construcción (DEC-019 — reemplaza el orden anterior de esta SPEC)
1. **Corte 1** — Identidad e inscripción híbrida (SPEC-CORTE-1; T−48h/T−2h; propuesta≠confirmación).
2. **Corte 2** — Despacho, manifiesto y abordaje (QR DEC-027; operador contratista DEC-024).
3. **Corte 3** — Excepciones, extras (SPEC-005) y conciliación PDF (F3-004).
4. **Corte 4** — GPS van (SPEC-006).

## ADR
Ver `05-arquitectura/ADR-001-backend.md`. Opción A (Vercel+Supabase) recomendada; ficha T-19 obligatoria antes de implementar.

## Requisitos transversales
- REQ-030 Permisos en servidor; QA adversarial.
- REQ-031 America/Santiago en servidor y pruebas con reloj controlado.
- REQ-032 Semilla ficticia; interruptor modo demostración.
- REQ-033 Parámetros de jornada configurables (DEC-022); sin 480/420 fijos.

## 11. Decisiones pendientes de construcción
Ficha DEC-021 (T-19); autorización explícita de código; V-04/V-08 para datos reales.
