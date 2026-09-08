# Revisión de portabilidad, no nuevo dictamen legal
Los informes S1–S3 se preservaron íntegros. No equivalen a evidencia revalidada en esta actualización.
1. S1 contiene etiquetas cite index sin URL resoluble. Recuperar título, URL primaria, fecha, alcance y extracto para cada H antes de implementar reglas legales.
2. S1 llama H-003 a subcontratación; la matriz usa H-003 para relación contractual ante Subtrans y H-004…007 para subcontratación. El traspaso también cruza referencias. Mantener IDs existentes y crear tabla de reconciliación; no renumerar silenciosamente.
3. La matriz usa punto y coma sin entrecomillar todos los campos que contienen ese carácter: filas con distinta cantidad de columnas. Conservar original y producir matriz normalizada con revisión semántica antes de importarla.
4. El traspaso mezcla referencia DS 212 y TTEPRIV. Verificar normativa específica del servicio en fuentes oficiales antes de codificar exigencias; no tomar este informe como confirmación de aplicabilidad.
5. Diferenciación contractual y segmento medio siguen siendo hipótesis por V-10, V-12 y V-15. No hay costo comercial ni ROI verificado.
6. No reabrir búsquedas generales repetidas: dirigir consultas a los vacíos que cambian decisiones.

## Comprobación en Claude Code (2026-09-08, T-02 parcial)
Verificado con `awk -F';'` y `grep` sobre los archivos reconstruidos; no es investigación nueva.
- CSV: la cabecera tiene 10 columnas. Ocho filas tienen 11 por un punto y coma dentro del texto: H-001, H-002, H-007, H-008, H-009, H-010, H-013, H-015. Corrección propuesta: entrecomillar los campos `afirmacion` y `fuente` de esas filas en una `matriz-evidencia-normalizada.csv`, conservando la original. Pendiente de ejecución con revisión semántica.
- Citas sin URL resoluble (`cite index`): S1 tiene 9, S2 tiene 4, S3 tiene 3. Recuperar título, URL primaria y fecha de cada una antes de derivar reglas legales; lo hará `investigador` con alcance acotado a H-001, H-002 y H-003 primero (son las que condicionan diseño).
- V-10 (alcance del "cumplimiento contractual" de AllRide) sigue abierto: es la consulta que cambia la decisión comprar/construir y se propone como primera tarea del `investigador` en la próxima sesión.
