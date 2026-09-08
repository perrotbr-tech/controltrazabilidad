# S1 — Cumplimiento chileno (línea L2)

**Modo:** RESEARCH · **Sesión:** 2026-09-08 · **Preguntas cubiertas:** P6, P7, P8 (parcial P9)
**Caso:** Hotel Enjoy Antofagasta (mandante) contrata a una empresa de transporte para trasladar a su personal.

> **Reencuadre necesario tras DEC-003.** El cliente es un operador hotelero-casino, no una compañía minera. El marco regulatorio aplicable cambia de eje: sigue habiendo subcontratación y transporte remunerado, pero desaparece la normativa minera específica (SERNAGEOMIN, reglamento de seguridad minera). La minería pasa de "contexto del caso" a **mercado de expansión** — lo que refuerza, no debilita, la tesis del núcleo genérico configurable por contrato.

---

## H-001 · La plataforma trata datos personales de trabajadores y queda bajo la Ley 21.719
**Tipo:** normativa · **Confianza:** alta

<cite index="6-1">La Ley 21.719 moderniza la protección de datos personales en Chile, se inspira en el GDPR europeo, fue publicada el 13 de diciembre de 2024 y su cumplimiento es obligatorio desde el 1 de diciembre de 2026</cite>. <cite index="11-1">Aplica a toda empresa que trate datos de trabajadores, clientes o usuarios, y desde esa fecha debe poder *demostrar* que los trata conforme a la ley</cite>. <cite index="10-1">La multa máxima llega a 20.000 UTM, con reincidencias que pueden alcanzar el 4% de los ingresos anuales</cite>.

**Estado del calendario:** <cite index="4-1">el Gobierno evalúa modificar el calendario por dificultades de implementación de la nueva institucionalidad, pero a la fecha la vigencia no ha sido modificada y sigue fijada para el 1 de diciembre de 2026</cite>. → **Vigilar; no planificar sobre una prórroga que no existe.**

**Por qué importa a este producto:** el sistema registra quién se traslada, desde qué punto, a qué hora y con qué frecuencia. Eso es un historial de desplazamiento de personas identificadas.

**Consecuencias de diseño (a especificar, no a improvisar):**
- **Base de licitud**: <cite index="7-1">el tratamiento necesario para ejecutar un contrato con el titular es una base válida, igual que el cumplimiento de una obligación legal</cite>. La reserva de transporte se apoya en la relación laboral/contractual, no en un consentimiento genérico — pero debe quedar declarada.
- **Derechos del titular**: acceso, rectificación, supresión, oposición y portabilidad deben poder ejercerse sobre los datos de traslado.
- **Encargado de tratamiento**: si la plataforma es de Kingdom Legacy/Perrot Tech y el responsable es el Enjoy, se requiere contrato de encargo con instrucciones, seguridad, subencargados y devolución/eliminación al término.
- **Minimización y retención**: definir qué se guarda, cuánto tiempo y qué se anonimiza al cerrar el período.
- **Riesgo alto**: <cite index="7-1">la evaluación sistemática de personas y el monitoreo continuo entran en la categoría de tratamientos de alto riesgo</cite>. → **Límite de producto: la plataforma registra eventos de servicio (reserva, abordaje, manifiesto), no rastrea personas de forma continua.** Coincide con el "fuera de alcance" del manual y debe quedar escrito como decisión.

---

## H-002 · El transporte de personal por un tercero es Transporte Privado Remunerado de Pasajeros y exige inscripción
**Tipo:** normativa · **Confianza:** alta

<cite index="16-1">El DS 212/1992 obliga a inscribir en el Registro Nacional todas las modalidades de servicios de transporte público remunerado de pasajeros y los vehículos destinados a prestarlos; la inscripción es requisito para prestar el servicio, cualquiera sea su modalidad, y en los vehículos debe portarse el certificado de inscripción</cite>. <cite index="23-1">El transporte de personal de empresas cae en la categoría de Transporte Privado Remunerado de Pasajeros (TTEPRIV)</cite>.

**El hallazgo con más valor de producto:** <cite index="21-1">el instructivo de Subtrans establece que cuando se realizan viajes continuos para transportar personal de empresas determinadas, debe presentarse un documento que acredite la relación contractual con dicho organismo, lo que queda indicado en la respectiva Constancia de Autorización</cite>.

→ **El contrato entre el Enjoy y la empresa de transporte no es solo un instrumento comercial: es un requisito habilitante del permiso.** Y el permiso vive por vehículo: <cite index="17-1">cada vehículo se inscribe individualmente en el servicio autorizado</cite>.

**Consecuencias de diseño:**
- Una **van adicional** no es solo capacidad: debe ser un vehículo habilitado. La plataforma puede exigir patente inscrita como parte de la evidencia — hoy el prototipo pide "patente" sin verificar habilitación.
- El maestro de vehículos necesita: patente, inscripción TTEPRIV vigente, revisión técnica, conductor con licencia correspondiente.
- La **vigencia** de esos documentos es un dato que caduca → refuerza el principio de "reglas versionadas con fecha de vigencia".

---

## H-003 · La subcontratación impone al mandante deberes de información, vigilancia y responsabilidad solidaria
**Tipo:** normativa · **Confianza:** alta

<cite index="32-1">El artículo 183-B del Código del Trabajo hace a la empresa principal solidariamente responsable de las obligaciones laborales y previsionales de los contratistas respecto de sus trabajadores, limitada al período en que prestaron servicios en régimen de subcontratación</cite>. <cite index="24-1">El artículo 183-C obliga a la empresa principal a mantener una nómina actualizada de sus contratistas y subcontratistas a disposición de los fiscalizadores, y le da derecho a ser informada sobre el monto y estado de cumplimiento de las obligaciones laborales y previsionales de éstos</cite>. <cite index="31-1">El artículo 66 bis de la Ley 16.744 obliga a la empresa principal a vigilar el cumplimiento de la normativa de higiene y seguridad por parte de sus contratistas, implementando un sistema de gestión para todos los trabajadores involucrados cuando en conjunto superen los 50 trabajadores</cite>.

**Matiz que hay que verificar (no afirmar todavía):** <cite index="32-1">la ley excluye de este párrafo las obras o servicios que se ejecutan de manera discontinua o esporádica</cite>. Un transporte continuo de personal con contrato mensual **probablemente** queda dentro del régimen, pero la calificación exacta del transporte de personal como "servicio propio del giro" del hotel requiere confirmación con la Dirección del Trabajo. → **vacío V-06.**

**Consecuencia de diseño:** el mandante ya tiene una obligación de control documental sobre su contratista. La plataforma puede ser el lugar donde eso vive — pero eso **amplía el alcance** más allá del transporte, hacia acreditación de contratistas. Es una oportunidad de producto que debe decidirse en G2, no colarse por la puerta trasera.

---

## Síntesis para G1

**Tres restricciones duras que el diseño debe respetar desde el día uno:**
1. Datos personales de trabajadores con base de licitud, retención y derechos declarados (Ley 21.719, vigente 01-12-2026).
2. Evidencia de servicio ligada a **vehículo habilitado** y no solo a una patente escrita a mano (DS 212 / TTEPRIV).
3. Trazabilidad documental de la relación mandante–contratista con vigencias (Ley 20.123 / 183-C / 66 bis).

**Una hipótesis de producto que emerge:** el diferenciador no es reservar cupos — es **sostener la evidencia y las vigencias que la ley ya exige a las partes**. Coincide con la hipótesis del brief ("el valor está en excepciones y evidencia"), y ahora tiene respaldo normativo, no solo intuición.

**Impacto sobre las hipótesis del prototipo:**
- HIP-03 y HIP-04 (fijo que no cambia por uso; extra con causal-autorización-evidencia) → **compatibles** con el marco; sin conflicto normativo detectado.
- Nueva restricción no contemplada en el prototipo: **la evidencia del extra debería validar habilitación del vehículo**, no solo su patente.

## Vacíos declarados en esta sesión
- **V-06** ¿El transporte de personal del hotel califica como "servicio propio del giro" para efectos de subcontratación? Requiere dictamen o confirmación de la Dirección del Trabajo.
- **V-07** ¿La empresa de transporte que atiende hoy al Enjoy tiene inscripción TTEPRIV vigente y por qué vehículos? Dato del cliente, no público.
- **V-08** ¿Quién sería el responsable del tratamiento de datos y quién el encargado? Decisión contractual con el Enjoy.
- **V-09** Norma sectorial hotelera/casino aplicable al personal (turnos nocturnos, traslado en horario de cierre) — no investigada aún.
