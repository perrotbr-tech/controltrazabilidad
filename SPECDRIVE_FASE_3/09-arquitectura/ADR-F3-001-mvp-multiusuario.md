# ADR-F3-001 — Arquitectura del MVP multiusuario

Estado: PROPUESTA; requiere decisión humana y verificación actual de costos.

## Contexto

El HTML con localStorage demuestra reglas, pero no ofrece autenticación, concurrencia, permisos de servidor, sincronización ni auditoría confiable.

## Alternativas

### A. PWA web + Supabase

- Frontend móvil instalable.
- Postgres, autenticación y políticas por fila.
- Funciones de servidor para cierre, capacidad y conciliación.
- Adecuado para piloto de bajo costo.
- Requiere verificar región de datos, límites, respaldo, salida del proveedor y precio vigente.

### B. PWA web + Firebase

- Autenticación y tiempo real maduros.
- Reglas documentales.
- Menor ajuste natural para conciliación relacional y multiempresa compleja.

### C. Node/Postgres administrado

- Control y portabilidad mayores.
- Más trabajo de operación, monitoreo, respaldo y seguridad.

## Recomendación condicionada

Seleccionar A para el piloto ficticio si una prueba técnica confirma:

- aislamiento por organización y contrato;
- transacciones de capacidad;
- tareas programadas en America/Santiago;
- exportación y respaldo;
- costos dentro del límite aprobado;
- política de datos aceptada.

No crear cuentas, proyectos ni desplegar sin aprobación.

## Cortes verticales

1. Autenticación, organizaciones, turnos, propuesta y confirmación con T−24/T−2.
2. Despacho, manifiesto y abordaje.
3. Excepciones, extras, auditoría y conciliación.
4. GPS de van como capacidad posterior, no bloqueante del MVP inicial.

## Controles técnicos

- políticas de fila y API con pruebas adversariales;
- operaciones de capacidad en transacción;
- reloj del servidor;
- timestamps UTC y fecha operacional America/Santiago;
- auditoría append-only;
- validación de entrada y escape de salida;
- secretos solo en variables del entorno;
- datos ficticios separados de producción;
- respaldo, recuperación y observabilidad definidos antes del piloto real.

## Decisiones humanas pendientes

- proveedor y cuenta propietaria;
- presupuesto máximo mensual;
- región y tratamiento de datos;
- dominio;
- correo transaccional;
- retención;
- aprobación de despliegue;
- fecha y grupo del piloto.
