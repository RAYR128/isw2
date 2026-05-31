import { EntitySchema } from "typeorm";

export const Asignacion = new EntitySchema({
	name: "Asignacion",
	tableName: "asignaciones",
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: "increment",
		},
		cliente: {
			type: "varchar",
			length: 255,
			nullable: false,
		},
		ubicacion: {
			type: "varchar",
			length: 255,
			nullable: false,
		},
		necesidad: {
			type: "text",
			nullable: true,
		},
		personal_recomendado: {
			type: "int",
			nullable: false,
			default: 1,
		},
		estado: {
			type: "varchar",
			length: 50,
			nullable: false,
			default: "Pendiente",
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
