import { getContratoPersonalRepo, getAsignacionPersonalRepo } from "../database/database.js";

// Calcula estado del contrato
function calcularEstadoContrato(contrato) {
	const hoy = new Date();
	const inicio = new Date(contrato.inicio);
	if (hoy < inicio) {
		return "Pendiente";
	}
	const duracionAnios = contrato.duracion_anos || parseInt(contrato.duracion) || 0;
	const fechaFin = new Date(inicio);
	fechaFin.setFullYear(inicio.getFullYear() + duracionAnios);
	const tiempoRestante = fechaFin - hoy;
	if (tiempoRestante <= 0) {
		return "Vencido";
	} else if (tiempoRestante <= 30 * 24 * 60 * 60 * 1000) {
		return "Proximo a vencer";
	}
	return "Activo";
}

// GET /contratos/personal -> [{id, nombre}]
export async function listarContratos(req, res) {
	const repo = getContratoPersonalRepo();
	const contratos = await repo.find({ order: { id: "ASC" } });
	const workers = contratos.map((c) => ({ id: c.id, nombre: c.nombre }));
	res.json(workers);
}

// GET /contratos/personal/:id -> full + estado
export async function obtenerContrato(req, res) {
	const id = parseInt(req.params.id);
	const repo = getContratoPersonalRepo();
	const contrato = await repo.findOne({ where: { id } });

	if (!contrato) {
		return res.status(404).json({ mensaje: "Contrato no encontrado" });
	}

	res.json({
		nombre: contrato.nombre,
		inicio: contrato.inicio,
		duracion: `${contrato.duracion_anos} años`,
		salario: contrato.salario,
		ipc: parseFloat(contrato.ipc),
		estado: calcularEstadoContrato(contrato),
	});
}

// POST /contratos/personal -> crear
export async function crearContrato(req, res) {
	const { nombre, inicio, duracion, salario, ipc } = req.body;
	const repo = getContratoPersonalRepo();

	const newContrato = {
		nombre,
		inicio,
		duracion_anos: parseInt(duracion),
		salario: parseInt(salario),
		ipc: parseFloat(ipc),
	};

	const guardado = await repo.save(newContrato);
	res.status(201).json({
		...guardado,
		duracion: `${guardado.duracion_anos} años`,
	});
}

// POST /contratos/personal/:id -> modificar (parcial)
export async function modificarContrato(req, res) {
	const id = parseInt(req.params.id);
	const { nombre, inicio, duracion, salario, ipc } = req.body;
	const repo = getContratoPersonalRepo();

	const contrato = await repo.findOne({ where: { id } });
	if (!contrato) {
		return res.status(404).json({ mensaje: "Contrato no encontrado" });
	}

	if (nombre) { contrato.nombre = nombre; }
	if (inicio) { contrato.inicio = inicio; }
	if (duracion) { contrato.duracion_anos = parseInt(duracion); }
	if (salario) { contrato.salario = parseInt(salario); }
	if (ipc) { contrato.ipc = parseFloat(ipc); }

	const guardado = await repo.save(contrato);
	res.json({
		...guardado,
		duracion: `${guardado.duracion_anos} años`,
	});
}

// DELETE /contratos/personal/:id -> eliminar
export async function eliminarContrato(req, res) {
	const id = parseInt(req.params.id);
	const repo = getContratoPersonalRepo();

	const contrato = await repo.findOne({ where: { id } });
	if (!contrato) {
		return res.status(404).json({ mensaje: "Contrato no encontrado" });
	}

	const asignacionRepo = getAsignacionPersonalRepo();
	const asignaciones = await asignacionRepo.count({
		where: { contrato_personal_id: id },
	});
	if (asignaciones > 0) {
		return res.status(409).json({
			mensaje: "No se puede eliminar: el trabajador esta asignado a una asignacion",
		});
	}

	await repo.delete(id);
	res.json({ mensaje: "Contrato eliminado exitosamente" });
}
