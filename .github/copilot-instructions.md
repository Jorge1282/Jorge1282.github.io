# Instrucciones permanentes

Estas reglas son permanentes y no deben modificarse:

1. No agregar la primera fila de tarjetas con `INGRESOS TOTALES`, `GASTOS TOTALES` y `SALDO NETO` en el resumen.
2. Mantener la función `round2` aplicada en todos los cálculos financieros, acumulaciones y balances. No eliminarla nunca.
3. Mantener `sw.js` en modo NetworkFirst con verificación de esquema `file`; solo se deben cachear URLs `http` y `https`.
4. No ejecutar comandos `git add`, `git commit` ni `git push` automáticamente. El usuario los ejecutará manualmente.

## Herramientas de agente

Este repo declara el servidor MCP `agent-browser` en `.mcp.json` (https://github.com/vercel-labs/agent-browser) para que los agentes de Claude Code puedan abrir el sitio en un navegador real, tomar snapshots/capturas y ejecutar auditorías de accesibilidad mientras trabajan. Requiere tener instalado el binario `agent-browser` (`npm install -g agent-browser && agent-browser install`).
