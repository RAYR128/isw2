import express from "express";
import cors from "cors";
import { connectDB } from "./configuracion/bd.js";
import { HOST, PORT } from "./configuracion/env.js";
import loginRouter from "./routes/login.js";
import contratosPersonalRouter from "./routes/contratospersonal.js";
import contratosEjecutivoRouter from "./routes/contratosejecutivo.js";
import asignacionesRouter from "./routes/asignaciones.js";

const app = express();
app.use(express.json());

// No se si hay una mejor manera de hacer esto por ahora, pero cuando se tenga que hacer deploy de manera real, hay que configurar esto con ENV
// de manera correcta, por ahora es asi para desarrollo, ya que o si no la mayoria de los exploradores (Firefox en mi caso) no permite utilizar el backend
// desde el frontend de prueba
app.use(cors({
	origin:'*',
	methods:['GET','POST','PUT','DELETE','OPTIONS'],
	allowedHeaders:['Content-Type','Authorization']
}))

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