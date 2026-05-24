import express from 'express';
import { JWT_SECRET } from '../configuracion/env.js';

const router = express.Router();

// POST /login - creacion de sesion y validacion de usuario/contraseña
router.post('/login', (req, res) => {
	const { usuario, contraseña } = req.body;
	if (usuario === 'admin' && contraseña === 'password') {
		// A hacer: Algun tipo de funcion para validar los tokens en todas las API? Aun no tengo idea de como implementar eso.
		res.json({
			success: true,
			token: JWT_SECRET,
			user: {
				id: 1,
				nombre: 'Administrador',
				rol: 'admin'
			}
		});
	} else {
		res.status(401).json({
			success: false,
			mensaje: 'Credenciales no validas'
		});
	}
});

export default router;