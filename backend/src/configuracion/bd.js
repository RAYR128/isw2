"use strict";
import { createConnection } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD, DB_PORT } from "./env.js";

export let connection;

export async function connectDB() {
	try {
		connection = await createConnection({
			type: "postgres",
			host: `${HOST}`,
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
