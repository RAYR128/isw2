import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { verAsignacionDetalles, verAsignacionDistribucion, agregarPersonalAsignacion, removerPersonalAsignacion, verPersonalDetallesAsignacion, verContratoPersonal, verContratosPersonalIds } from './api';
import { Layout } from "./GeneracionPagina";

function DistribucionAsignacion() {
	const { id } = useParams();
	const [asignacion, setAsignacion] = useState(null);
	const [distribucion, setDistribucion] = useState([]);
	const [cargando, estadoCarga] = useState(true);
	const [error, mostrarError] = useState('');
	const [workerNames, setWorkerNames] = useState({});
	const [workers, setWorkers] = useState([]);
	const [detallesModal, setDetallesModal] = useState(null);
	const [cargandoDetalles, setCargandoDetalles] = useState(false);
	const [errorDetalles, setErrorDetalles] = useState('');

	// Formulario para añadir personal
	const [formularioDistribucion, cambiarDatosDistribucion] = useState({
		trabajador: '',
		turno: '',
		fecha_inicio: '',
		duracion: '',
		detalles: '',
	});

	const fetchData = async () => {
		try {
			estadoCarga(true);
			const [detalles, distrib] = await Promise.all([
				verAsignacionDetalles(id),
				verAsignacionDistribucion(id),
			]);
			setAsignacion(detalles);
			setDistribucion(distrib);

			// Fetch worker names
			const names = {};
			for (const item of distrib) {
				if (!names[item.id_trabajador]) {
					try {
						const contrato = await verContratoPersonal(item.id_trabajador);
						names[item.id_trabajador] = contrato.nombre;
					} catch (_) {
						names[item.id_trabajador] = `Trabajador ${item.id_trabajador}`;
					}
				}
			}
			setWorkerNames(names);
		} catch (_) {
			mostrarError('Error al cargar los datos');
		} finally {
			estadoCarga(false);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		const fetchWorkers = async () => {
			try {
				const workersData = await verContratosPersonalIds();
				setWorkers(workersData);
			} catch (_) {
				console.error('Error fetching workers:');
			}
		};
		fetchWorkers();
	}, []);

	// Cambio de formulario
	const cambioFormulario = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === 'checkbox') {
			const currentArray = formularioDistribucion[name] || [];
			if (checked) {
				cambiarDatosDistribucion({
					...formularioDistribucion,
					[name]: [...currentArray, value],
				});
			} else {
				cambiarDatosDistribucion({
					...formularioDistribucion,
					[name]: currentArray.filter(item => item !== value),
				});
			}
		} else {
			cambiarDatosDistribucion({
				...formularioDistribucion,
				[name]: value,
			});
		}
	};

	// Submit de formulario
	const formularioOnSubmit = async (e) => {
		e.preventDefault();
		try {
			await agregarPersonalAsignacion(id, {
				trabajador: formularioDistribucion.trabajador,
				turno: formularioDistribucion.turno,
				fecha_inicio: formularioDistribucion.fecha_inicio,
				duracion: formularioDistribucion.duracion,
				detalles: formularioDistribucion.detalles,
			});
			cambiarDatosDistribucion({
				trabajador: '',
				turno: '',
				fecha_inicio: '',
				duracion: '',
				detalles: '',
			});
			fetchData();
		} catch (_) {
			mostrarError('Error al asignar personal');
		}
	};

	const handleVerDetalles = async (idTrabajador) => {
		try {
			setCargandoDetalles(true);
			setErrorDetalles('');
			const detalles = await verPersonalDetallesAsignacion(id, idTrabajador);
			setDetallesModal({
				idTrabajador,
				nombre: workerNames[idTrabajador] || `Trabajador ${idTrabajador}`,
				...detalles,
			});
		} catch (_) {
			setErrorDetalles('Error al cargar los detalles del trabajador');
		} finally {
			setCargandoDetalles(false);
		}
	};

	const cerrarDetallesModal = () => {
		setDetallesModal(null);
		setErrorDetalles('');
	};

	const handleRemover = async (idTrabajador) => {
		if (window.confirm('¿Esta seguro de que desea remover este personal?')) {
			try {
				await removerPersonalAsignacion(id, { id_trabajador: idTrabajador });
				fetchData();
			} catch (_) {
				mostrarError('Error al remover personal');
			}
		}
	};

	const getEstadoClass = (estado) => {
		switch (estado) {
			case 'Activo':
				return 'bg-green-100 text-green-800';
			case 'Nuevo':
				return 'bg-blue-100 text-blue-800';
			case 'Pendiente':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	if (cargando) {
		return (
			<Layout>
				<div className="flex items-center justify-center py-12">Cargando...</div>
			</Layout>
		);
	}
	if (error) {
		return (
			<Layout>
				<div className="flex items-center justify-center py-12 text-red-600">{error}</div>
			</Layout>
		);
	}

	return (
		<Layout>
				<h2 className="text-2xl font-bold mb-6">
					Distribucion de Personal segun Requerimientos para "{asignacion?.cliente || 'Cliente'}"
				</h2>
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<h3 className="text-lg font-semibold mb-4">Descripcion y detalles</h3>
					<p className="text-gray-700 mb-4">{asignacion?.necesidad || 'Sin descripcion disponible.'}</p>
					<h3 className="text-lg font-semibold mb-4">Nueva Asignacion y Equipamiento a utilizar</h3>
					<form onSubmit={formularioOnSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="trabajador" className="block text-sm font-medium text-gray-700">
									Trabajador
								</label>
								<select
									id="trabajador"
									name="trabajador"
									value={formularioDistribucion.trabajador}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Seleccionar...</option>
									{workers.map((worker) => (
										<option key={worker.id} value={worker.id}>
											{worker.nombre}
										</option>
									))}
								</select>
							</div>
						</div>
						<div>
							<label htmlFor="detalles" className="block text-sm font-medium text-gray-700">
								Detalles, Tareas, Notas Especiales
							</label>
							<textarea
								id="detalles"
								name="detalles"
								value={formularioDistribucion.detalles}
								onChange={cambioFormulario}
								rows="5"
								placeholder="Tareas a realizar, Detalles especiales (Alergias, herramientas, etc)"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label htmlFor="turno" className="block text-sm font-medium text-gray-700">
									Turno
								</label>
								<select
									id="turno"
									name="turno"
									value={formularioDistribucion.turno}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Seleccionar...</option>
									<option>Mañana (08:00-16:00)</option>
									<option>Tarde (16:00-24:00)</option>
									<option>Noche (24:00-08:00)</option>
								</select>
							</div>
							<div>
								<label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700">
									Fecha de Inicio
								</label>
								<input
									type="date"
									id="fecha_inicio"
									name="fecha_inicio"
									value={formularioDistribucion.fecha_inicio}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label htmlFor="duracion" className="block text-sm font-medium text-gray-700">
									Duracion (dias)
								</label>
								<input
									type="number"
									id="duracion"
									name="duracion"
									value={formularioDistribucion.duracion}
									onChange={cambioFormulario}
									min="1"
									placeholder="30"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
						</div>
						<button
							type="submit"
							className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Asignar Personal
						</button>
					</form>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">Distribuciones Actuales</h3>
					{errorDetalles && (
						<p className="text-red-600 text-sm mb-4">{errorDetalles}</p>
					)}
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-gray-50">
								<th className="px-4 py-2 text-left">Acciones</th>
								<th className="px-4 py-2 text-left">Trabajador</th>
								<th className="px-4 py-2 text-left">Turno</th>
								<th className="px-4 py-2 text-left">Inicio</th>
								<th className="px-4 py-2 text-left">Estado</th>
							</tr>
						</thead>
						<tbody>
							{distribucion.map((item) => (
								<tr key={item.id_trabajador}>
									<td className="border px-4 py-2">
										<button
											onClick={() => handleRemover(item.id_trabajador)}
											className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mr-2"
										>
											Remover
										</button>
										<button
											onClick={() => handleVerDetalles(item.id_trabajador)}
											disabled={cargandoDetalles}
											className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
										>
											Ver mas detalles
										</button>
									</td>
									<td className="border px-4 py-2">
										{workerNames[item.id_trabajador] || `Trabajador ${item.id_trabajador}`}
									</td>
									<td className="border px-4 py-2">{item.turno}</td>
									<td className="border px-4 py-2">{item.inicio}</td>
									<td className="border px-4 py-2">
										<span className={`px-2 py-1 rounded ${getEstadoClass(item.estado)}`}>
											{item.estado}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{detallesModal && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
						onClick={cerrarDetallesModal}
					>
						<div
							className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-start justify-between mb-4">
								<h3 className="text-lg font-semibold">
									Detalles de {detallesModal.nombre}
								</h3>
								<button
									onClick={cerrarDetallesModal}
									className="text-gray-400 hover:text-gray-600 text-xl leading-none"
									aria-label="Cerrar"
								>
									&times;
								</button>
							</div>
							<div className="space-y-3 text-sm">
								<div className="grid grid-cols-2 gap-2">
									<span className="font-medium text-gray-600">Turno:</span>
									<span>{detallesModal.turno}</span>
									<span className="font-medium text-gray-600">Fecha de inicio:</span>
									<span>{detallesModal.inicio}</span>
									<span className="font-medium text-gray-600">Duracion:</span>
									<span>{detallesModal.duracion} dias</span>
									<span className="font-medium text-gray-600">Estado:</span>
									<span>
										<span className={`px-2 py-1 rounded ${getEstadoClass(detallesModal.estado)}`}>
											{detallesModal.estado}
										</span>
									</span>
								</div>
								<div>
									<p className="font-medium text-gray-600 mb-1">Tareas, detalles y notas especiales:</p>
									<p className="text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-md p-3 border border-gray-200 min-h-[4rem]">
										{detallesModal.detalles || 'Sin detalles registrados.'}
									</p>
								</div>
							</div>
							<div className="mt-6 flex justify-end">
								<button
									onClick={cerrarDetallesModal}
									className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
								>
									Cerrar
								</button>
							</div>
						</div>
					</div>
				)}
		</Layout>
	);
}

export default DistribucionAsignacion;