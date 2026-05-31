import express from "express";
import {
	listarEjecutivos,
	crearEjecutivo,
} from "../controllers/contratosejecutivo.controller.js";

const router = express.Router();

// Todas las rutas delegan completamente al controlador
router.get("/contratos/ejecutivo", listarEjecutivos);
router.post("/contratos/ejecutivo", crearEjecutivo);

export default router;
