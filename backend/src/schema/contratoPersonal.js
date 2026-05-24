import { EntitySchema } from "typeorm";

export const ContratoPersonal = new EntitySchema({
	name: "ContratoPersonal",
	tableName: "contratos_personal",
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
		inicio: {
			type: "date",
			nullable: false,
		},
		duracion_anos: {
			type: "int",
			nullable: false,
			default: 1,
		},
		salario: {
			type: "int",
			nullable: false,
			default: 0,
		},
		ipc: {
			type: "numeric",
			precision: 5,
			scale: 2,
			nullable: false,
			default: 0,
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
