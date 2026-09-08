# S2 — Soluciones existentes y análisis comprar / configurar / integrar / construir (L4–L5)

**Modo:** RESEARCH · **Sesión:** 2026-09-08 · **Preguntas cubiertas:** P11, P12 (P13–P14 parciales, requieren datos del cliente)

> Advertencia de evidencia: la información de productos proviene de material del propio proveedor. Se etiqueta como **declarada**, no como observada. Ninguna cifra de resultados se toma como prueba sin cliente identificable y métrica verificable.

---

## H-008 · Existe un competidor directo en Chile para la capa de reserva y operación de transporte de personal
**Tipo:** declarada (proveedor) · **Confianza:** media-alta en que existe y qué ofrece; baja en resultados

(cite index="35-1">AllRide se presenta como la plataforma que digitaliza, controla y optimiza el transporte de personal en faenas mineras sin cambiar los proveedores de transporte, con trazabilidad de pasajeros, control de abordaje, reserva de asientos y optimización de rutas</cite>. Declara (cite index="35-1">lista de espera para capturar sobrecupos, soporte para turnos rotativos, right-sizing (vehículos más pequeños con baja demanda), evaluación de refuerzos ante sobredemanda e integración con sistemas de nómina y acreditación</cite>. (cite index="37-1">Genera reportes de ocupación por ruta y horario, puntualidad por parada, detalle de pasajeros por viaje, reservas, cumplimiento contractual del proveedor y calificaciones del servicio</cite>. Escala declarada: (cite index="38-1">operaciones activas en México, Chile y Perú, más de 100 empresas de transporte y más de 200 clientes corporativos conectados</cite>.

**Lectura honesta:** su ejemplo comercial muestra literalmente "Ruta Antofagasta › Faena · 5/8 asientos reservados · 3 en lista de espera" — es la misma funcionalidad que el prototipo construyó (reserva, lista de espera, refuerzo por sobredemanda), ya en mercado, con app de pasajero, GPS y modelo de dos lados (transportista + cliente corporativo). **La capa de reserva y operación de transporte es un commodity con un jugador maduro en Chile.**

**Vacío V-10:** qué cubre exactamente su "cumplimiento contractual del proveedor" — ¿KPI operacionales o conciliación económica (fijo + extras con causal, autorización y evidencia)? Requiere demo o documentación. Es la pregunta que decide el diferenciador.

---

## H-009 · La acreditación de contratistas es un espacio ocupado por grandes mandantes y verificadores regulados
**Tipo:** declarada + normativa · **Confianza:** alta

(cite index="40-1">Codelco implementó desde enero de 2024 una plataforma propia (Sucal) de control y acreditación de contratistas, integrada con Registro Civil, AChS, Previred, Equifax y Mineclass, y proyecta un "pasaporte minero" con módulo disponible para otras empresas del sector en 2026</cite>. Existen además servicios de larga trayectoria: (cite index="41-1">Subcontrataley declara 18 años en Chile combinando autogestión del proveedor con validación documental por equipo especializado</cite>.

Y el marco lo convierte en un servicio regulado, no solo en software: (cite index="45-1">el cumplimiento laboral y previsional del contratista se acredita mediante certificados de la Inspección del Trabajo u otros medios idóneos reglamentados, y la Subsecretaría del Trabajo mantiene un listado de entidades de verificación consideradas competentes</cite>.

**Lectura:** construir acreditación de contratistas significa competir con plataformas de mandantes gigantes y con verificadores certificados. **No es terreno para construir; a lo sumo, integrar.** Cierra la oportunidad que H-003 había abierto.

---

## H-010 · Patrón transferible: caducidades, bloqueo por documento vencido y verificación en el punto de acceso
**Tipo:** declarada (proveedor europeo) · **Confianza:** media

(cite index="44-1">Las plataformas de coordinación de contratas (ej. Dokify, España) notifican automáticamente al acercarse el vencimiento de un documento y verifican en el punto de acceso, mediante QR, el estado documental del trabajador o equipo, bloqueando el acceso si falta un requisito</cite>.

**Aplicación directa a H-002:** una **van adicional** debería validarse igual — patente con inscripción TTEPRIV vigente, revisión técnica y conductor habilitado — antes de despacharse. Es un patrón, no un producto que comprar.

---

## Análisis comprar / configurar / integrar / construir

| Capa | Estado del mercado | Recomendación preliminar | Fundamento |
|---|---|---|---|
| Reserva, lista de espera, refuerzos, app pasajero, GPS, abordaje | Commodity con jugador chileno maduro (H-008) | **Comprar / configurar** — no construir | Construirlo compite con 200+ clientes y app en tres países; el prototipo ya validó el lenguaje, no el mercado |
| Acreditación documental de contratistas | Dominado y regulado (H-009) | **Integrar** cuando se necesite; nunca construir | Verificadores idóneos por reglamento; Codelco abre su plataforma al sector |
| Habilitación de vehículos y vigencias (TTEPRIV, RT, licencia) | Patrón conocido (H-010), sin producto local identificado para transporte de personal pequeño | **Construir como regla** dentro de la capa contractual | Es pequeño, específico y ligado a H-002 |
| **Capa contractual-económica**: contrato como fuente de verdad, extras con causal-autorización-evidencia, conciliación fijo + extras respaldados, indicadores separados del pago, multiservicio | **Vacío V-10** — no confirmado si AllRide u otros lo cubren | **Candidato a construir** — el único diferenciador defendible hoy | Coincide con la hipótesis del brief y con H-001/H-003; pero la decisión no puede tomarse sin cerrar V-10 |

## Tres caminos para G2 (no se elige aquí)

- **Camino A — Capa encima:** configurar/integrar una plataforma de transporte existente para la operación, y construir solo la capa contractual-económica multiempresa. Menor costo y riesgo; dependencia de un tercero; requiere API (vacío V-11).
- **Camino B — Construir todo:** el prototipo evoluciona bajo especificación completa. Máximo control; compite frontalmente con un jugador maduro en su terreno más fuerte; costo desproporcionado para un piloto de 300 personas y 4 vans.
- **Camino C — Servicio + capa:** Kingdom Legacy implanta y configura la solución de transporte para el Enjoy como asesoría, y desarrolla la capa de control contractual como producto propio reutilizable. Es el más cercano a la posición actual de Eduardo.

**Criterio del manual que pesa aquí:** "costo de implantación proporcional al ahorro o riesgo reducido". Para el Enjoy (300 personas, 4 vans, un contrato), B difícilmente lo cumple.

## Vacíos declarados
- **V-10** Alcance real del "cumplimiento contractual" en AllRide — ¿cubre conciliación económica? Demo o ficha técnica.
- **V-11** Disponibilidad de API/exportación en las plataformas candidatas para integrar la capa contractual.
- **V-12** Precio y modelo de licencia por pasajero/vehículo — no publicado; solicitar.
- **V-13** Ahorro medible en el Enjoy (P13): cuántas horas de coordinación, extras discutidos y tiempo de conciliación hay hoy — dato del cliente (ver guía de entrevistas).

## Impacto sobre las hipótesis del prototipo
- La hipótesis del brief "el valor está en excepciones y evidencia, no en reservar" → **fortalecida**: reservar ya lo hace el mercado.
- HIP-05 (indicadores no sustituyen conciliación) → es exactamente donde está el diferenciador candidato; **pendiente de V-10**.
