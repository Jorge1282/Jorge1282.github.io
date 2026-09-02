# ADR — Jorge1282.github.io

## Contexto
GitHub Pages del usuario. Es otra variante de la app de finanzas personales ("Tu Bolsillo") — esta es la **versión Familiar** (ver `loadFamilyIncomeGoal` en storage.js y commits "Actualización de cambios en versión Familiar"). Mismo patrón que `tu-bolsillo-app` y `tu-bolsillo-app-web`: monolito `index.html` (~183 funciones) + `manifest.json` + `sw.js` (PWA) + `.well-known/assetlinks.json` (TWA), pero con una capa `src/storage.js` separada para persistencia (a diferencia de tu-bolsillo-app donde todo está inline).

## Reglas permanentes (de `.github/copilot-instructions.md`, NO modificar sin permiso explícito)
1. No agregar la primera fila de tarjetas con `INGRESOS TOTALES`, `GASTOS TOTALES` y `SALDO NETO` en el resumen.
2. Mantener la función `round2` aplicada en todos los cálculos financieros, acumulaciones y balances. No eliminarla nunca.
3. Mantener `sw.js` en modo NetworkFirst con verificación de esquema `file`; solo cachear URLs `http` y `https`.
4. No ejecutar `git add`/`git commit`/`git push` automáticamente — el usuario los ejecuta manualmente. **Excepción registrada**: el 2026-09-02 el usuario autorizó explícitamente romper esta regla para el fix de seguridad descrito abajo (commits `2a86a61` y `9d79ccc`). Sigue vigente para todo lo demás.

Estas reglas aplican también probablemente a las apps hermanas (tu-bolsillo-app, tu-bolsillo-app-web) por ser el mismo dominio — verificar antes de asumir que no aplican ahí.

## Incidente de seguridad y remediación (2026-09-02)
Se detectó que `index.html` tenía hardcodeado en texto plano, en este repo **público**:
- `FIREBASE_CONFIG.apiKey` (no crítico por sí solo — las API keys de Firebase están pensadas para ser públicas del lado del cliente).
- `FAMILY_CODE = "FAMILIAOSORIO"` — actuaba como único "gate" de acceso a los datos financieros familiares en Firestore.

Las reglas de Firestore eran `allow read, write: if true;` (sin autenticación real) — combinado con el `FAMILY_CODE` público, cualquiera en internet podía leer/escribir los datos financieros de la familia sin necesidad de login, directamente contra la API REST de Firestore.

**Remediación aplicada:**
1. `FAMILY_CODE` rotado a `48EX8YJFW4MM`.
2. Se agregó Firebase Auth anónima (`firebase-auth-compat.js` + `firebase.auth().signInAnonymously()`) como paso previo obligatorio a cualquier lectura/escritura — `fbReady` solo se pone en `true` dentro del `.then()` del sign-in anónimo, nunca antes.
3. Proveedor "Anónimo" habilitado manualmente por el usuario en Firebase Console (Authentication → Sign-in method), con limpieza automática de cuentas >30 días activada.
4. Regla de Firestore cambiada a `allow read, write: if request.auth != null;`, versionada en `firestore.rules` + `firebase.json` (nuevos, en la raíz del repo) y desplegada con `firebase deploy --only firestore:rules`.
5. Verificado con curl directo a la API REST de Firestore sin token: ahora devuelve `403` (antes devolvía `200` con los datos).

**Por qué esta solución y no una más robusta (custom claims / Cloud Function):** solo hay 2 usuarios reales (el usuario y su esposa) — se evaluó explícitamente con el usuario y se optó por la opción proporcional al riesgo (auth anónima + regla simple) en vez de una arquitectura de auth completa con validación server-side del `familyCode`. Si en el futuro se suman más usuarios o el `familyCode` necesita revocarse por usuario individual, reconsiderar la Opción B (custom claims vía Cloud Function).

**Riesgo residual:** el código viejo `FAMILIAOSORIO` sigue visible para siempre en el historial de git del repo público (no se reescribió historia). Ya no sirve para nada porque la regla ya no confía en él, pero cualquiera que lo vea puede intentar usarlo — fallará por falta de auth, no por el código en sí.

## Estructura de datos (src/storage.js)
Persistencia en localStorage vía pares load/save: `Data`, `CachedRate` (tasa BCV), `InitialBalance`, `Pin` (seguridad), `CustomCategories`, `FamilyIncomeGoal` (meta de ingreso familiar — diferenciador de esta variante), `Budgets`, `Payments`, `Savings`, `SavingsHistory`.

## Trabajo reciente (git log, no re-derivar)
Deuda pendiente por categoría (restando pagos marcados como pagados), navegación/planificación infinita de meses futuros, cierre de mes fiscal automático con filtrado por mes en Pagos, independencia de presupuesto y saldo por mes — mismo frente de trabajo que se está migrando a las otras variantes (Personal en tu-bolsillo-app).

## Implicación práctica
- Es la variante "Familiar" del mismo producto — comparar con tu-bolsillo-app (Personal/Coach) antes de duplicar lógica; probablemente el trabajo se sincroniza entre las tres apps.
- Respetar las 4 reglas permanentes de copilot-instructions.md en cualquier cambio (salvo excepción de seguridad ya registrada arriba).
- Grafo con señal limitada por ser HTML monolítico (igual que tu-bolsillo-app); usar grep dirigido sobre index.html para funciones internas, pero `src/storage.js` SÍ está bien cubierto por el grafo (26 funciones como nodos Function reales).
- **Antes de tocar `initFirebaseSync`**: recordar que `fbReady` depende de `signInAnonymously()` resuelto — no revertir a setearlo antes del `.then()`.
