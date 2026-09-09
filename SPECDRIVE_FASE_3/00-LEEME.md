# SPECDRIVE FASE 3 — Proyecto Enjoy

Fecha de preparación: 2026-09-09  
Propietario humano: Eduardo Perrot  
Estado: paquete de decisión y ejecución supervisada; no autoriza despliegue ni uso de datos reales.

## 1. Resultado esperado

Transformar la demo en un MVP móvil multiusuario cuyo centro no sea comprar un pasaje, sino resolver el traslado operacional:

1. El sistema precarga una propuesta desde la nómina o turno.
2. El trabajador confirma o cambia horario, sentido y parada.
3. Cada jornada abre en T−48h y se bloquea en T−2h (DEC-015; configurables por jornada).
4. El contratista despacha vehículos, controla abordajes y aporta evidencia.
5. El mandante supervisa excepciones, extras, niveles de servicio y conciliación.
6. El sistema recomienda acciones, pero nunca aprueba extras ni cambia pagos automáticamente.

## 2. Regla canónica de la jornada (DEC-015 / DEC-022)

- Apertura: **48 horas** antes de la primera salida de la jornada.
- Bloqueo: **2 horas** antes de la primera salida.
- Configuración operacional actual: primera salida **23:00**; apertura 48 h antes a las **23:00**; bloqueo a las **21:00**.
- Zona: America/Santiago; reloj del servidor.
- T0, catálogo de salidas, apertura/bloqueo y flota son **configurables por jornada**, nunca fijos en código.
- Ventana efectiva de autoatención con la config actual: 46 horas.
- Después del bloqueo el trabajador no puede inscribirse, cancelar ni cambiar por autoservicio.
- Los servicios de madrugada pertenecen a la fecha operacional iniciada en T0.
- Un cambio posterior al cierre es una excepción, no una reserva ordinaria.
- Proyección de servicios: fórmula derivada de la configuración (no hardcodear 8/480 ni 7/420 como invariantes).

## 3. Orden obligatorio de lectura para Claude Code

1. 01-brief-ejecutivo.md
2. 02-investigacion-mineria-y-opciones.md
3. 03-modelo-hibrido-funcional.md
4. 04-reglas-restricciones.md
5. 05-roles-permisos-vistas.md
6. 06-flujos-y-estados.md
7. 07-modelo-datos-e-indicadores.md
8. 08-especificaciones/
9. 09-arquitectura/ADR-F3-001-mvp-multiusuario.md
10. 10-validacion/
11. 11-gobernanza/

## 4. Integración con el repositorio existente

- Copiar esta carpeta en la raíz de perrotbr-tech/controltrazabilidad.
- No borrar ni renumerar DEC-001 a DEC-013.
- Registrar nuevas decisiones desde DEC-014.
- Revisar impacto sobre SPEC-001, 003b, 004, 005, 006 y 007.
- Si una regla nueva contradice una SPEC anterior, actualizarla con trazabilidad; no crear una regla duplicada.
- Mantener 09-plataforma/prototipo-actual/ intacto.
- Trabajar solo sobre 09-plataforma/app/ o la nueva aplicación acordada por ADR.

## 5. Prohibiciones

- No desplegar, crear servicios externos ni cargar datos reales sin aprobación humana.
- No usar nombres, RUT, teléfonos o direcciones exactas en datos de prueba.
- No permitir que el usuario elija o se autoasigne un rol.
- No prometer un cupo inexistente ni transportar sobre la capacidad autorizada.
- No convertir indicadores de uso en descuentos o pagos automáticos.
- No afirmar cumplimiento legal sin evidencia oficial vigente.

## 6. Inicio rápido

Usar el texto de PROMPT-INICIO-CLAUDE-CODE.txt. La primera ejecución debe producir análisis de impacto y plan; no código.
