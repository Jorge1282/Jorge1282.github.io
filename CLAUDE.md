# Jorge1282.github.io

GitHub Pages del usuario — versión **Familiar** de la app de finanzas personales "Tu Bolsillo" (ver hermanas: `tu-bolsillo-app` = Personal/Coach, `tu-bolsillo-app-web`). Monolito `index.html` (~183 funciones) + `manifest.json` + `sw.js` (PWA) + `.well-known/assetlinks.json` (TWA), con `src/storage.js` separado para persistencia (load/save de Data, CachedRate/BCV, InitialBalance, Pin, CustomCategories, FamilyIncomeGoal, Budgets, Payments, Savings, SavingsHistory).

## Reglas permanentes (de `.github/copilot-instructions.md` — NO modificar sin permiso explícito del usuario)
1. No agregar la primera fila de tarjetas con `INGRESOS TOTALES`, `GASTOS TOTALES` y `SALDO NETO` en el resumen.
2. Mantener `round2` aplicada en todos los cálculos financieros, acumulaciones y balances. Nunca eliminarla.
3. `sw.js` en modo NetworkFirst con verificación de esquema `file`; solo cachear URLs `http`/`https`.
4. No ejecutar `git add`/`git commit`/`git push` automáticamente — el usuario los ejecuta manualmente.

## Memoria estructural
Indexado en `codebase-memory-mcp` (proyecto `C-Users-osori-Documents-github-projects-Jorge1282.github.io`). `src/storage.js` tiene buena cobertura en el grafo (nodos Function reales); `index.html` es monolítico inline, usar grep por nombre de función. ADR completo con contexto de dominio y trabajo reciente: `manage_adr(project="C-Users-osori-Documents-github-projects-Jorge1282.github.io", mode="get")`.
