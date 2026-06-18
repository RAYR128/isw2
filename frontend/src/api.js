// Ruta hacia el backend
const API_BASE = 'http://localhost:3000/api';

// Funcion basica de request para todo lo que es la API interna
async function requestAPIinterna(endpoint, options = {}) {
	const url = `${API_BASE}${endpoint}`;
	const config = {
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
		...options,
	};

	// Añadir token de auth si existe (hay que validar esto en el backend)
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	try {
		const respuesta = await fetch(url, config);
		const datos = await respuesta.json();
		if (!respuesta.ok) {
			const error = new Error(datos.mensaje || 'Fallo de API')
			error.mensaje = datos.mensaje || 'Fallo de API'
			throw error
		}
		return datos;
	} catch (error) {
		console.error('Error de la API:', error);
		throw error;
	}
}

// Autenticacion
export const login = (usuario, contraseña) => requestAPIinterna('/login', { method: 'POST', body: JSON.stringify({ usuario, contraseña }), });

// Asignaciones
export const verAsignaciones = () => requestAPIinterna('/asignacion');
export const crearAsignacion = (data) => requestAPIinterna('/crearAsignacion', { method: 'POST', body: JSON.stringify(data), });
export const verAsignacionDetalles = (id) => requestAPIinterna(`/asignacion/${id}/detalles`);
export const verAsignacionDistribucion = (id) => requestAPIinterna(`/asignacion/${id}/distribucion`);
export const agregarPersonalAsignacion = (id, data) => requestAPIinterna(`/asignacion/${id}/personal/agregar`, { method: 'POST', body: JSON.stringify(data), });
export const removerPersonalAsignacion = (id, data) => requestAPIinterna(`/asignacion/${id}/personal/remover`, { method: 'POST', body: JSON.stringify(data), });
export const verPersonalDetallesAsignacion = (id, idTrabajador) => requestAPIinterna(`/asignacion/${id}/personal/detalles?id_trabajador=${idTrabajador}`);

// Contratos de personal
export const verContratosPersonalIds = () => requestAPIinterna('/contratos/personal');
export const verContratoPersonal = (id) => requestAPIinterna(`/contratos/personal/${id}`);
export const crearContratoPersonal = (data) => requestAPIinterna('/contratos/personal', { method: 'POST', body: JSON.stringify(data), });

// Executive Contracts
export const verContratosEjecutivo = () => requestAPIinterna('/contratos/ejecutivo');
export const crearContratoEjecutivo = (data) => requestAPIinterna('/contratos/ejecutivo', { method: 'POST', body: JSON.stringify(data), });