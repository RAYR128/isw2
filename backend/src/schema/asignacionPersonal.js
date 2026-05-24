import { EntitySchema } from "typeorm";

export const AsignacionPersonal = new EntitySchema({
	name: "AsignacionPersonal",
	tableName: "asignaciones_personal",
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: "increment",
		},
		asignacion_id: {
			type: "int",
			nullable: false,
		},
		contrato_personal_id: {
			type: "int",
			nullable: false,
		},
		turno: {
			type: "varchar",
			length: 50,
			nullable: false,
		},
		inicio: {
			type: "date",
			nullable: false,
		},
		duracion: {
			type: "int",
			nullable: false,
			default: 1,
		},
		detalles: {
			type: "text",
			nullable: true,
		},
		created_at: {
			type: "timestamp",
			createDate: true,
			default: () => "CURRENT_TIMESTAMP",
		},
	},
});
