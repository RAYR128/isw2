# Proyecto ISW (Grupo 10) - empresa de aseos
Codigo fuente para el proyecto de ISW para la empresa de aseos.

Integrantes:
* Ricardo Yañez Rios

Index:
* [Requisitos](./REQUISITOS.md)

# Levantamiento
## Variables de entorno

## Prueba Local
Linux:
```bash
bash prueba_backend.sh
bash prueba_frontend.sh
```

Windows:
```batch
.\prueba_frontend.bat
.\prueba_backend.bat
```

## Variables de entorno
| Variable    | Descripcion                                                             | Valor predeterminado |
| ----------- | ----------------------------------------------------------------------- | -------------------- |
| HOST        | Dirección del host del servidor                                         | localhost            |
| PORT        | Puerto en el que escucha el servidor backend                            | 3000                 |
| DB_PORT     | Puerto de la base de datos (PostgreSQL)                                 | 5432                 |
| DB_USERNAME | Usuario de la base de datos                                             | temp_user            |
| DB_PASSWORD | Contraseña de la base de datos                                          | temp_password        |
| DATABASE    | Nombre de la base de datos                                              | temp_db              |
| JWT_SECRET  | Clave secreta para la generación de tokens JWT (crítica para seguridad) | temp_secret          |
| COOKIE_KEY  | Clave para el manejo de cookies                                         | temp_cookie          |

# Detalles de implementacion
Trabajo en progreso, no completos aun, esto es una especificacion hasta ahora.

## Desarrollo actual
* [X] implementacion de stubs de backend
* [X] porteo de mockup a react
* [X] implementacion de interaccion con DB del backend
* [X] implementacion de seguridad de api (chequeo token, etc)
* [X] implementar controller, service, rutas correctas de interaccion
* [ ] implementacion de ratelimits en login

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