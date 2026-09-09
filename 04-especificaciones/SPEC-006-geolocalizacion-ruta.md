# SPEC-006 — Seguimiento de la van en ruta ("estilo Uber", acotado)
Estado: **Borrador — requiere DEC** (datos personales y alcance). Propietario humano: Eduardo Perrot. Origen: instrucción del dueño 2026-09-08 ("conciliación geolocalización para ruta, estilo Uber"), H-001, H-002, H-013, H-014, cuestionario A1–A5.

## 1. Problema y resultado
El trabajador no sabe dónde viene la van ni cuánto falta; el mandante no tiene evidencia de que la ruta se ejecutó con sus paradas. Resultado: cada salida deja un **registro de ejecución** (salida del hotel, paso por cada parada, fin) con hora y coordenada, y el trabajador con reserva ve la van acercarse en un mapa.

## 2. Evidencia y límite
- H-001: rastrear personas en continuo es tratamiento de alto riesgo. **Se geolocaliza la van, nunca al trabajador.** El teléfono del trabajador no envía posición.
- H-013/H-014: el manifiesto y el registro de ejecución son la evidencia que venden los líderes; la posición en vivo es comodidad, la evidencia es el producto.
- H-002: la van rastreada debe ser un vehículo identificado (patente) — enlaza con el maestro de vehículos (T-12).

## 3. Alcance del MVP
Incluido: botón "Iniciar ruta" del conductor u operador del contratista (GPS del teléfono, envío cada 15–30 s mientras la ruta está activa); mapa con paradas y posición actual visible para el trabajador con reserva confirmada en esa salida y para contratista y mandante; eventos de parada registrados (automáticos por cercanía o manuales); al cerrar la ruta se conserva solo la lista de eventos, no el rastro.
Excluido: geocercas sobre personas, cámaras de fatiga, tracking fuera de la ruta activa, cálculo de tiempos de llegada con tráfico (queda como estimación por distancia).

## 4. Requisitos (borrador)
- REQ-020 La posición se asocia a `vehiculo` + `servicio`, nunca a `usuario` trabajador.
- REQ-021 Solo hay posición mientras la ruta está "activa"; al cerrar, se borra el rastro y quedan los eventos.
- REQ-022 El trabajador ve únicamente la van de su reserva confirmada; acceso por contrato y titularidad (SPEC-002 en servidor).
- REQ-023 Eventos de parada alimentan el manifiesto y la evidencia del extra (patente, salida, ruta efectiva; sección 6 del prompt original).
- REQ-024 Sin señal: el teléfono del conductor acumula eventos y sincroniza al recuperar red.

## 6. Autorización y datos
Responsable: mandante; encargado: plataforma (V-08). Retención de eventos: la misma que las reservas (DEC-010 D4). Base de licitud: ejecución del contrato. Evaluación de impacto recomendada antes del piloto real.

## 8. Aceptación (a completar)
AC: trabajador sin reserva no ve ninguna van · trabajador de contrato B no ve vans de A · al cerrar ruta no queda rastro · evento de parada con hora y coordenada por cada parada de la ruta · conductor sin señal sincroniza después.

## 11. Decisiones abiertas
A1–A5 del cuestionario. **Requiere backend (SPEC-007/ADR-001): la posición debe viajar entre teléfonos; no es posible en el HTML autónomo.**
