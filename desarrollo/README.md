# Mockup
Mockup de paginas, utilizando tailwind

La idea es despues se va a reemplazar con su propio CSS, y poder incorporar los mockups a un proyecto con Vite para generar las paginas de forma dinamica contactando al backend para la informacion a rellenar en algunas paginas

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