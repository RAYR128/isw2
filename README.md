# Proyecto ISW - empresa de aseos
Codigo fuente para el proyecto de ISW para la empresa de aseos.

* [Requisitos](./REQUISITOS.md)

# Pruebas
```bash
# ejecutar prueba de backend en linux
bash prueba_backend.sh
```

# Detalles de implementacion
Trabajo en progreso, no completos aun, esto es una especificacion hasta ahora.

# Proposicion
Proposicion para la empresa de aseos:

Se va a crear un sitio web que permita realizar las siguientes funciones:

* Asignar lugares y volumen de personal a enviar
* Poder ir asignando personal individualmente para una ubicacion con instrucciones y herramientas y horarios especificos
* Poder administrar contratos de personal, pagos
* Poder administrar contratos ejecutivos

## Desarrollo actual
* [X] implementacion de stubs de backend
* [X] porteo de mockup a react
* [ ] implementacion de interaccion con DB del backend
* [ ] implementacion de seguridad de api (chequeo token, ratelimit en login, etc)
* [X] arreglar error en backend que muestra entradas invalidas en asignaciones?

## Backend (/api/)
* [S] POST /login - creacion de sesion y validacion de usuario/contraseña

### Asignaciones
* [S] POST /crearAsignacion - creacion de cliente, ubicacion, necesidades, y cantidad de personal recomendado
* [S] GET /asignacion - mostrar todas las asignaciones
* [S] GET /asignacion/{id}/detalles - detalles de una asignacion especifica, retorna cliente, ubicacion, personal y cantidad recomendada, herramientas, y estado
* [S] GET /asignacion/{id}/distribucion - distribucion de personal en una asignacion especificacion, en un arreglo mostrando el ID del trabajador (se ven los datos con /contratos/personal/{PID}), el turno, inicio, estado
* [S] POST /asignacion/{id}/personal/remover - remover un personal de una asignacion, boton "remover" de distribuciones actuales
* [S] GET /asignacion/{id}/personal/detalles - ver las tareas/detalles de un personal de una asignacion, boton "ver mas detalles" de distribuciones actuales
* [S] POST /asignacion/{id}/personal/agregar - agregar un nuevo personal, trabajador, vestuario, equipo, herramientas, detalles, turno, motivo, boton "asignar personal" de nueva asignacion

### Contratos - Personal
* [S] GET /contratos/personal - Contratos activos, retorna arreglo con IDs para usarlos en /contratos/personal/{id}
* [S] GET /contratos/personal/{id} - Retorna arreglo con nombre de trabajador, inicio, duracion, salario / IPC, y un estado
* [S] POST /contratos/personal - Crear un contrato, espera nombre del trabajador, fecha de inicio, duracion, tipo, salario, IPC
* [S] POST /contratos/personal/{id} - Modificar contrato existente

### Contratos - Ejecutivo/Administracion
* [S] GET /contratos/ejecutivo
* [S] POST /contratos/ejecutivo

## Frontend
* [S] / - pagina de dashboard.html o login.html
* [S] /asignacion - asignacion.html - pagina de asignacion
* [S] /asignacion/{id} - distribucionasignacion.html pagina de distribucion de personal para una asignacion
* [S] /contratos/personal - contratospersonal.html pagina de contrato personal
* [S] /contratos/ejecutivo - contratosejecutivo.html pagina de contrato ejecutivo