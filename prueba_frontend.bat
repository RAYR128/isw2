@echo off
REM script temporal para facilitarme la vida
REM iniciar el frontend rapidamente

REM compilar y iniciar el frontend en modo desarrollo
echo inicializando frontend
cd frontend
if not exist "node_modules" (
	npm install
)

echo ejecutando el frontend...
npm run dev