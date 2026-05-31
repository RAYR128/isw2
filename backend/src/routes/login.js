import express from 'express';

const router = express.Router();

// POST /login - creacion de sesion y validacion de usuario/contraseña
router.post('/login', (req, res) => {
	const { usuario, contraseña } = req.body;
	if (usuario === 'admin' && contraseña === 'password') {
		// A hacer: Algun tipo de funcion para validar los tokens en todas las API? Aun no tengo idea de como implementar eso.
		res.json({
			success: true,
			token: 'rellenar-token-futuro',
			user: {
				id: 1,
				nombre: 'Administrador',
				rol: 'admin'
			}
		});
	} else {
		res.status(401).json({
			success: false,
			message: 'Credenciales no validas'
		});
	}
});

export default router;