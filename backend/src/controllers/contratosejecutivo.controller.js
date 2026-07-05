import { getContratoEjecutivoRepo } from "../database/database.js";

// GET /contratos/ejecutivos
export async function listarEjecutivos(req, res) {
	const repo = getContratoEjecutivoRepo();
	const contratos = await repo.find({ order: { id: "ASC" } });
	res.json(contratos);
}

// GET /contratos/ejecutivos/:id
export async function obtenerEjecutivo(req, res) {
	const id = parseInt(req.params.id);
	const repo = getContratoEjecutivoRepo();
	const contrato = await repo.findOne({ where: { id } });

	if (!contrato) {
		return res.status(404).json({ mensaje: "Contrato ejecutivo no encontrado" });
	}

	res.json(contrato);
}

// POST /contratos/ejecutivos, para persistir
export async function crearEjecutivo(req, res) {
	const {
		nombre,
		cargo,
		experiencia,
		salario,
		especializacion,
		fecha_entrevista,
		prioridad,
		comentarios,
	} = req.body;

	const repo = getContratoEjecutivoRepo();

	const newItem = {
		nombre,
		cargo,
		experiencia: experiencia ? parseInt(experiencia) : 0,
		salario: salario ? parseInt(salario) : 0,
		especializacion,
		fecha_entrevista: fecha_entrevista || null,
		prioridad,
		comentarios,
		fecha_contratacion: fecha_entrevista || new Date().toISOString().split("T")[0],
		estado: "En Proceso",
	};

	const saved = await repo.save(newItem);
	res.status(201).json(saved);
}

// POST /contratos/ejecutivos/:id -> modificar (parcial)
export async function modificarEjecutivo(req, res) {
	const id = parseInt(req.params.id);
	const {
		salario,
		especializacion,
		fecha_entrevista,
		fecha_contratacion,
		prioridad,
		comentarios,
	} = req.body;
	const repo = getContratoEjecutivoRepo();

	const contrato = await repo.findOne({ where: { id } });
	if (!contrato) {
		return res.status(404).json({ mensaje: "Contrato ejecutivo no encontrado" });
	}

	if (salario !== undefined && salario !== null && salario !== "") {
		contrato.salario = parseInt(salario);
	}
	if (especializacion !== undefined) {
		contrato.especializacion = especializacion;
	}
	if (fecha_entrevista !== undefined) {
		contrato.fecha_entrevista = fecha_entrevista || null;
	}
	if (fecha_contratacion !== undefined && fecha_contratacion !== "") {
		contrato.fecha_contratacion = fecha_contratacion;
	}
	if (prioridad !== undefined) {
		contrato.prioridad = prioridad;
	}
	if (comentarios !== undefined) {
		contrato.comentarios = comentarios;
	}

	const guardado = await repo.save(contrato);
	res.json(guardado);
}

// DELETE /contratos/ejecutivos/:id
export async function eliminarEjecutivo(req, res) {
	const id = parseInt(req.params.id);
	const repo = getContratoEjecutivoRepo();

	const contrato = await repo.findOne({ where: { id } });
	if (!contrato) {
		return res.status(404).json({ mensaje: "Contrato ejecutivo no encontrado" });
	}

	await repo.delete(id);
	res.json({ mensaje: "Contrato ejecutivo eliminado exitosamente" });
}