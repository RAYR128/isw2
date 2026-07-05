# script temporal para facilitarme la vida
# iniciar el frontend rapidamente
set -e

# nota futura: el repo va a utilizar pnpm enves de npm en actualizaciones futuras, debido a preocupaciones por tema de seguridad de paquetes.
COMANDO_NPM="pnpm"

# compilar y iniciar el frontend en modo desarrollo
echo "inicializando frontend"
cd frontend
if [ ! -d "node_modules" ]; then
	$COMANDO_NPM install
fi

echo "ejecutando el frontend..."
echo "presiona ctrl+c para detener el frontend"
VITE_API_BASE=http://localhost:3000/api $COMANDO_NPM run dev