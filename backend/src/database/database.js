"use strict";
import { createConnection } from "typeorm";
import { DATABASE, DB_HOST, DB_USERNAME, PASSWORD, DB_PORT } from "../configuracion/env.js";
import { getRepository } from "typeorm";
import { Usuario } from "../schema/usuario.js";
import { Asignacion } from "../schema/asignacion.js";
import { ContratoPersonal } from "../schema/contratoPersonal.js";
import { ContratoEjecutivo } from "../schema/contratoEjecutivo.js";
import { AsignacionPersonal } from "../schema/asignacionPersonal.js";
import bcrypt from "bcrypt";

export let connection;

export async function connectDB() {
	try {
		connection = await createConnection({
			type: "postgres",
			host: `${DB_HOST}`,
			port: DB_PORT,
			username: `${DB_USERNAME}`,
			password: `${PASSWORD}`,
			database: `${DATABASE}`,
			entities: ["src/schema/**/*.js"],
			synchronize: true,
			logging: false,
		});
		console.log("=> Conexión exitosa a la base de datos PostgreSQL!");
	} catch (error) {
		console.error("Error al conectar con la base de datos:", error);
		process.exit(1);
	}
}

const SALT_ROUNDS = 10;

// Getters del repo (seguros despues de inicio de DB)
export function getUsuarioRepo() {
	return getRepository(Usuario);
}

export function getAsignacionRepo() {
	return getRepository(Asignacion);
}

export function getContratoPersonalRepo() {
	return getRepository(ContratoPersonal);
}

export function getContratoEjecutivoRepo() {
	return getRepository(ContratoEjecutivo);
}

export function getAsignacionPersonalRepo() {
	return getRepository(AsignacionPersonal);
}

// Valores de prueba del DB
export async function inicializarValoresPruebaDB() {
	const usuarioRepo = getUsuarioRepo();
	const contratoPersonalRepo = getContratoPersonalRepo();
	const contratoEjecutivoRepo = getContratoEjecutivoRepo();
	const asignacionRepo = getAsignacionRepo();
	const asignacionPersonalRepo = getAsignacionPersonalRepo();

	// creacion de valores iniciales
	const adminExiste = await usuarioRepo.findOne({ where: { username: "admin" } });
	if (!adminExiste) {
		const hashed = await bcrypt.hash("password", SALT_ROUNDS);
		await usuarioRepo.save({
			username: "admin",
			password: hashed,
			nombre: "Administrador",
			rol: "admin",
		});
		console.log("Creado: Usuario admin:password");
	}

	const personalCount = await contratoPersonalRepo.count();
	if (personalCount === 0) {
		await contratoPersonalRepo.save([
			{ id: 1, nombre: "Maria Gonzalez", inicio: "2024-01-15", duracion_anos: 3, salario: 350000, ipc: 3.5 },
			{ id: 2, nombre: "Carlos Rodriguez", inicio: "2023-06-01", duracion_anos: 5, salario: 350000, ipc: 3.5 },
			{ id: 3, nombre: "Ana Lopez", inicio: "2025-03-10", duracion_anos: 2, salario: 350000, ipc: 3.5 },
			{ id: 4, nombre: "Juan Perez", inicio: "2024-08-20", duracion_anos: 4, salario: 360000, ipc: 3.2 },
		]);
		console.log("Creado: 4 contratos personal");
	}

	const ejecutivoCount = await contratoEjecutivoRepo.count();
	if (ejecutivoCount === 0) {
		await contratoEjecutivoRepo.save([
			{ id: 1, nombre: "Roberto Martinez", cargo: "Contador Principal", experiencia: 10, salario: 1200000, especializacion: "Contabilidad financiera", fecha_entrevista: "2020-02-01", prioridad: "Alta", comentarios: "Candidato interno recomendado", fecha_contratacion: "2020-03-15", estado: "Activo" },
			{ id: 2, nombre: "Maria Jose Silva", cargo: "Contador", experiencia: 6, salario: 950000, especializacion: "Impuestos", fecha_entrevista: "2021-07-15", prioridad: "Media", comentarios: "", fecha_contratacion: "2021-08-20", estado: "Activo" },
			{ id: 3, nombre: "Carlos Muñoz", cargo: "Encargado de Ventas", experiencia: 12, salario: 1100000, especializacion: "B2B", fecha_entrevista: "2019-10-01", prioridad: "Alta", comentarios: "Alta rotacion de clientes", fecha_contratacion: "2019-11-10", estado: "Activo" },
			{ id: 4, nombre: "Ana Gonzalez", cargo: "Prevencionista de Riesgos", experiencia: 4, salario: 850000, especializacion: "Normativa ISO", fecha_entrevista: "2021-12-10", prioridad: "Media", comentarios: "En proceso de certificacion", fecha_contratacion: "2022-01-05", estado: "Inactivo" },
		]);
		console.log("Creado: 4 contratos ejecutivo");
	}

	const asignacionCount = await asignacionRepo.count();
	if (asignacionCount === 0) {
		await asignacionRepo.save([
			{ id: 1, cliente: "Hospital Regional", ubicacion: "Concepcion", necesidad: "Limpieza general de instalaciones", personal_recomendado: 25, estado: "Activo" },
			{ id: 2, cliente: "Banco Estado", ubicacion: "Chillan", necesidad: "Mantenimiento de oficinas", personal_recomendado: 10, estado: "Pendiente" },
		]);
		console.log("Creado: 2 asignaciones");
	}

	const distribCount = await asignacionPersonalRepo.count();
	if (distribCount === 0) {
		await asignacionPersonalRepo.save([
			// Asignacion 1
			{ asignacion_id: 1, contrato_personal_id: 1, turno: "Mañana", inicio: "2024-01-15", duracion: 30, detalles: "Limpieza de habitaciones y areas comunes" },
			{ asignacion_id: 1, contrato_personal_id: 2, turno: "Tarde", inicio: "2026-06-15", duracion: 30, detalles: "Limpieza de baños y cocinas" },
			// Asignacion 2
			{ asignacion_id: 2, contrato_personal_id: 3, turno: "Mañana", inicio: "2025-03-10", duracion: 15, detalles: "Limpieza de oficinas ejecutivas" },
			{ asignacion_id: 2, contrato_personal_id: 4, turno: "Noche", inicio: "2026-06-15", duracion: 10, detalles: "Limpieza nocturna de sucursal" },
		]);
		console.log("Creado: sample distribuciones (asignaciones_personal)");
	}

	console.log("Creacion de valores iniciales de prueba DB listo");
}
