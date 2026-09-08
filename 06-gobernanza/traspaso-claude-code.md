# Traspaso vigente a Claude Code
Leer CLAUDE.md y ESTADO-ACTUAL; el traspaso original se conserva en 00-contexto/historico/06-gobernanza/.

## Qué continuar
Usar el HTML recibido como referencia, no rehacer su UX sin necesidad. Mantener S1–S3 y DEC-001…005. Completar S4/S5 cuando haya datos; registrar huecos, sin simular entrevistas.

## Primera sesión
1. Verificar ruta real y archivos; revisar git status si existe Git, sin borrar ni sobrescribir cambios.
2. Leer decisiones y correr node scripts/check-baseline.cjs si Node está disponible; declarar si falta.
3. Revisar T-01/T-02, SPEC-001 y proponer el siguiente cambio mínimo.
4. Puede corregir MVP bajo DEC-005 con SPEC y pruebas; antes de iniciar backend, presentar ADR-001 con opciones/costos y decisión concreta.
5. Dejar estado y próximo paso escritos. No volver a pedir G0.

## Investigación
No tratar la sección “no reabrir” del traspaso histórico como prohibición de corregir errores. La revisión encontró citas no portables, IDs cruzados y problemas del CSV; ver 01-investigacion/REVISION-PORTABILIDAD.md. Recuperar fuentes primarias antes de derivar restricciones legales automáticas. No presentar las afirmaciones comerciales como resultados observados.

## Alcance de instalación
La carpeta contiene instrucciones y definiciones de subagentes. No exige SDK ni servidores de agentes. Claude Code debe estar instalado/autenticado por el usuario. La raíz elegida debe contener CLAUDE.md y .claude/agents juntos.
Documentación oficial consultada el 2026-09-08: [memoria de proyecto](https://code.claude.com/docs/en/memory) y [subagentes](https://code.claude.com/docs/en/sub-agents). Las definiciones usan Markdown con frontmatter y herramientas explícitas; verificar su carga en la instalación local.
