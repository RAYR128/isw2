# script temporal para facilitarme la vida
# iniciar el frontend rapidamente
set -e

# compilar y iniciar el frontend en modo desarrollo
echo "inicializando frontend"
cd frontend
if [ ! -d "node_modules" ]; then
	pnpm install
fi

echo "ejecutando el frontend..."
echo "presiona ctrl+c para detener el frontend"
pnpm run dev