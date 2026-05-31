import express from "express";
import { login } from "../controllers/login.controller.js";

const router = express.Router();

// Todas las rutas delegan completamente al controlador
router.post("/login", login);

export default router;
