import express from "express";
import { connectDB } from "./configuracion/bd.js";
import { HOST, PORT } from "./configuracion/env.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	res.send("funciona!");
});

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