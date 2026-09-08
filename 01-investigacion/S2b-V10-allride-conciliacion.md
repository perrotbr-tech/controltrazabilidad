# S2b — Cierre parcial de V-10: ¿AllRide cubre conciliación económica contractual?

**Modo:** RESEARCH · **Sesión:** 2026-09-08 · **Autorización:** DEC-001 + DEC-007 · **Ejecutó:** especialista `investigador` (12 consultas) · **Integró:** Supervisor

> **Limitación material del método.** El proxy de salida del entorno bloqueó `allrideapp.com`, `apps.apple.com` y `web.archive.org`. Ninguna página primaria se cargó. Toda la evidencia proviene de fragmentos indexados por buscador. Por eso ningún hallazgo alcanza confianza alta y todos son **declarados (material comercial)**, no observados en producto. Para convertirlos en "observada" basta guardar en PDF fechado las cuatro URL de H-016/H-017 desde un navegador sin bloqueo.

## Pregunta
¿AllRide cubre fijo mensual separado de extras, extras con causal + autorización del mandante + evidencia (patente, salida, manifiesto) y cierre de período con documento reproducible? ¿O su "cumplimiento contractual del proveedor" son KPI operacionales?

## Hallazgos

### H-016 · AllRide declara funciones económicas, no solo KPI
**Tipo:** declarada (fragmento de buscador) · **Confianza:** media
Declara "Conciliación de facturas contra servicios ejecutados", "reportes de facturación", "estados de pago" automáticos, asignación de costos "según pasajeros transportados, kilómetros recorridos u otros criterios acordados" y "costos por ruta, proveedor, área y período".
Fuentes (consulta 2026-09-08): https://allrideapp.com/allride-vs-samsara/ · https://allrideapp.com/software-empresas-transporte-personal/ · https://allrideapp.com/transporte-personal-mineria/

### H-017 · Su "cumplimiento contractual" es verificación de ejecución operativa
**Tipo:** declarada · **Confianza:** media
"Cada ruta se realizó como fue contratada: puntualidad, recorrido, paradas y horarios"; "datos de ejecución real registrados y auditables"; "reportes de cumplimiento para auditar contratos con proveedores".
Fuentes: https://allrideapp.com/transporte-personal-mineria/ · https://allrideapp.com/rutas-transporte-personal/

### H-018 · Flujos de aprobación declarados; alcance sobre extras indeterminado
**Tipo:** declarada / inferida · **Confianza:** baja-media
"Flujos de aprobación para controlar y reducir costos"; estados de solicitud aprobada / confirmada / cancelada. No se pudo determinar si aplican a un extra sobre contrato fijo con causal tipificada.
Fuentes: https://allrideapp.com/digitalizacion-de-flotas/ · https://allrideapp.com/

### H-019 · No hallado en fuentes accesibles (ausencia de evidencia, no evidencia de ausencia)
**Tipo:** inferida · **Confianza:** baja
No aparece: (a) monto fijo mensual separado de extras; (b) causal del extra; (c) autorización del mandante como registro distinto de la evidencia; (d) evidencia patente/salida/manifiesto ligada al extra; (e) cierre de período reproducible e inmutable; (f) regla de que los KPI no generan descuentos.

### H-020 · (V-11) Integración y exportación declaradas
**Tipo:** declarada · **Confianza:** media-baja
"Reportes de cumplimiento exportables"; "integración con sistemas internos: SSO, HRMS y API". Sin documentación de API localizada.
Fuentes: https://allrideapp.com/software-empresas-transporte-personal/ · https://allrideapp.com/gestion-estacionamientos-empresas/

### H-021 · (V-12) Precio no publicado; homónimos a no confundir
**Tipo:** declarada · **Confianza:** media
Sin precio ni modelo de licencia público. "AllRide Apps" (G2, AlternativeTo, allrideapps.com) y las apps "allride Service" de App Store Paraguay parecen entidades distintas: no usarlas como fuente. Cobertura declarada hoy: Chile, México, Perú y Panamá (S2 registró tres países).

## Contradicciones y vacíos
- S2 dejó abierta la opción "solo KPI". Los fragmentos muestran que AllRide declara además conciliación factura–servicio ejecutado y estados de pago. La fila de S2 "Capa contractual-económica — candidato a construir" queda **debilitada en su primera mitad** (conciliación de lo ejecutado) y **sin resolver en la segunda** (fijo + extras con causal/autorización/evidencia, cierre reproducible).
- **V-10 queda parcialmente abierto.** Falta verificar en demo o ficha técnica los seis puntos de H-019.
- Riesgo de paráfrasis del buscador: las frases pueden no ser literales.

## Impacto en producto
- **HIP-05**: no refutada, pero el terreno se estrecha. El diferenciador defendible se reduce a: fijo/extras separados con causal; autorización del mandante distinta de la evidencia; cierre reproducible; mandante pequeño no minero con multiservicio (HIP-06).
- **HIP-B**: se mantiene fortalecida; AllRide vende auditabilidad y aprobación como valor.
- **Comprar/configurar/integrar/construir**: Camino B (construir todo) se debilita más. Caminos A y C siguen viables, condicionados a API (H-020) y a la demo. La recomendación de S2 no cambia hasta cerrar H-019.

## Cómo cerrar V-10 del todo
1. Captura primaria: PDF fechado de las cuatro URL de H-016/H-017 (Eduardo o Supervisor desde navegador sin bloqueo). Sin aprobación adicional.
2. Demo con preguntas cerradas: ¿modelo tarifario fijo vs variable por contrato? ¿Un extra requiere causal y aprobación del mandante antes de facturarse? ¿La evidencia queda ligada al extra? ¿Cierre de período inmutable? ¿Los KPI pueden generar descuentos automáticos? ¿API documentada y exportación? ¿Precio para 4 vans y 300 personas?
3. **El contacto comercial o demo requiere autorización explícita de Eduardo**: revela interés e identidad y no está cubierto por DEC-001/DEC-007.
