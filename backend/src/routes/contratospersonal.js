import express from 'express';

const router = express.Router();

// Datos temporales por ahora hasta que implemente la BD actual, pero da una estructura
const contratosPersonal = [
	{
		id: 1,
		nombre: 'Maria Gonzalez',
		inicio: '2024-01-15',
		duracion: '3 años',
		salario: 350000,
		ipc: 3.5,
		estado: 'Activo'
	},
	{
		id: 2,
		nombre: 'Carlos Rodriguez',
		inicio: '2023-06-01',
		duracion: '5 años',
		salario: 350000,
		ipc: 3.5,
		estado: 'Activo'
	},
	{
		id: 3,
		nombre: 'Ana Lopez',
		inicio: '2025-03-10',
		duracion: '2 años',
		salario: 350000,
		ipc: 3.5,
		estado: 'Proximo a vencer'
	},
	{
		id: 4,
		nombre: 'Juan Perez',
		inicio: '2024-08-20',
		duracion: '4 años',
		salario: 360000,
		ipc: 3.2,
		estado: 'Activo'
	}
];

// GET /contratos/personal - Contratos activos, retorna arreglo con IDs para usarlos en /contratos/personal/{id}
router.get('/contratos/personal', (req, res) => {
	const workers = contratosPersonal.map(c => ({
		id: c.id,
		nombre: c.nombre
	}));
	res.json(workers);
});

// GET /contratos/personal/{id} - Retorna arreglo con nombre de trabajador, inicio, duracion, salario / IPC, y un estado
router.get('/contratos/personal/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const contrato = contratosPersonal.find(c => c.id === id);

	if (!contrato) {
		return res.status(404).json({ mensaje: 'Contrato no encontrado' });
	}

	res.json(contrato);
});

// POST /contratos/personal - Crear un contrato, espera nombre del trabajador, fecha de inicio, duracion, tipo, salario, IPC
router.post('/contratos/personal', (req, res) => {
	const { nombre, inicio, duracion, salario, ipc } = req.body;

	const newId = Math.max(...contratosPersonal.map(c => c.id)) + 1;
	const newContrato = {
		id: newId,
		nombre,
		inicio,
		duracion: `${duracion} años`,
		salario: parseInt(salario),
		ipc: parseFloat(ipc),
		estado: 'Activo'
	};

	contratosPersonal.push(newContrato);
	res.status(201).json(newContrato);
});

// POST /contratos/personal/{id} - Modificar contrato existente
router.post('/contratos/personal/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { nombre, inicio, duracion, salario, ipc } = req.body;

	const contratoIndex = contratosPersonal.findIndex(c => c.id === id);

	if (contratoIndex === -1) {
		return res.status(404).json({ mensaje: 'Contrato no encontrado' });
	}

	contratosPersonal[contratoIndex] = {
		...contratosPersonal[contratoIndex],
		nombre: nombre || contratosPersonal[contratoIndex].nombre,
		inicio: inicio || contratosPersonal[contratoIndex].inicio,
		duracion: duracion ? `${duracion} años` : contratosPersonal[contratoIndex].duracion,
		salario: salario ? parseInt(salario) : contratosPersonal[contratoIndex].salario,
		ipc: ipc ? parseFloat(ipc) : contratosPersonal[contratoIndex].ipc
	};

	res.json(contratosPersonal[contratoIndex]);
});

export default router;