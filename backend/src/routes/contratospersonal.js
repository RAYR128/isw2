import express from "express";
import {
	listarContratos,
	obtenerContrato,
	crearContrato,
	modificarContrato,
	eliminarContrato,
} from "../controllers/contratospersonal.controller.js";

const router = express.Router();

// Todas las rutas delegan completamente al controlador
router.get("/contratos/personal", listarContratos);
router.get("/contratos/personal/:id", obtenerContrato);
router.post("/contratos/personal", crearContrato);
router.post("/contratos/personal/:id", modificarContrato);
router.delete("/contratos/personal/:id", eliminarContrato);

export default router;
