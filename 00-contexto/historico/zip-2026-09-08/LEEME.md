# Snapshot recibido: files_ProyectoEnjoy_09.26.zip → Proyecto_Enjoy_2026-09-08.zip (raíz `mineria/`)
Recibido el 2026-09-08 en la sesión 1 de Claude Code, después de reconstruir el paquete portable. Se conserva con sus bytes originales (CRLF incluidos) como referencia; **no es el estado vigente**.

## Qué contiene
Once archivos con raíz `mineria/` (carpetas 02, 03, 05, 07, 08 y `agentes` venían vacías) más un `S2-soluciones-existentes.md` suelto fuera del ZIP interno, idéntico al S2 vigente.

## Comparación con el repositorio (verificada por hash y diff, 2026-09-08)
| Archivo del ZIP | Resultado |
|---|---|
| S1, S2, plan-investigacion, Prompt_Ajustado, flujo-trabajo-humano-agente | Idénticos al repo |
| README.md | Idéntico a `00-contexto/historico/README.md` |
| 00-contexto/inventario-mvp-actual.md | Versión anterior a DEC-004 (sin la frase de ventana 23–06) |
| 01-investigacion/matriz-evidencia.csv | Sin H-013…H-015 (anterior a S3) |
| 06-gobernanza/registro-aprobaciones.md | Sin DEC-004, DEC-005, sesiones S3/BUILD, V-14, V-15 |
| 06-gobernanza/banco-prompts.md | Sin PR-07 (solo difiere por lo añadido en Claude Code) |
| 09-plataforma/prototipo-actual/index.html | **Versión con 24 salidas/jornada** (anterior a DEC-004): perfil horario de 24 h, extras #2 y #3 en horas 07:00 y 14:00, proyección 30×24×2 |

Conclusión: el ZIP es el snapshot previo al ajuste DEC-004 y a S3. Nada en él es más nuevo que el repo; no se sobrescribió ningún archivo. Sirve para trazar cómo cambió la semilla del prototipo al pasar de 24 a 8 salidas.
