# SPEC-003 — Configuración operativa real del Enjoy (vans, capacidad y viajes)
Estado (PLANTILLA-SPEC): **Borrador — bloqueada por V-16**. Propietario humano: Eduardo Perrot.
Origen: declaración del dueño 2026-09-08 ("las 24 viajes son de 4 vans diferentes, cerca de 15 pasajeros") · DEC-004 (ventana 23:00–06:00, 8 salidas/ruta/noche) · invariante CLAUDE.md "dos rutas y cuatro vans de cuatro plazas son configuración del prototipo; rutas, tarifas, domicilios y montos necesitan respaldo del cliente".

## 1. Problema y resultado
El prototipo (baseline y `app/`) codifica: 2 rutas, 2 vans por ruta, **4 cupos por van**, 8 salidas por ruta por noche (16 salidas), extra = 1 van adicional de 4 cupos, proyección mensual 30 × 8 × 2 = 480 servicios. El dueño declara ahora 24 viajes, 4 vans distintas y cerca de 15 pasajeros. Si "15" es la capacidad de cada van, el prototipo subestima la capacidad casi cuatro veces y todos los casos de prueba de lista de espera (11 solicitudes / 8 cupos) dejan de representar la operación real. Resultado esperado: prototipo con la configuración real declarada, sin cambiar reglas contractuales ni fórmulas.

## 2. Evidencia
- Declarada (dueño, 2026-09-08): 24 viajes, 4 vans, ~15 pasajeros. Sin documento de contrato ni planilla del transportista (V-05, V-07).
- Declarada (DEC-004): 1 salida por hora, 23:00–06:00.
- Inferencia del Supervisor (no verificada): 24 viajes por noche entre 4 vans = 6 viajes por van; con 8 horas de ventana no todas las vans salen todas las horas, o hay 3 salidas por hora repartidas. Ninguna lectura cierra sola.

## 3. Alcance
Incluido: parámetros de la semilla y del contrato en `09-plataforma/app/index.html` (capacidad por van, vans por ruta, salidas por noche, textos del contrato, casos de prueba sembrados, proyección mensual, texto "+4 (1 van)" en solicitud de extra), `scripts/check-baseline.cjs` (aserción "ocho salidas por jornada y ruta").
Excluido: fórmulas de indicadores, estados del extra, permisos, conciliación. Baseline `prototipo-actual/` intacto.

## 4. Requisitos (borrador)
- REQ-010 La capacidad por van, el número de vans, las rutas y las salidas por noche son parámetros del contrato, no constantes dispersas en el código (hoy `R.vans*4` en la semilla y "+4 (1 van)" en el texto ignoran `contrato.capacidadVan`).
- REQ-011 Los casos sembrados (extra #1 cuantitativo, #2 operacional observado, #3 rechazado) se regeneran en proporción a la capacidad real para seguir demostrando lista de espera y extra.
- REQ-012 La proyección mensual usa salidas reales por noche × rutas × días del período, con etiqueta "mes parcial" cuando corresponda.

## 5. Reglas de negocio
Sin cambio: fijo separado del uso; extra con causal, autorización y evidencia; observado no concilia sin subsanar o excluir.

## 8. Criterios de aceptación (a completar cuando V-16 se cierre)
- AC-01 Con los parámetros reales, `check-baseline.cjs` verifica N salidas por jornada y ruta según contrato (no "8" fijo).
- AC-02 Ningún texto de pantalla muestra "4 cupos" o "+4" si la capacidad configurada es distinta.
- AC-03 La demanda sembrada produce al menos una salida con lista de espera y una con capacidad disponible, con la capacidad real.
- AC-04 `check-permisos.cjs` sigue 21/21.

## 11. Riesgos y decisiones abiertas — preguntas al dueño (V-16)
| # | Pregunta | Por qué importa |
|---|---|---|
| Q1 | ¿"15 pasajeros" es la **capacidad** de cada van o el **promedio** de personas que viajan por salida? | Define cupos y lista de espera |
| Q2 | ¿"24 viajes" es el total **por noche** sumando las 4 vans (6 por van), o es por ruta, o por día completo? | Define salidas por jornada y la proyección mensual |
| Q3 | ¿Se mantienen las **2 rutas** (Norte/Sur) y la ventana **23:00–06:00** de DEC-004? | Compatibilidad con DEC-004 |
| Q4 | ¿Las 4 vans son del mismo contratista y el "extra" sigue siendo una van adicional completa? | Modelo del extra y tarifa contractual |
| Q5 | ¿Existe planilla o contrato con estos datos que se pueda adjuntar (anonimizado)? | Pasa de "declarado" a "contractual" (V-05) |

Regla: mientras Q1–Q3 no tengan respuesta, no se modifica la semilla; el prototipo sigue marcado como "configuración a verificar".

## 12. Aprobaciones
Producto/Operación: Eduardo (pendiente). Técnico: revisor-qa tras implementación.
