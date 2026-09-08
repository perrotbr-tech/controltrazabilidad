# Planilla de trabajadores para fundamentar las rutas (PR-06, SPEC-004)
El dueño entregará una planilla con datos de trabajadores (no del prestador del servicio). Sirve para definir los puntos donde las personas se bajan al ir a sus casas y donde se les encuentra para llevarlas al hotel.

## Regla antes de adjuntarla
La plataforma registra desplazamientos de personas identificadas (H-001, Ley 21.719, vigente 01-12-2026) y CLAUDE.md prohíbe datos personales reales en Git. Por eso la planilla que entra al repositorio debe venir **anonimizada**: sin nombre, RUT, teléfono, correo ni dirección exacta. Basta el sector o comuna y un punto de referencia cercano. Si la planilla original tiene datos personales, se mantiene fuera del repositorio (carpeta local del dueño) y solo se sube la versión anonimizada.

## Formato sugerido
`plantilla-planilla-trabajadores.csv` (separador `;`): `id_anonimo`, `sector_o_comuna`, `punto_referencia_cercano`, `turno_habitual`, `sentido_habitual` (ida, vuelta o ambos), `observacion`. Las tres filas son ejemplos y deben reemplazarse.

## Qué se hará con ella
1. Agrupar por sector y contar personas por punto → propuesta de paradas por ruta con densidad real (reemplaza los puntos supuestos del Supervisor).
2. Separar puntos de bajada (ida, hotel → casas) y de encuentro (vuelta, casas → hotel) si difieren.
3. Reconciliar la cifra "24 viajes" con los sentidos y horarios reales.
4. Especificar SPEC-004 (reserva por sentido y puntos) sobre esa base.
