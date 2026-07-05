#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$ROOT_DIR/.env"
ENV_EXAMPLE="$ROOT_DIR/.env.example"

generar_secreto() {
	openssl rand -hex 32
}

reemplazar_en_env() {
	local clave="$1"
	local valor="$2"
	local archivo="$3"

	if grep -q "^${clave}=" "$archivo"; then
		sed -i "s|^${clave}=.*|${clave}=${valor}|" "$archivo"
	else
		echo "${clave}=${valor}" >> "$archivo"
	fi
}

echo "verificando dependencias..."
if ! command -v docker >/dev/null 2>&1; then
	echo "error: docker no esta instalado."
	exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
	echo "error: docker compose no esta disponible."
	exit 1
fi

if ! command -v openssl >/dev/null 2>&1; then
	echo "error: openssl no esta instalado (necesario para generar secrets)."
	exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
	echo "creando archivo .env desde .env.example..."
	cp "$ENV_EXAMPLE" "$ENV_FILE"

	POSTGRES_PASSWORD="$(generar_secreto)"
	JWT_SECRET="$(generar_secreto)"
	COOKIE_KEY="$(generar_secreto)"

	reemplazar_en_env "POSTGRES_PASSWORD" "$POSTGRES_PASSWORD" "$ENV_FILE"
	reemplazar_en_env "JWT_SECRET" "$JWT_SECRET" "$ENV_FILE"
	reemplazar_en_env "COOKIE_KEY" "$COOKIE_KEY" "$ENV_FILE"
	reemplazar_en_env "NODE_ENV" "production" "$ENV_FILE"
	reemplazar_en_env "DB_HOST" "db" "$ENV_FILE"
	reemplazar_en_env "SEED_DB" "false" "$ENV_FILE"
	reemplazar_en_env "HTTP_PORT" "80" "$ENV_FILE"

	echo "secretos generados y guardados en .env"
else
	echo "usando .env existente"
fi

cd "$ROOT_DIR"

echo "Construyendo imagenes..."
docker compose build

echo "Iniciando servicios..."
docker compose up -d

echo "Esperando a que la base de datos este lista..."
for i in $(seq 1 30); do
	if docker compose ps --status running db 2>/dev/null | grep -q db; then
		if docker compose exec -T db pg_isready -U "$(grep '^POSTGRES_USER=' "$ENV_FILE" | cut -d= -f2-)" >/dev/null 2>&1; then
			break
		fi
	fi
	echo "   intento $i/30..."
	sleep 2
done

HTTP_PORT="$(grep '^HTTP_PORT=' "$ENV_FILE" | cut -d= -f2-)"
HTTP_PORT="${HTTP_PORT:-80}"

echo ""
echo "Instalacion completada."
echo "Aplicacion disponible en: http://localhost:${HTTP_PORT}"
echo ""
echo "Comandos utiles:"
echo "  docker compose ps"
echo "  docker compose logs -f"
echo "  docker compose down"