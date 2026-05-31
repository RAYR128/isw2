import express from 'express';

const router = express.Router();

// Datos temporales por ahora hasta que implemente la BD actual, pero da una estructura
const contratosEjecutivo = [
	{
		id: 1,
		nombre: 'Roberto Martinez',
		cargo: 'Contador Principal',
		fecha_contratacion: '2020-03-15',
		estado: 'Activo'
	},
	{
		id: 2,
		nombre: 'Maria Jose Silva',
		cargo: 'Contador',
		fecha_contratacion: '2021-08-20',
		estado: 'Activo'
	},
	{
		id: 3,
		nombre: 'Carlos Muñoz',
		cargo: 'Encargado de Ventas',
		fecha_contratacion: '2019-11-10',
		estado: 'Activo'
	},
	{
		id: 4,
		nombre: 'Ana Gonzalez',
		cargo: 'Prevencionista de Riesgos',
		fecha_contratacion: '2022-01-05',
		estado: 'Inactivo'
	}
];

// GET /contratos/ejecutivo
router.get('/contratos/ejecutivo', (req, res) => {
	res.json(contratosEjecutivo);
});

// POST /contratos/ejecutivo
router.post('/contratos/ejecutivo', (req, res) => {
	const { nombre, cargo, experiencia, salario, especializacion, fecha_entrevista, prioridad, comentarios } = req.body;

	// Solo crear esto por ahora..
	const newId = Math.max(...contratosEjecutivo.map(c => c.id)) + 1;
	const newContrato = {
		id: newId,
		nombre,
		cargo,
		fecha_contratacion: fecha_entrevista || new Date().toISOString().split('T')[0],
		estado: 'En Proceso'
	};
	contratosEjecutivo.push(newContrato);
	res.status(201).json(newContrato);
});

export default router;