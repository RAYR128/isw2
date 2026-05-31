import { getContratoEjecutivoRepo } from "../database/database.js";

// GET /contratos/ejecutivo
export async function listarEjecutivos(req, res) {
	const repo = getContratoEjecutivoRepo();
	const contratos = await repo.find({ order: { id: "ASC" } });
	res.json(contratos);
}

// POST /contratos/ejecutivo, para persistir
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
