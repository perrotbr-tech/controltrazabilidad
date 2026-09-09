# Cuestionario etapa 2 — lo que necesito para cerrar el MVP con el mínimo de tokens
Estado 2026-09-09: varias preguntas quedaron **cerradas por DEC-014…031** (ventana, extras ex post, GPS van, arquitectura recomendada, geodatos anonimizados). Lo que sigue abierto es la **ficha T-19 (DEC-021)** y autorización de construcción. No tratar “opción sugerida no respondida” como DEC.

Responde en un solo mensaje, con el número y una línea. Donde hay opción sugerida, basta "ok". Lo que no respondas se toma con la opción sugerida y queda registrado como supuesto — **salvo** que ya exista DEC explícita.

## A. Geolocalización de ruta "estilo Uber" (SPEC-006)
| # | Pregunta | Opción sugerida |
|---|---|---|
| A1 | ¿Qué se geolocaliza: la **van** (conductor, teléfono del contratista) o el **trabajador**? | Solo la van. Rastrear personas en continuo choca con la Ley 21.719 (H-001) y con el límite de producto ya decidido |
| A2 | ¿Quién ve la posición de la van en vivo? | Trabajador con reserva confirmada en esa salida (solo su van); contratista y mandante ven todas |
| A3 | ¿Qué se guarda después del viaje? | Solo eventos: salida del hotel, llegada a cada parada, fin de ruta, con hora y coordenada. No el rastro completo |
| A4 | ¿Con qué se captura la posición? | GPS del teléfono del conductor desde la app móvil, al pulsar "Iniciar ruta" |
| A5 | ¿Se necesita mapa con calles (proveedor externo) o basta un esquema con paradas y avance? | Para el MVP, mapa abierto sin cuenta ni costo (OpenStreetMap con Leaflet); se decide proveedor pago en G2 |

## B. Puntos de ruta (SPEC-004)
| # | Pregunta | Opción sugerida |
|---|---|---|
| B1 | ¿Me autorizas a agrupar las 312 calles de la planilla en sectores para proponer paradas? Necesito geocodificar direcciones anonimizadas (calle sin número + Antofagasta) con un servicio abierto | Sí, con calles sin número y sin nombres |
| B2 | ¿Cuántas paradas por ruta como máximo tolera el ciclo de ~50 y ~30 minutos? | 6 Norte, 4 Sur, como hoy |
| B3 | ¿Las 4 vans salen todas a la misma hora en cada salida, o se reparten? | Todas a la misma hora, 2 por ruta |

## C. Versión móvil en línea (SPEC-007 / ADR-001)
| # | Pregunta | Opción sugerida |
|---|---|---|
| C1 | ¿Quién tendrá la cuenta de hosting? | Eduardo, en Vercel (plan gratuito); el Supervisor prepara el proyecto y Eduardo pulsa "deploy" |
| C2 | ¿Dominio propio o subdominio del proveedor? | Subdominio gratuito para el MVP |
| C3 | ¿Datos compartidos entre celulares? Hoy cada navegador guarda lo suyo. Para que el mandante vea la reserva del trabajador hace falta un backend | Sí: Supabase (Postgres + auth, plan gratuito), en ADR-001 con costo verificado antes de contratar |
| C4 | ¿Se aceptan datos ficticios en la versión en línea hasta tener contrato de encargo de datos (V-08)? | Sí, ficticios hasta firmar |
| C5 | ¿Instalación como app en el celular (PWA, "añadir a pantalla de inicio") o app de tienda? | PWA; tiendas fuera de alcance |

## D. Conciliación y extras
| # | Pregunta | Opción sugerida |
|---|---|---|
| D1 | Plazo para presentar el extra ex post (DEC-009) | Hasta las 12:00 del día siguiente |
| D2 | ¿Quién valida el extra ex post en el mandante? | Supervisor del mandante (Patricia en la demo) |
| D3 | ¿La conciliación mensual se emite en PDF descargable? | Sí, una página, correlativo CT-AAAA-NN |
| D4 | ¿Tarifa por van extra real y monto fijo real del contrato? | Se mantienen los de demo hasta recibir el contrato (V-05) |

## E. Datos que faltan (adjuntar cuando existan)
- E1 Contrato de transporte, aunque sea anonimizado (V-05).
- E2 Patentes e inscripción TTEPRIV de las vans (V-07), sin datos del conductor.
- E3 Respuesta de AllRide a las preguntas de S2b (DEC-011).
- E4 Planilla semanal siguiente, solo con las columnas: n° interno, calle sin número, fin de turno, salida transfer.
