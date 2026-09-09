# ADR-F3-001 — Arquitectura del MVP multiusuario
Estado: **Arquitectura recomendada (DEC-021); sin despliegue.** Actualizado 2026-09-09.

## Contexto
El HTML con localStorage demuestra reglas, pero no ofrece autenticación, concurrencia, permisos de servidor, sincronización ni auditoría confiable.

## Alternativas
### A. PWA web + Supabase (+ Vercel)
Recomendada para el piloto ficticio (DEC-021).
### B. PWA web + Firebase
Menor ajuste natural para conciliación relacional multiempresa.
### C. Node/Postgres administrado
Mayor control/portabilidad; más operación.

## Recomendación condicionada
Seleccionar A **solo tras ficha** de: aislamiento org/contrato, transacciones de capacidad, tareas en America/Santiago, exportación/respaldo, costos, política de datos, migración.
**No crear cuentas, proyectos ni desplegar sin aprobación.**

## Cortes verticales (DEC-019)
1. Autenticación, organizaciones, turnos, propuesta y confirmación con **T−48h / T−2h** (DEC-015).
2. Despacho, manifiesto y abordaje.
3. Excepciones, extras, auditoría y conciliación PDF.
4. GPS de van (no bloqueante del MVP inicial).

## Controles técnicos
Políticas de fila y API con pruebas adversariales; capacidad en transacción; reloj servidor; UTC + fecha operacional America/Santiago; auditoría append-only; validación/escape; secretos en entorno; demo ≠ producción; respaldo y observabilidad antes del piloto real.

## Decisiones humanas pendientes para pasar a construcción
- Ficha T-19 (costo, región, seguridad, respaldo, migración).
- Autorización explícita de implementación del Corte 1.
- Dominio, correo transaccional, retención, V-08.
