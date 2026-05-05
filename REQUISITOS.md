# Requisitos del Sistema de Gestion - Empresa de Aseos
Requisitos

## Planilla
* **¿Quien?**
* **¿Que?**
* **¿Cuando?**
* **¿Como?**
* **Restriccion?**
* **Postcondicion?**

## Requisito 1: Autenticacion de Usuario
* **¿Quien?** Usuario del sistema (personal administrativo o ejecutivo de la empresa)
* **¿Que?** Iniciar sesion en el sistema de gestion
* **¿Cuando?** Al acceder al sistema desde cualquier pagina
* **¿Como?** Ingresar credenciales validas (usuario y contraseña) en el formulario de login
* **Restriccion?** Solo usuarios registrados con credenciales validas pueden acceder; maximo 3 intentos fallidos antes de bloqueo temporal (ratelimit)
* **Postcondicion?** Usuario autenticado accede al dashboard principal

## Requisito 2: Evaluacion de Volumen de Personal
* **¿Quien?** Administrador o encargado de operaciones
* **¿Que?** Evaluar y determinar el volumen de personal necesario para un cliente
* **¿Cuando?** Al recibir una nueva solicitud de servicio o cambio en necesidades del cliente
* **¿Como?** Seleccionar tipo de cliente, ubicacion, describir necesidad de limpieza, especificar cantidad recomendada de personal y herramientas requeridas
* **Restriccion?** Evaluacion debe basarse en tipo de cliente (hospital requiere mas personal que banco); presupuesto debe ser negociado si excede limites
* **Postcondicion?** Evaluacion guardada y disponible para asignacion de personal

## Requisito 3: Asignacion de Personal a Cliente
* **¿Quien?** Administrador de operaciones
* **¿Que?** Asignar personal especifico a un cliente con equipamiento y turnos
* **¿Cuando?** Despues de evaluacion de volumen o cuando hay cambios en distribucion
* **¿Como?** Seleccionar trabajador, turno, fecha de inicio, duracion y tareas especificas
* **Restriccion?** Solo trabajadores disponibles pueden ser asignados; equipamiento debe corresponder al tipo de cliente; turnos deben cubrir 24/7 segun necesidad
* **Postcondicion?** Asignacion registrada y personal notificado para iniciar trabajo

## Requisito 4: Gestion de Contratos de Trabajo
* **¿Quien?** Administrador de recursos humanos o contador
* **¿Que?** Crear y gestionar contratos de trabajo para trabajadores asignados a clientes
* **¿Cuando?** Al contratar nuevo personal o renovar contratos existentes
* **¿Como?** Ingresar datos del trabajador, cliente asignado, fecha de inicio, duracion (1-5 años), salario base y ajuste IPC
* **Restriccion?** Contratos deben incluir ajuste IPC para contratos largos; duracion maxima 5 años; salario debe ajustarse segun negociacion con cliente
* **Postcondicion?** Contrato creado y almacenado en base de datos

## Requisito 5: Contratacion de Personal Ejecutivo
* **¿Quien?** Gerente de recursos humanos o director ejecutivo
* **¿Que?** Iniciar proceso de contratacion para personal especializado (contadores, prevencionistas, etc.)
* **¿Cuando?** Cuando hay vacantes en posiciones ejecutivas o necesidad de expansion
* **¿Como?** Ingresar nombre del candidato, cargo, años de experiencia, salario propuesto, especializacion requerida, fecha de entrevista y prioridad
* **Restriccion?** Solo posiciones criticas como contadores (minimo 2), encargado de ventas; proceso debe incluir entrevistas y verificacion de certificaciones
* **Postcondicion?** Proceso de contratacion iniciado y candidato registrado en sistema

## Requisito 6: Visualizacion de Dashboard
* **¿Quien?** Usuario autenticado
* **¿Que?** Ver resumen de modulos principales del sistema
* **¿Cuando?** Despues de login exitoso
* **¿Como?** Acceder a enlaces de Volumen de Personal, Contratos y Administracion de Contratacion
* **Restriccion?** Solo usuarios con permisos adecuados pueden ver ciertos modulos
* **Postcondicion?** Usuario navega a modulo seleccionado