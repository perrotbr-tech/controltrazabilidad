# SPEC-### — Título
Fuente de la plantilla: manual rector, sección 09. Uso: toda capacidad nace como CAP-###, se vincula con hallazgos H-###, se convierte en REQ-###, se desarrolla bajo SPEC-### y se valida con AC-###. No se acepta código huérfano sin estos vínculos.

Estado: Borrador | En revisión | Aprobada | En desarrollo | Verificada | Rechazada
Propietario humano:
Origen: DEC-### / PR-## / H-### / T-##

## 1. Problema y resultado
Problema, usuario afectado, frecuencia e impacto. Resultado medible esperado.

## 2. Evidencia
Hallazgos vinculados: H-###. Indicar qué es hecho, inferencia o supuesto pendiente.

## 3. Alcance
Incluido y excluido. Contratos, organizaciones, actores y variantes alcanzadas.

## 4. Requisitos
REQ-### redacción verificable.

## 5. Reglas de negocio
Estados, transiciones, vigencias, límites, precedencia de reglas y manejo de excepciones.

## 6. Autorización y datos
Quién puede crear, leer, modificar, aprobar y exportar; alcance por organización y contrato; datos sensibles; retención; auditoría.

## 7. Experiencia
Flujo principal, errores, operación sin conexión, accesibilidad y dispositivo objetivo.

## 8. Criterios de aceptación
AC-### Dado / Cuando / Entonces.
Incluir al menos un caso autorizado, uno denegado, uno concurrente y uno de auditoría.

## 9. Observabilidad y métricas
Eventos, KPI, alertas, responsable y denominadores.

## 10. Migración y reversibilidad
Datos iniciales, compatibilidad, rollback y efectos sobre registros históricos.

## 11. Riesgos y decisiones abiertas
Riesgo, probabilidad, impacto, mitigación y decisión humana requerida.

## 12. Aprobaciones
Producto / Operación / Contrato / Seguridad-privacidad / Técnico.

---
Nota operativa (CLAUDE.md, flujo spec-driven ligero): para correcciones de defecto ya autorizadas por DEC-005 se admite una SPEC breve con problema, origen, alcance, reglas, AC verificables, tareas y pruebas, más las secciones 11 y 12 de esta plantilla. Las ampliaciones (backend, módulos nuevos, datos reales) usan la plantilla completa.
