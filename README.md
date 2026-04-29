# Proyecto ISW - empresa de aseos
* [Requisitos](./desarollo/REQUISITOS.md)

## Detalles de implementacion
### Backend (/api/)
* POST /login - creasion de sesion y validacion de usuario/contraseña
* POST /crearAsignacion - creacion de cliente, ubicacion, necesidades, y cantidad de personal recomendado
* GET /asignacion/{id}/detalles - detalles de una asignacion especifica, retorna cliente, ubicacion, personal y cantidad recomendada, herramientas, y estado
* GET /asignacion/{id}/distribucion - distribucion de personal en una asignacion especificacion, en un arreglo mostrando el nombre del trabajador, el turno, inicio, estado
* POST /asignacion/{id}/personal/remover - remover un personal de una asignacion, boton "remover" de distribuciones actuales
* GET /asignacion/{id}/personal/detalles - ver las tareas/detalles de un personal de una asignacion, boton "ver mas detalles" de distribuciones actuales
* POST /asignacion/{id}/personal/agregar - agregar un nuevo personal, trabajador, vestuario, equipo, herramientas, detalles, turno, motivo, boton "asignar personal" de nueva asignacion

### Frontend