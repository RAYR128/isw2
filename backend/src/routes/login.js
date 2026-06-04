import express from "express";
import rateLimit from "express-rate-limit";
import { login } from "../controllers/login.controller.js";
import {
	LOGIN_RATE_LIMIT_VENTANA_MS,
	LOGIN_RATE_LIMIT_MAXIMO,
} from "../configuracion/env.js";

const router = express.Router();

// Rate limiter especifico para login: previene ataques de fuerza bruta
const loginRateLimiter = rateLimit({
	windowMs: LOGIN_RATE_LIMIT_VENTANA_MS,
	max: LOGIN_RATE_LIMIT_MAXIMO,
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: true,
	message: {
		success: false,
		mensaje: "Demasiados intentos de inicio de sesion. Por favor, intentelo de nuevo mas tarde.",
	},
	handler: (req, res) => {
		res.status(429).json({
			success: false,
			mensaje: "Demasiados intentos de inicio de sesion. Por favor, intentelo de nuevo mas tarde.",
		});
	},
});

// Todas las rutas delegan completamente al controlador
router.post("/login", loginRateLimiter, login);

export default router;
