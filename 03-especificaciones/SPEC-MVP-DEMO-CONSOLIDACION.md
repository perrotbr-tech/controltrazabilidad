# SPEC — MVP demostración: consolidación de reglas y UX

## Problema
La demo actual es técnica (PROPUESTO/CONFIRMADO, bloqueo, lista de personas en portada, “Ex Trabajador”) y falta un flujo completo entendible para presentación comercial.

## Origen
Instrucción supervisada de Eduardo (continuación MVP). Conserva DEC-014…033. No crea rol CONDUCTOR (DEC-006/024): el acceso “contratista o conductor” usa perfil CONTRATISTA con vistas operativas (ruta prevista).

## Alcance
Simulación en `09-plataforma/app/`, docs y pruebas. Sin backend, PII real, GPS, WhatsApp, QR, PDF, pagos, despliegue.

## Reglas visibles al trabajador
- Reservas y cambios hasta las 21:00 (T−2).
- Desde 21:00 solo excepciones justificadas.
- PROPUESTO → “Pendiente de confirmación”; CONFIRMADO → “Reserva confirmada”.
- Acciones: Solicitar cupo / Confirmar asistencia / Cambiar traslado / Cancelar solicitud.
- No mostrar “bloqueo” ni “Cierre de reservas salida: 22:00” al trabajador.
- Liberación provisional de cupos al turno siguiente: 20:00 (configurable).
- Una persona: máximo una reserva confirmada por jornada operacional.

## Contradicción resuelta (provisional)
DEC-006/024: conductor no es usuario de plataforma. Portal “contratista/conductor” → CONTRATISTA. Decisión humana pendiente si se crea perfil CONDUCTOR.

## AC (compuerta 60 min)
1. Portada con 3 recuadros; sin Ex Trabajador; sin lista general de nombres.
2. Trabajador ve textos simples y jornada nocturna.
3. Prioridad por turno + liberación 20:00 demostrable.
4. Gestión masiva CSV demo, ruta prevista, notificaciones in-app.
5. Van extra y excepción fuera de horario con estados claros.
6. Auditoría ampliada.
7. Pruebas existentes en verde + suite nueva mínima.
