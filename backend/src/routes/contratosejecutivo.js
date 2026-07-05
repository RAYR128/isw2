import express from "express";
import {
	listarEjecutivos,
	obtenerEjecutivo,
	crearEjecutivo,
	modificarEjecutivo,
	eliminarEjecutivo,
} from "../controllers/contratosejecutivo.controller.js";

const router = express.Router();

router.get("/contratos/ejecutivos", listarEjecutivos);
router.post("/contratos/ejecutivos", crearEjecutivo);
router.get("/contratos/ejecutivos/:id", obtenerEjecutivo);
router.post("/contratos/ejecutivos/:id", modificarEjecutivo);
router.delete("/contratos/ejecutivos/:id", eliminarEjecutivo);

export default router;