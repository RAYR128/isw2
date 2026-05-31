import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { crearAsignacion, verAsignaciones } from './api';
import Header from "./GeneracionPagina";

function Asignacion() {
	const [formularioAsignacion, cambiarDatosAsignacion] = useState({
		cliente: '',
		ubicacion: '',
		necesidad: '',
		personal: '',
	});
	const [cargando, estadoCarga] = useState(false);
	const [mensaje, mostrarMensaje] = useState('');
	const [asignaciones, actualizarAsignaciones] = useState([]);
	const [cargandoAsignaciones, estadoCargaAsignaciones] = useState(true);
	const [errorAsignaciones, mostrarErrorAsignaciones] = useState('');

	// Asignaciones
	useEffect(() => {
		const fetchAsignaciones = async () => {
			try {
				const data = await verAsignaciones();
				actualizarAsignaciones(data);
			} catch (err) {
				mostrarErrorAsignaciones('Error al cargar asignaciones');
			} finally {
				estadoCargaAsignaciones(false);
			}
		};
		fetchAsignaciones();
	}, []);

	// Cambio de formulario
	const cambioFormulario = (e) => {
		cambiarDatosAsignacion({
			...formularioAsignacion,
			[e.target.name]: e.target.value,
		});
	};

	// Submit de formulario
	const formularioOnSubmit = async (e) => {
		e.preventDefault();
		estadoCarga(true);
		mostrarMensaje('');

		try {
			await crearAsignacion({ cliente: formularioAsignacion.cliente, ubicacion: formularioAsignacion.ubicacion, necesidad: formularioAsignacion.necesidad, personal: formularioAsignacion.personal, });
			mostrarMensaje('Evaluacion guardada exitosamente');
			cambiarDatosAsignacion({ cliente: '', ubicacion: '', necesidad: '', personal: '', });

			// Refrescar los datos..
			const data = await verAsignaciones();
			actualizarAsignaciones(data);
		} catch (err) {
			mostrarMensaje('Error al guardar la evaluacion');
		} finally {
			estadoCarga(false);
		}
	};

	// tema de estado
	const cssParaEstao = (estado) => {
		switch (estado) {
			case 'Activo':
				return 'bg-green-100 text-green-800';
			case 'Pendiente':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className="bg-gray-100">
			<Header />
			<main className="container mx-auto p-6">
				<h2 className="text-2xl font-bold mb-6">Volumen de Personal a Enviar</h2>
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<h3 className="text-lg font-semibold mb-4">Evaluacion y Asignacion</h3>
					<form onSubmit={formularioOnSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
									Tipo de Cliente
								</label>
								<select
									id="cliente"
									name="cliente"
									value={formularioAsignacion.cliente}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Seleccionar...</option>
									<option>Hospital</option>
									<option>Banco</option>
									<option>Universidad</option>
									<option>Empresa Publica</option>
									<option>Institucion</option>
								</select>
							</div>
							<div>
								<label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
									Ubicacion
								</label>
								<input
									type="text"
									id="ubicacion"
									name="ubicacion"
									value={formularioAsignacion.ubicacion}
									onChange={cambioFormulario}
									placeholder="Ej: Hospital Regional"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
						</div>
						<div>
							<label htmlFor="necesidad" className="block text-sm font-medium text-gray-700">
								Necesidad de Limpieza
							</label>
							<textarea
								id="necesidad"
								name="necesidad"
								value={formularioAsignacion.necesidad}
								onChange={cambioFormulario}
								rows="3"
								placeholder="Describa la necesidad especifica..."
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
							<div>
								<label htmlFor="personal" className="block text-sm font-medium text-gray-700">
									Cantidad de Personal Recomendado
								</label>
								<input
									type="number"
									id="personal"
									name="personal"
									value={formularioAsignacion.personal}
									onChange={cambioFormulario}
									min="1"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
						</div>
						<button
							type="submit"
							disabled={cargando}
							className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
						>
							{cargando ? 'Guardando...' : 'Guardar Evaluacion'}
						</button>
						{mensaje && (
							<div className={`mt-2 text-sm ${mensaje.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
								{mensaje}
							</div>
						)}
					</form>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">Asignaciones Recientes</h3>
					{cargandoAsignaciones ? (
						<p>Cargando asignaciones...</p>
					) : errorAsignaciones ? (
						<p className="text-red-600">{errorAsignaciones}</p>
					) : (
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-50">
									<th className="px-4 py-2 text-left">Acciones</th>
									<th className="px-4 py-2 text-left">Cliente</th>
									<th className="px-4 py-2 text-left">Ubicacion</th>
									<th className="px-4 py-2 text-left">Personal</th>
									<th className="px-4 py-2 text-left">Estado</th>
								</tr>
							</thead>
							<tbody>
								{asignaciones.map((asignacion) => (
									<tr key={asignacion.id}>
										<td className="border px-2 py-2">
											<Link
												to={`/asignacion/${asignacion.id}`}
												className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
											>
												Detalles & Personal
											</Link>
										</td>
										<td className="border px-4 py-2">{asignacion.cliente}</td>
										<td className="border px-4 py-2">{asignacion.ubicacion}</td>
										<td className="border px-4 py-2">{asignacion.personal}</td>
										<td className="border px-4 py-2">
											<span className={`px-2 py-1 rounded ${cssParaEstao(asignacion.estado)}`}>
												{asignacion.estado}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</main>
		</div>
	);
}

export default Asignacion;