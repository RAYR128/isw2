import "reflect-metadata";
import express from "express";
import cors from "cors";
import { CORS_ORIGIN, HOST, NODE_ENV, PORT, SEED_DB } from "./configuracion/env.js";
import loginRouter from "./routes/login.js";
import contratosPersonalRouter from "./routes/contratospersonal.js";
import contratosEjecutivoRouter from "./routes/contratosejecutivo.js";
import asignacionesRouter from "./routes/asignaciones.js";
import { connectDB, inicializarValoresPruebaDB } from "./database/database.js";

const app = express();
app.use(express.json());

const corsOptions = {
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

if (NODE_ENV !== "production") {
	app.use(cors({ ...corsOptions, origin: "*" }));
} else if (CORS_ORIGIN) {
	app.use(cors({ ...corsOptions, origin: CORS_ORIGIN }));
}

// rutas API
app.use('/api', loginRouter);
app.use('/api', contratosPersonalRouter);
app.use('/api', contratosEjecutivoRouter);
app.use('/api', asignacionesRouter);

// Inicializa la conexión a la base de datos + seed de datos de prueba
connectDB()
	.then(async () => {
		if (SEED_DB) {
			try {
				await inicializarValoresPruebaDB();
			} catch (seedErr) {
				console.error("Advertencia: Error durante el seeding (continua sin datos iniciales):", seedErr.message);
			}
		}

		app.listen(PORT, () => {
			console.log(`Servidor iniciado en http://${HOST}:${PORT}`);
		});
	})
	.catch((error) => {
		console.log("Error al conectar con la base de datos:", error);
		process.exit(1);
	});