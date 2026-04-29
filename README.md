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

## Backend (/api/)
* [ ] POST /login - creacion de sesion y validacion de usuario/contraseña

### Asignaciones
* [ ] POST /crearAsignacion - creacion de cliente, ubicacion, necesidades, y cantidad de personal recomendado
* [ ] GET /asignacion/{id}/detalles - detalles de una asignacion especifica, retorna cliente, ubicacion, personal y cantidad recomendada, herramientas, y estado
* [ ] GET /asignacion/{id}/distribucion - distribucion de personal en una asignacion especificacion, en un arreglo mostrando el nombre del trabajador, el turno, inicio, estado
* [ ] POST /asignacion/{id}/personal/remover - remover un personal de una asignacion, boton "remover" de distribuciones actuales
* [ ] GET /asignacion/{id}/personal/detalles - ver las tareas/detalles de un personal de una asignacion, boton "ver mas detalles" de distribuciones actuales
* [ ] POST /asignacion/{id}/personal/agregar - agregar un nuevo personal, trabajador, vestuario, equipo, herramientas, detalles, turno, motivo, boton "asignar personal" de nueva asignacion

### Contratos - Personal
* [ ] GET /contratos/personal - Contratos activos, retorna arreglo con nombre de trabajador, inicio, duracion, salario / IPC, y un estado
* [ ] POST /contratos/personal - Crear un contrato, espera nombre del trabajador, fecha de inicio, duracion, tipo, salario, IPC

### Contratos - Ejecutivo/Administracion
* [ ] GET /contratos/ejecutivo
* [ ] POST /contratos/ejecutivo

## Frontend
Trabajo en progreso, portear mockup con Tailwind a React. La idea es reemplazar los mockups para que utilizen un CSS mas modificado, y despues utilizar codigo para contactar al backend para la informacion a rellenar en las paginas.

* [ ] / - pagina de dashboard.html o login.html
* [ ] /asignacion - asignacion.html - pagina de asignacion
* [ ] /asignacion/{id} - distribucionasignacion.html pagina de distribucion de personal para una asignacion
* [ ] /contratos/personal - contratospersonal.html pagina de contrato personal
* [ ] /contratos/ejecutivo - contratosejecutivo.html pagina de contrato ejecutivo

## Referencia algunos templates que son importantes
### Header Pagina Dashboard
```html
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejemplo - Empresa de Aseos</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <header class="bg-blue-600 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">Empresa de Aseos</h1>
            <nav>
                <a href="dashboard.html" class="hover:underline mr-4">Dashboard</a>
                <a href="index.html" class="hover:underline">Cerrar Sesion</a>
            </nav>
        </div>
    </header>
    <main class="container mx-auto p-6">
        <h2 class="text-2xl font-bold mb-6">Ejemplo</h2>
    </main>
</body>
```