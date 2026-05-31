import express from 'express';

const router = express.Router();

// Datos temporales por ahora hasta que implemente la BD actual, pero da una estructura
const asignaciones = [
	{
		id: 1,
		cliente: 'Hospital Regional',
		ubicacion: 'Concepcion',
		necesidad: 'Limpieza general de instalaciones',
		personal_recomendado: 25,
		estado: 'Activo',
		herramientas: ['Aspiradoras', 'Productos quimicos', 'Equipos de limpieza']
	},
	{
		id: 2,
		cliente: 'Banco Estado',
		ubicacion: 'Chillan',
		necesidad: 'Mantenimiento de oficinas',
		personal_recomendado: 10,
		estado: 'Pendiente',
		herramientas: ['Aspiradoras', 'Limpiavidrios']
	}
];

// Datos temporales por ahora hasta que implemente la BD actual, pero da una estructura
const distribuciones = {
	1: [
		{
			id_trabajador: 1,
			turno: 'Mañana',
			inicio: '2024-01-15',
			estado: 'Activo',
			duracion: 30,
			detalles: 'Limpieza de habitaciones y areas comunes'
		},
		{
			id_trabajador: 2,
			turno: 'Tarde',
			inicio: '2024-01-15',
			estado: 'Activo',
			duracion: 30,
			detalles: 'Limpieza de baños y cocinas'
		}
	],
	2: [
		{
			id_trabajador: 3,
			turno: 'Mañana',
			inicio: '2025-03-10',
			estado: 'Cambio Pendiente',
			duracion: 15,
			detalles: 'Limpieza de oficinas ejecutivas'
		},
		{
			id_trabajador: 4,
			turno: 'Noche',
			inicio: '2026-06-15',
			estado: 'Activo',
			duracion: 10,
			detalles: 'Limpieza nocturna de sucursal'
		}
	]
};

// GET /asignacion - lista todas las asignaciones con resumen
router.get('/asignacion', (req, res) => {
	const asignacionesResumen = asignaciones.map(asignacion => {
		const distribucion = distribuciones[asignacion.id] || [];
		const personalAsignado = distribucion.length;
		return {
			id: asignacion.id,
			cliente: asignacion.cliente,
			ubicacion: asignacion.ubicacion,
			personal: `${personalAsignado}/${asignacion.personal_recomendado}`,
			estado: asignacion.estado
		};
	});
	res.json(asignacionesResumen);
});

// POST /crearAsignacion - creacion de cliente, ubicacion, necesidades, y cantidad de personal recomendado
router.post('/crearAsignacion', (req, res) => {
	const { cliente, ubicacion, necesidad, personal } = req.body;

	const newId = Math.max(...asignaciones.map(a => a.id)) + 1;
	const newAsignacion = {
		id: newId,
		cliente,
		ubicacion,
		necesidad,
		personal_recomendado: parseInt(personal),
		estado: 'Pendiente',
		herramientas: []
	};

	asignaciones.push(newAsignacion);
	distribuciones[newId] = [];

	res.status(201).json(newAsignacion);
});

// GET /asignacion/{id}/detalles - detalles de una asignacion especifica, retorna cliente, ubicacion, personal y cantidad recomendada, herramientas, y estado
router.get('/asignacion/:id/detalles', (req, res) => {
	const id = parseInt(req.params.id);
	const asignacion = asignaciones.find(a => a.id === id);

	if (!asignacion) {
		return res.status(404).json({ mensaje: 'Asignacion no encontrada' });
	}

	res.json({
		cliente: asignacion.cliente,
		ubicacion: asignacion.ubicacion,
		personal: asignacion.personal_recomendado,
		herramientas: asignacion.herramientas,
		estado: asignacion.estado
	});
});

// ET /asignacion/{id}/distribucion - distribucion de personal en una asignacion especificacion, en un arreglo mostrando el ID del trabajador (se ven los datos con /contratos/personal/{PID}), el turno, inicio, estado
router.get('/asignacion/:id/distribucion', (req, res) => {
	const id = parseInt(req.params.id);
	const distribucion = distribuciones[id] || [];

	res.json(distribucion.map(d => ({
		id_trabajador: d.id_trabajador,
		turno: d.turno,
		inicio: d.inicio,
		estado: d.estado
	})));
});

// POST /asignacion/{id}/personal/remover - remover un personal de una asignacion, boton "remover" de distribuciones actuales
router.post('/asignacion/:id/personal/remover', (req, res) => {
	const id = parseInt(req.params.id);
	const { id_trabajador } = req.body;

	if (!distribuciones[id]) {
		return res.status(404).json({ mensaje: 'Asignacion no encontrada' });
	}

	distribuciones[id] = distribuciones[id].filter(d => d.id_trabajador !== parseInt(id_trabajador));
	res.json({ mensaje: 'Personal removido exitosamente' });
});

// GET /asignacion/{id}/personal/detalles - ver las tareas/detalles de un personal de una asignacion, boton "ver mas detalles" de distribuciones actuales
router.get('/asignacion/:id/personal/detalles', (req, res) => {
	const id = parseInt(req.params.id);
	const { id_trabajador } = req.query;

	if (!distribuciones[id]) {
		return res.status(404).json({ mensaje: 'Asignacion no encontrada' });
	}

	const personal = distribuciones[id].find(d => d.id_trabajador === parseInt(id_trabajador));

	if (!personal) {
		return res.status(404).json({ mensaje: 'Personal no encontrado en esta asignacion' });
	}

	// tenemos el ID del personal, en el futuro lo ideal seria parsear el id_trabajador
	// y utilizar el mismo sistema de /contratos/personal/:id igual para obtener el nombre aqui
	res.json({
		turno: personal.turno,
		inicio: personal.inicio,
		estado: personal.estado,
		duracion: personal.duracion,
		detalles: personal.detalles
	});
});

// POST /asignacion/{id}/personal/agregar - agregar un nuevo personal, trabajador, vestuario, equipo, herramientas, detalles, turno, motivo, boton "asignar personal" de nueva asignacion
router.post('/asignacion/:id/personal/agregar', (req, res) => {
	const id = parseInt(req.params.id);
	const { trabajador, vestuario, seguridad, herramientas, detalles, turno, fecha_inicio, duracion, motivo } = req.body;

	// Si no existe la distribucion aun, crearla
	if (!distribuciones[id]) {
		distribuciones[id] = [];
	}

	// Por ahora asi nomas.. en el futuro lo ideal seria parsear el id_trabajador
	// y utilizar el mismo sistema de /contratos/personal/:id
	const newPersonal = {
		id_trabajador: parseInt(trabajador),
		turno,
		inicio: fecha_inicio,
		estado: 'Nuevo',
		duracion: parseInt(duracion),
		detalles
	};

	distribuciones[id].push(newPersonal);
	res.status(201).json(newPersonal);
});

export default router;