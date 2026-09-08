# ADR-001 — Backend e identidad
Estado: pendiente de decisión; no stack elegido.
Comparar configuración de proveedor existente, capa contractual con integración y aplicación propia modular. Para cada opción: inversión inicial, gasto mensual, licencias, soporte, exportabilidad, dependencia, residencia de datos y límites. Presupuesto desconocido: no inventar cotización.
Diseño mínimo a revisar: organizations, users, memberships, contracts, contract_assignments, services, reservations, boarding_events, extra_requests, evidence, approvals, reconciliation_snapshots y audit_events.
Aislamiento organizacional y contractual en servidor; transacciones para cupos; estados/versiones con control de concurrencia; zona America/Santiago; snapshots al cerrar; archivos de evidencia con acceso privado.
No heredar permisos globales del prototipo. Distinguir conductor/operador y administrador técnico/mandante económico. QA debe intentar acceso directo, ID ajeno y cambios posteriores al cierre.
Antes de pedir decisión presentar opciones concretas y alcance implementable. No instalar infraestructura paga ni migrar datos reales hasta autorización correspondiente.
