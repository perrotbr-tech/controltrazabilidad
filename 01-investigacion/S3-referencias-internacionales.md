# S3 — Referencias internacionales (L3)

**Modo:** RESEARCH · **Sesión:** 2026-09-08 · **Pregunta cubierta:** P10 (patrones transferibles de Australia/Canadá; Perú pendiente)

> Evidencia de proveedores (declarada). Ninguna cifra de resultado se toma como prueba: los casos citados no identifican al cliente con métricas verificables. Lo que se extrae son **patrones de diseño**, no promesas.

---

## H-013 · En Australia/Canadá el transporte de trabajadores no es un módulo aislado: es una pieza de "workforce logistics" integrada con roster, alojamiento, acceso a faena y cumplimiento
**Tipo:** declarada · **Confianza:** media (consistente entre 3 proveedores)

(cite index="50-1">Quartex organiza la logística de personal en módulos: autoservicio del trabajador, lista de espera, re-reserva y manejo de disrupciones, coordinación de traslados, manifiestos de pasajeros y seguimiento de viajeros, planificación de transporte terrestre, vuelos, alojamiento y aprobaciones con flujos automatizados</cite>. (cite index="49-1">PeopleTray integra roster FIFO, vuelos, campamento, cumplimiento y competencias, seguridad e incidentes, gestión de contratistas y equipos en una sola app móvil con captura offline</cite>. (cite index="51-1">Los sistemas de journey management para trabajadores DIDO y operadores solitarios usan notificaciones automáticas por puntos de control geocercados e integran cámaras de fatiga y dispositivos satelitales</cite>.

**Patrón transferible:** el **manifiesto de pasajeros** como documento de evidencia del viaje (quién iba, en qué vehículo, a qué hora) — coincide con lo que el prototipo llama manifiesto y con la evidencia de servicio exigida por H-002/H-003.

**Patrón NO transferible sin decisión:** el seguimiento del viajero y la geocerca. En Chile choca con el límite de producto de H-001 (registrar eventos, no rastrear personas). Si alguna vez se considera, requiere evaluación de impacto bajo la Ley 21.719.

---

## H-014 · Los proveedores maduros comercializan "audit-ready records" y bancos de evidencia como propuesta de valor
**Tipo:** declarada · **Confianza:** media

(cite index="50-1">Quartex declara registros listos para auditoría con acceso rápido a evidencia de capacitación y credenciales, apoyo a la defensa en litigios mediante un banco de evidencia de inducciones, y documentación de proveedores y trabajadores centralizada y rastreable</cite>. (cite index="53-1">Humanz describe compuertas de credenciales y fatiga (credential and fatigue gates) integradas al roster y al pago</cite>.

**Lectura:** en mercados maduros, **la evidencia es el producto**, no la reserva. Refuerza la hipótesis del brief y el diferenciador candidato de S2: la capa contractual-económica con evidencia respaldada es donde converge el valor en esos mercados — no el botón de reservar.

---

## H-015 · Al menos un proveedor australiano declara presencia en Chile
**Tipo:** declarada · **Confianza:** media

(cite index="55-1">Quartex declara área de servicio en Australia, Estados Unidos, Canadá, Brasil, Sudáfrica y Chile, dirigido a organizaciones enterprise de minería, energía e infraestructura</cite>.

**Lectura:** el segmento **enterprise minero** en Chile ya tiene oferta internacional. Para un hotel-casino con 300 personas y 4 vans, esa oferta es sobredimensionada — lo que abre el espacio del **segmento medio**: mandantes no mineros o contratistas medianos que necesitan control contractual sin comprar una suite de logística de faena. **Este es el hueco que S2 no había nombrado.** Registrar como hipótesis de mercado (HIP-06), no como hecho.

---

## Patrones transferibles vs dependientes del contexto

| Patrón | Transferible a Chile / caso Enjoy | Condición |
|---|---|---|
| Manifiesto digital por viaje como evidencia | Sí | Ya alineado con H-002/H-003 |
| Lista de espera, re-reserva y manejo de disrupciones | Sí (y el mercado local ya lo tiene: H-008) | No construir; configurar |
| Compuertas de credenciales (no viaja quien no está habilitado) | Sí, adaptado a **vehículo y conductor** más que a trabajador | Vincula con H-002 (TTEPRIV) y H-011 |
| Registros listos para auditoría / banco de evidencia | Sí — es el diferenciador | Diseñar la evidencia como inmutable y fechada |
| Seguimiento del viajero, geocerca, cámaras de fatiga | **No** sin decisión formal | Límite H-001; evaluación de impacto Ley 21.719 |
| Integración roster–vuelos–campamento | No aplica al Enjoy; aplica a expansión minera | Fuera de alcance del piloto |

## Vacíos declarados
- **V-14** Perú (gran minería andina): sin fuente primaria levantada en esta sesión; queda como vacío para S3b si G1 lo exige.
- **V-15** Ningún caso internacional citado tiene cliente identificable con métrica verificable — el benchmark queda en patrones, no en resultados.

## Impacto sobre hipótesis
- Nueva **HIP-06 (mercado):** existe un segmento medio — mandantes no mineros y contratistas medianos — que necesita control contractual con evidencia sin comprar suites enterprise de logística de faena. *Hipótesis; se valida en S4 con el Enjoy y con V-10.*
