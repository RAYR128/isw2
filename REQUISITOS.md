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
* **¿Como?** Seleccionar trabajador, asignar vestuario basico, equipo de seguridad, herramientas especializadas, turno, fecha de inicio, duracion y tareas especificas
* **Restriccion?** Solo trabajadores disponibles pueden ser asignados; equipamiento debe corresponder al tipo de cliente; turnos deben cubrir 24/7 segun necesidad
* **Postcondicion?** Asignacion registrada y personal notificado para iniciar trabajo

## Requisito 4: Gestion de Contratos de Trabajo
* **¿Quien?** Administrador de recursos humanos o contador
* **¿Que?** Crear y gestionar contratos de trabajo para trabajadores asignados a clientes
* **¿Cuando?** Al contratar nuevo personal o renovar contratos existentes
* **¿Como?** Ingresar datos del trabajador, cliente asignado, fecha de inicio, duracion (1-5 años), tipo de contrato, necesidad de la empresa, salario base y ajuste IPC
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

## Requisito 7: Modificacion de Distribuciones de Personal
* **¿Quien?** Administrador de operaciones
* **¿Que?** Modificar asignaciones existentes de personal
* **¿Cuando?** Cuando hay cambios en necesidades del cliente o redistribucion requerida
* **¿Como?** Acceder a tabla de asignaciones recientes y seleccionar "Modificar" para ajustar trabajador, equipamiento o turnos
* **Restriccion?** No se pueden modificar asignaciones activas sin aprobacion; cambios deben documentarse
* **Postcondicion?** Distribucion actualizada y cambios aplicados

## Requisito 8: Remocion de Personal de Asignacion
* **¿Quien?** Administrador de operaciones
* **¿Que?** Remover personal de una asignacion activa
* **¿Cuando?** Al finalizar contrato, cambio de cliente o reestructuracion
* **¿Como?** Seleccionar "Remover" en tabla de distribuciones actuales
* **Restriccion?** Solo administradores pueden remover asignaciones; debe haber justificacion para auditoria
* **Postcondicion?** Personal removido y disponible para nuevas asignaciones

## Requisito 9: Gestion de Procesos de Contratacion en Curso
* **¿Quien?** Gerente de recursos humanos
* **¿Que?** Monitorear y actualizar procesos de contratacion de personal ejecutivo
* **¿Cuando?** Durante el proceso de seleccion de candidatos
* **¿Como?** Ver tabla de procesos en curso, actualizar estados y fechas de entrevistas
* **Restriccion?** Procesos deben completarse en tiempo razonable; candidatos deben cumplir requisitos minimos
* **Postcondicion?** Proceso avanzado o completado segun actualizaciones

## Requisito 10: Organizacion de Turnos
* **¿Quien?** Sistema o administrador de operaciones
* **¿Que?** Organizar turnos de trabajo para cubrir necesidades 24/7
* **¿Cuando?** Al asignar personal o redistribuir
* **¿Como?** Asignar turnos mañana (08:00-16:00), tarde (16:00-24:00), noche (24:00-08:00) segun requerimientos del cliente
* **Restriccion?** Turnos deben cubrir demanda completa; personal no puede trabajar mas de turnos permitidos por ley
* **Postcondicion?** Turnos asignados y programados

## Requisito 11: Gestion de Contabilidad
* **¿Quien?** Contadores de la empresa
* **¿Que?** Manejar contabilidad de la empresa y costos por cliente
* **¿Cuando?** Periodicamente o al generar facturas
* **¿Como?** Registrar ingresos, gastos, ajustes IPC y costos variables por cliente
* **Restriccion?** Minimo 2 contadores fijos; costos deben negociarse con cliente si exceden presupuesto
* **Postcondicion?** Estados financieros actualizados y disponibles

## Requisito 12: Gestion de Ventas y Marketing
* **¿Quien?** Encargado de ventas
* **¿Que?** Promocionar servicios y gestionar ofertas en mercado publico
* **¿Cuando?** Continuamente para adquirir nuevos clientes
* **¿Como?** Publicar ofertas en plataforma de mercado publico, contactar clientes potenciales directamente
* **Restriccion?** Enfocarse en region del Bio Bio; no expandir a otras regiones
* **Postcondicion?** Nuevos contratos o renovaciones obtenidas