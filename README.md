# Proyecto ISW - empresa de aseos
Codigo fuente para el proyecto de ISW para la empresa de aseos.

* [Requisitos funcionales del sistema](./REQUISITOS.md)

## Requisitos

Para desarrollar y ejecutar este proyecto se requieren las siguientes herramientas:

- **Node.js** >= 20 (recomendado: v22 LTS)
- **pnpm** >= 9 (el proyecto usa pnpm para la gestion de paquetes)
- **PostgreSQL** >= 13 (el backend usa TypeORM con PostgreSQL)
- **Docker** (**opcional**: usado por `prueba_backend.sh` para levantar una base de datos temporal, no necesario en prod)

### Instalacion de dependencias

```bash
# Backend
cd backend
pnpm install

# Frontend
cd ../frontend
pnpm install
```

### Variables de Entorno (Backend)

| Variable                       | Descripcion                                        | Valor por defecto          |
|--------------------------------|----------------------------------------------------|----------------------------|
| `HOST`                         | Host en el que escucha el servidor Express         | `localhost`                |
| `PORT`                         | Puerto del servidor backend                        | `3000`                     |
| `DB_PORT`                      | Puerto de PostgreSQL                               | `5432`                     |
| `DB_USERNAME`                  | Usuario de la base de datos                        | `temp_user`                |
| `DB_PASSWORD`                  | Contraseña de la base de datos                     | `temp_password`            | 
| `DATABASE`                     | Nombre de la base de datos                         | `temp_db`                  |
| `JWT_SECRET`                   | Clave secreta para firmar tokens JWT               | `temp_secret`              |
| `COOKIE_KEY`                   | (Reservado) Clave para cookies                     | `temp_cookie`              |
| `LOGIN_RATE_LIMIT_VENTANA_MS`  | Ventana de tiempo para el rate limit de login (ms) | `900000` (15 minutos)      |
| `LOGIN_RATE_LIMIT_MAXIMO`      | Maximo de intentos de login en la ventana          | `5`                        |

**Ejemplo de archivo `.env` (backend/.env):**

```env
HOST=localhost
PORT=3000
DB_PORT=5432
DB_USERNAME=miusuario
DB_PASSWORD=micontraseñaSegura123
DATABASE=empresa_aseos
JWT_SECRET=cambia_esto_por_un_valor_muy_largo_y_aleatorio_123456789
LOGIN_RATE_LIMIT_VENTANA_MS=900000
LOGIN_RATE_LIMIT_MAXIMO=5
```

# Pruebas
```bash
# ejecutar prueba de backend en linux
bash prueba_backend.sh

# ejecutar prueba de frontend en linux
bash prueba_frontend.sh
```

```batch
.\prueba_frontend.bat
.\prueba_backend.bat
```

# Detalles de implementacion
Trabajo en progreso, no completos aun, esto es una especificacion hasta ahora.

## Desarrollo actual
* [X] implementacion de stubs de backend
* [X] porteo de mockup a react
* [X] implementacion de interaccion con DB del backend
* [X] implementacion de seguridad de api (chequeo token, ratelimit en login, etc)
* [X] implementar controller, service, rutas correctas de interaccion

## Backend (/api/)
* [X] POST /login - creacion de sesion y validacion de usuario/contraseña

### Asignaciones
* [X] POST /crearAsignacion - creacion de cliente, ubicacion, necesidades, y cantidad de personal recomendado
* [X] GET /asignacion - mostrar todas las asignaciones
* [X] GET /asignacion/{id}/detalles - detalles de una asignacion especifica, retorna cliente, ubicacion, personal y cantidad recomendada, herramientas (de acuerdo a ubicacion), y estado
* [X] GET /asignacion/{id}/distribucion - distribucion de personal en una asignacion especificacion, en un arreglo mostrando el ID del trabajador (se ven los datos con /contratos/personal/{PID}), el turno, inicio, estado (calculado por inicio, duracion)
* [X] POST /asignacion/{id}/personal/remover - remover un personal de una asignacion, boton "remover" de distribuciones actuales
* [X] GET /asignacion/{id}/personal/detalles - ver las tareas/detalles de un personal de una asignacion, boton "ver mas detalles" de distribuciones actuales
* [X] POST /asignacion/{id}/personal/agregar - agregar un nuevo personal, trabajador, detalles, turno, boton "asignar personal" de nueva asignacion

### Contratos - Personal
* [X] GET /contratos/personal - Contratos activos, retorna arreglo con IDs para usarlos en /contratos/personal/{id}
* [X] GET /contratos/personal/{id} - Retorna arreglo con nombre de trabajador, inicio, duracion, salario / IPC, y un estado
* [X] POST /contratos/personal - Crear un contrato, espera nombre del trabajador, fecha de inicio, duracion, tipo, salario, IPC
* [X] POST /contratos/personal/{id} - Modificar contrato existente

### Contratos - Ejecutivo/Administracion
* [X] GET /contratos/ejecutivo
* [X] POST /contratos/ejecutivo

## Frontend
* [X] / - pagina de dashboard.html o login.html
* [X] /asignacion - asignacion.html - pagina de asignacion
* [X] /asignacion/{id} - distribucionasignacion.html pagina de distribucion de personal para una asignacion
* [X] /contratos/personal - contratospersonal.html pagina de contrato personal
* [ ] /contratos/ejecutivo - contratosejecutivo.html pagina de contrato ejecutivo