import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUsuarioRepo } from "../database/database.js";
import { JWT_SECRET } from "../configuracion/env.js";

// POST /login - validacion real contra BD + JWT firmado
export async function login(req, res) {
	const { usuario, contraseña } = req.body;

	if (!usuario || !contraseña) {
		return res.status(400).json({
			success: false,
			mensaje: "Usuario y contraseña son requeridos",
		});
	}

	const repo = getUsuarioRepo();
	const user = await repo.findOne({ where: { username: usuario } });

	if (!user) {
		return res.status(401).json({
			success: false,
			mensaje: "Credenciales no validas",
		});
	}

	const passwordOk = await bcrypt.compare(contraseña, user.password);
	if (!passwordOk) {
		return res.status(401).json({
			success: false,
			mensaje: "Credenciales no validas",
		});
	}

	// crear token real
	const token = jwt.sign(
		{
			id: user.id,
			nombre: user.nombre,
			rol: user.rol,
		},
		JWT_SECRET,
		{ expiresIn: "8h" }
	);

	res.json({
		success: true,
		token,
		user: {
			id: user.id,
			nombre: user.nombre,
			rol: user.rol,
		},
	});
}
