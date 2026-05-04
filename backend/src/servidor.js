import express from "express";
import { connectDB } from "./configuracion/bd.js";
import { HOST, PORT } from "./configuracion/env.js";
import loginRouter from "./routes/login.js";
import contratosPersonalRouter from "./routes/contratospersonal.js";
import contratosEjecutivoRouter from "./routes/contratosejecutivo.js";
import asignacionesRouter from "./routes/asignaciones.js";

const app = express();
app.use(express.json());

// rutas API
app.use('/api', loginRouter);
app.use('/api', contratosPersonalRouter);
app.use('/api', contratosEjecutivoRouter);
app.use('/api', asignacionesRouter);

// Inicializa la conexión a la base de datos
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Servidor iniciado en http://${HOST}:${PORT}`);
		});
	})
	.catch((error) => {
		console.log("Error al conectar con la base de datos:", error);
		process.exit(1);
	});