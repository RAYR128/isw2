import { getAsignacionRepo, getAsignacionPersonalRepo } from "../database/database.js";

// function para determinar herramientas necesarias segun ubicacion
function herramientasDeAcuerdoAUbicacion(ubicacion) {
	ubicacion = (ubicacion || "").toLowerCase();
	if (ubicacion.includes("hospital")) {
		return ["Trajes de bioseguridad", "Guantes", "Mascarillas", "Desinfectantes hospitalarios"];
	}
	return ["Aspiradoras", "Productos quimicos", "Equipos de limpieza"];
}

// Calcular estado dinamicamente basado en duracion (por item de distribucion)
function calcularEstado(distribucionItem) {
	const now = new Date();
	let estado = "Pendiente";
	if (!distribucionItem) return estado;

	const start = new Date(distribucionItem.inicio);
	const end = new Date(start);
	end.setDate(end.getDate() + (distribucionItem.duracion || 0));

	if (now >= start && now < end) {
		estado = "Activo";
	} else if (now >= end) {
		estado = "Inactivo";
	}
	return estado;
}

// GET /asignacion - lista todas con resumen (cuenta personal desde distribuciones)
export async function listarResumen(req, res) {
	const asignRepo = getAsignacionRepo();
	const distribRepo = getAsignacionPersonalRepo();

	const asignaciones = await asignRepo.find({ order: { id: "ASC" } });
	const distribuciones = await distribRepo.find();

	// Agrupar conteos por asignacion_id
	const counts = {};
	for (const d of distribuciones) {
		counts[d.asignacion_id] = (counts[d.asignacion_id] || 0) + 1;
	}

	const resumen = asignaciones.map((a) => {
		const personalAsignado = counts[a.id] || 0;
		return {
			id: a.id,
			cliente: a.cliente,
			ubicacion: a.ubicacion,
			personal: `${personalAsignado}/${a.personal_recomendado}`,
			estado: a.estado,
		};
	});

	res.json(resumen);
}

// POST /crearAsignacion
export async function crearAsignacion(req, res) {
	const { cliente, ubicacion, necesidad, personal } = req.body;
	const repo = getAsignacionRepo();

	const newAsign = {
		cliente,
		ubicacion,
		necesidad,
		personal_recomendado: parseInt(personal) || 1,
		estado: "Pendiente",
	};

	const saved = await repo.save(newAsign);
	res.status(201).json(saved);
}

// GET /asignacion/:id/detalles
export async function obtenerDetalles(req, res) {
	const id = parseInt(req.params.id);
	const repo = getAsignacionRepo();
	const asignacion = await repo.findOne({ where: { id } });

	if (!asignacion) {
		return res.status(404).json({ mensaje: "Asignacion no encontrada" });
	}

	res.json({
		cliente: asignacion.cliente,
		ubicacion: asignacion.ubicacion,
		personal: asignacion.personal_recomendado,
		necesidad: asignacion.necesidad,
		herramientas: herramientasDeAcuerdoAUbicacion(asignacion.ubicacion),
		estado: asignacion.estado,
	});
}

// GET /asignacion/:id/distribucion
export async function obtenerDistribucion(req, res) {
	const id = parseInt(req.params.id);
	const repo = getAsignacionPersonalRepo();
	const distrib = await repo.find({ where: { asignacion_id: id }, order: { id: "ASC" } });

	const mapped = distrib.map((d) => ({
		id_trabajador: d.contrato_personal_id,
		turno: d.turno,
		inicio: d.inicio,
		estado: calcularEstado(d),
	}));
	res.json(mapped);
}

// POST /asignacion/:id/personal/remover
export async function removerPersonal(req, res) {
	const asignId = parseInt(req.params.id);
	const { id_trabajador } = req.body;
	const repo = getAsignacionPersonalRepo();

	const result = await repo
		.createQueryBuilder()
		.delete()
		.where("asignacion_id = :aid AND contrato_personal_id = :tid", {
			aid: asignId,
			tid: parseInt(id_trabajador),
		})
		.execute();

	// todo: deberia tirar un error probablemente? no se si realmente importa el frontend nunca lee los estados de codigo y creo que esto sirve
	if (result.affected === 0) {
		return res.json({ mensaje: "No se selecciono ningun personal" });
	}
	res.json({ mensaje: "Personal removido exitosamente" });
}

// GET /asignacion/:id/personal/detalles?id_trabajador=XX
export async function obtenerPersonalDetalles(req, res) {
	const asignId = parseInt(req.params.id);
	const trabajadorId = parseInt(req.query.id_trabajador);
	const repo = getAsignacionPersonalRepo();

	const personal = await repo.findOne({
		where: { asignacion_id: asignId, contrato_personal_id: trabajadorId },
	});

	if (!personal) {
		return res.status(404).json({ mensaje: "Personal no encontrado en esta asignacion" });
	}

	res.json({
		turno: personal.turno,
		inicio: personal.inicio,
		estado: calcularEstado(personal),
		duracion: personal.duracion,
		detalles: personal.detalles,
	});
}

// POST /asignacion/:id/personal/agregar
export async function agregarPersonal(req, res) {
	const asignId = parseInt(req.params.id);
	const { trabajador, detalles, turno, fecha_inicio, duracion } = req.body;
	const repo = getAsignacionPersonalRepo();

	const newRow = {
		asignacion_id: asignId,
		contrato_personal_id: parseInt(trabajador),
		turno,
		inicio: fecha_inicio,
		duracion: parseInt(duracion) || 1,
		detalles,
	};

	const saved = await repo.save(newRow);
	res.status(201).json({
		id_trabajador: saved.contrato_personal_id,
		turno: saved.turno,
		inicio: saved.inicio,
		duracion: saved.duracion,
		detalles: saved.detalles,
	});
}
