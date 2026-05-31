import { EntitySchema } from "typeorm";

export const ContratoEjecutivo = new EntitySchema({
	name: "ContratoEjecutivo",
	tableName: "contratos_ejecutivo",
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: "increment",
		},
		nombre: {
			type: "varchar",
			length: 255,
			nullable: false,
		},
		cargo: {
			type: "varchar",
			length: 255,
			nullable: false,
		},
		experiencia: {
			type: "int",
			nullable: true,
			default: 0,
		},
		salario: {
			type: "int",
			nullable: true,
			default: 0,
		},
		especializacion: {
			type: "text",
			nullable: true,
		},
		fecha_entrevista: {
			type: "date",
			nullable: true,
		},
		prioridad: {
			type: "varchar",
			length: 50,
			nullable: true,
		},
		comentarios: {
			type: "text",
			nullable: true,
		},
		fecha_contratacion: {
			type: "date",
			nullable: false,
		},
		estado: {
			type: "varchar",
			length: 50,
			nullable: false,
			default: "En Proceso",
		},
		created_at: {
			type: "timestamp",
			createDate: true,
			default: () => "CURRENT_TIMESTAMP",
		},
		updated_at: {
			type: "timestamp",
			updateDate: true,
			default: () => "CURRENT_TIMESTAMP",
		},
	},
});
