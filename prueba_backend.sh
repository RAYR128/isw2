# script temporal para facilitarme la vida
# requiere docker!
set -e

# variables de configuracion
NOMBRE_CONTENEDOR_DB="temp_postgres_db"
DB_NAME="temp_db"
DB_USER="temp_user"
DB_PASSWORD="temp_password"
DB_PORT="5432"

# detener el docker si ya existe, y borrarlo
echo "deteniendo y eliminando contenedor anterior si existe..."
docker stop $NOMBRE_CONTENEDOR_DB 2>/dev/null || true
docker rm $NOMBRE_CONTENEDOR_DB 2>/dev/null || true

# iniciar el contenedor
echo "iniciando contenedor postgresql temporal..."
docker run -d --name $NOMBRE_CONTENEDOR_DB -e POSTGRES_DB=$DB_NAME -e POSTGRES_USER=$DB_USER -e POSTGRES_PASSWORD=$DB_PASSWORD -p $DB_PORT:5432 postgres:13-alpine

# esperar a postgresql
echo "esperando a postgresql"
sleep 5

# verificar si esta corriendo en primer lugar
if ! docker ps | grep -q $NOMBRE_CONTENEDOR_DB; then
	echo "Error: El contenedor postgresql no pudo iniciarse"
	exit 1
fi

# configurar el entorno para el servidor
echo "configurando el entorno"
export DB_HOST="localhost"
export DB_PORT="$DB_PORT"
export DB_USERNAME="$DB_USER"
export DB_PASSWORD="$DB_PASSWORD"
export DATABASE="$DB_NAME"
export JWT_SECRET="temp_jwt_secret"
export COOKIE_KEY="temp_cookie_key"

# compilar & iniciar el backend en modo desarrollo
echo "inicializando backend"
cd backend
if [ ! -d "node_modules" ]; then
	npm install
fi

echo "ejecutando el backend..."
echo "base de datos temporal corriendo en localhost:$DB_PORT"
echo "presiona ctrl+c para detener el backend y la base de datos"
trap 'echo "deteniendo contenedor..."; docker stop $NOMBRE_CONTENEDOR_DB; docker rm $NOMBRE_CONTENEDOR_DB; exit 0' INT
npm run dev