import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';

function Login() {
	const [formInicioSesion, cambiarDatosInicioSesion] = useState({
		usuario: '',
		contraseña: '',
	});
	const [error, mostrarError] = useState('');
	const [cargando, estadoCarga] = useState(false);
	const navigate = useNavigate();

	// Cambio de formulario
	const cambioFormulario = (e) => {
		cambiarDatosInicioSesion({
			...formInicioSesion,
			[e.target.name]: e.target.value,
		});
	};

	// Submit de formulario
	const formularioOnSubmit = async (e) => {
		e.preventDefault();
		estadoCarga(true);
		mostrarError('');

		try {
			const response = await login(formInicioSesion.usuario, formInicioSesion.contraseña);
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			navigate('/dashboard');
		} catch (err) {
			mostrarError(err.mensaje || 'Error al iniciar sesion');
		} finally {
			estadoCarga(false);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar Sesion</h1>
				<form onSubmit={formularioOnSubmit} className="space-y-4">
					<div>
						<label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
							Usuario
						</label>
						<input
							type="text"
							id="usuario"
							name="usuario"
							value={formInicioSesion.usuario}
							onChange={cambioFormulario}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>
					<div>
						<label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
							Contraseña
						</label>
						<input
							type="password"
							id="contraseña"
							name="contraseña"
							value={formInicioSesion.contraseña}
							onChange={cambioFormulario}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>
					{error && (
						<div className="text-red-600 text-sm">{error}</div>
					)}
					<button
						type="submit"
						disabled={cargando}
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
					>
						{cargando ? 'Ingresando...' : 'Ingresar'}
					</button>
				</form>
				<p className="mt-4 text-center text-sm text-gray-600">
					Sistema de Gestion - Empresa de Aseos
				</p>
			</div>
		</div>
	);
}

export default Login;