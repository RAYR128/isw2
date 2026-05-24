import express from "express";
import {
	listarResumen,
	crearAsignacion,
	obtenerDetalles,
	obtenerDistribucion,
	removerPersonal,
	obtenerPersonalDetalles,
	agregarPersonal,
} from "../controllers/asignaciones.controller.js";

const router = express.Router();

// Todas las rutas delegan completamente al controlador
router.get("/asignacion", listarResumen);
router.post("/crearAsignacion", crearAsignacion);
router.get("/asignacion/:id/detalles", obtenerDetalles);
router.get("/asignacion/:id/distribucion", obtenerDistribucion);
router.post("/asignacion/:id/personal/remover", removerPersonal);
router.get("/asignacion/:id/personal/detalles", obtenerPersonalDetalles);
router.post("/asignacion/:id/personal/agregar", agregarPersonal);

export default router;
