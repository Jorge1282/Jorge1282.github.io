# ADR — Jorge1282.github.io

## Contexto
GitHub Pages del usuario. Es otra variante de la app de finanzas personales ("Tu Bolsillo") — esta es la **versión Familiar** (ver `loadFamilyIncomeGoal` en storage.js y commits "Actualización de cambios en versión Familiar"). Mismo patrón que `tu-bolsillo-app` y `tu-bolsillo-app-web`: monolito `index.html` (~183 funciones) + `manifest.json` + `sw.js` (PWA) + `.well-known/assetlinks.json` (TWA), pero con una capa `src/storage.js` separada para persistencia (a diferencia de tu-bolsillo-app donde todo está inline).

## Reglas permanentes (de `.github/copilot-instructions.md`, NO modificar sin permiso explícito)
1. No agregar la primera fila de tarjetas con `INGRESOS TOTALES`, `GASTOS TOTALES` y `SALDO NETO` en el resumen.
2. Mantener la función `round2` aplicada en todos los cálculos financieros, acumulaciones y balances. No eliminarla nunca.
3. Mantener `sw.js` en modo NetworkFirst con verificación de esquema `file`; solo cachear URLs `http` y `https`.
4. No ejecutar `git add`/`git commit`/`git push` automáticamente — el usuario los ejecuta manualmente.

Estas reglas aplican también probablemente a las apps hermanas (tu-bolsillo-app, tu-bolsillo-app-web) por ser el mismo dominio — verificar antes de asumir que no aplican ahí.

## Estructura de datos (src/storage.js)
Persistencia en localStorage vía pares load/save: `Data`, `CachedRate` (tasa BCV), `InitialBalance`, `Pin` (seguridad), `CustomCategories`, `FamilyIncomeGoal` (meta de ingreso familiar — diferenciador de esta variante), `Budgets`, `Payments`, `Savings`, `SavingsHistory`.

## Trabajo reciente (git log, no re-derivar)
Deuda pendiente por categoría (restando pagos marcados como pagados), navegación/planificación infinita de meses futuros, cierre de mes fiscal automático con filtrado por mes en Pagos, independencia de presupuesto y saldo por mes — mismo frente de trabajo que se está migrando a las otras variantes (Personal en tu-bolsillo-app).

## Implicación práctica
- Es la variante "Familiar" del mismo producto — comparar con tu-bolsillo-app (Personal/Coach) antes de duplicar lógica; probablemente el trabajo se sincroniza entre las tres apps.
- Respetar las 4 reglas permanentes de copilot-instructions.md en cualquier cambio.
- Grafo con señal limitada por ser HTML monolítico (igual que tu-bolsillo-app); usar grep dirigido sobre index.html para funciones internas, pero `src/storage.js` SÍ está bien cubierto por el grafo (26 funciones como nodos Function reales).
