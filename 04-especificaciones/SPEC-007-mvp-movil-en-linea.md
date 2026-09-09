# SPEC-007 — MVP móvil en línea (multiusuario real)
Estado: **Borrador — requiere DEC de backend y de publicación** (manual, sección 11: publicar o desplegar siempre requiere humano). Propietario humano: Eduardo Perrot. Origen: instrucción del dueño 2026-09-08 ("versión para celular en línea, Vercel o algo relacionado"), ADR-001, SPEC-001 (DEC-010), SPEC-002, SPEC-006.

## 1. Problema y resultado
El HTML actual vive en un solo navegador: la reserva de Camila no la ve Rodrigo. Resultado: la misma app, instalable en el celular, con datos compartidos y permisos validados en servidor.

## 3. Alcance del MVP en línea
Incluido: interfaz actual convertida a PWA (manifest, ícono, "añadir a pantalla de inicio", funciona sin señal para consultar); autenticación por correo con enlace de un solo uso (DEC-010 D3); base de datos con las entidades de ADR-001; reglas de acceso en servidor equivalentes a `requirePermission` (SPEC-002 R2/R3) y a las reglas de negocio (tope por jornada, observado no concilia); despliegue en hosting estático + backend administrado.
Excluido en esta SPEC: geolocalización (SPEC-006, se apoya en esta base), integraciones con terceros, datos personales reales antes del contrato de encargo (V-08).

## ADR-001 — opciones concretas para decidir (sin cotización inventada; precios a verificar en la web del proveedor antes de contratar)
| Opción | Qué es | A favor | En contra | Costo de arranque |
|---|---|---|---|---|
| A. Vercel (estático) + Supabase (Postgres, auth, reglas por fila, tiempo real) | La interfaz actual, sin framework, sirviendo desde Vercel; datos y login en Supabase | Cero servidor propio; reglas de acceso por fila en base de datos; tiempo real para la posición de la van; planes gratuitos para piloto | Dependencia de dos proveedores; residencia de datos fuera de Chile (V-04) | Gratis para el piloto según planes publicados; verificar límites |
| B. Vercel + Firebase (Firestore, auth) | Igual que A con Google | Muy usado en móviles; tiempo real | Reglas de seguridad menos expresivas para multiempresa; modelo documental complica la conciliación | Gratis para piloto; verificar |
| C. Servidor propio (Node + Postgres en un VPS chileno) | Backend a medida | Control total y residencia en Chile | Operación, respaldos y seguridad a cargo del proyecto; más tiempo | Desde un VPS mensual; verificar |
**Recomendación del Supervisor:** A, por proporcionalidad (manual: "costo de implantación proporcional") y porque las reglas por fila cubren el aislamiento por organización y contrato. Decisión de Eduardo en G2/G4 abreviadas.

## Plan de construcción (3 cortes verticales, cada uno con SPEC breve y prueba)
1. Corte 1: PWA + login por correo + lectura de salidas y reservas desde la base (trabajador reserva; contratista ve demanda).
2. Corte 2: extras con estados, tope por jornada, validación ex post (DEC-009), evidencia y auditoría en servidor.
3. Corte 3: conciliación con cierre inmutable y PDF; luego SPEC-006 posición de la van.

## Requisitos transversales
- REQ-030 Ninguna regla de acceso vive solo en el cliente; QA intenta ID ajeno, contrato ajeno y mutación tras cierre (08-validacion/criterios.md).
- REQ-031 Zona horaria America/Santiago en servidor y base (T-10).
- REQ-032 Semilla ficticia en línea hasta contrato de encargo de datos; un solo interruptor "modo demostración".

## 11. Decisiones que faltan
C1–C5 del cuestionario; aprobación de proveedor (DEC), de publicación (DEC) y de uso de datos reales (DEC, después de V-08).
