import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verAsignacionDetalles, verAsignacionDistribucion, agregarPersonalAsignacion, removerPersonalAsignacion, verContratoPersonal, verContratosPersonalIds } from './api';
import Header from "./GeneracionPagina";

function DistribucionAsignacion() {
	const { id } = useParams();
	const [asignacion, setAsignacion] = useState(null);
	const [distribucion, setDistribucion] = useState([]);
	const [cargando, estadoCarga] = useState(true);
	const [error, mostrarError] = useState('');
	const [workerNames, setWorkerNames] = useState({});
	const [workers, setWorkers] = useState([]);

	// Formulario para añadir personal
	const [formularioDistribucion, cambiarDatosDistribucion] = useState({
		trabajador: '',
		turno: '',
		fecha_inicio: '',
		duracion: '',
		motivo: '',
		vestuario: [],
		seguridad: [],
		herramientas: [],
		detalles: '',
	});

	useEffect(() => {
		fetchData();
	}, [id]);

	useEffect(() => {
		const fetchWorkers = async () => {
			try {
				const workersData = await verContratosPersonalIds();
				setWorkers(workersData);
			} catch (err) {
				console.error('Error fetching workers:', err);
			}
		};
		fetchWorkers();
	}, []);

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
					} catch (err) {
						names[item.id_trabajador] = `Trabajador ${item.id_trabajador}`;
					}
				}
			}
			setWorkerNames(names);
		} catch (err) {
			mostrarError('Error al cargar los datos');
		} finally {
			estadoCarga(false);
		}
	};

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
				motivo: formularioDistribucion.motivo,
				vestuario: formularioDistribucion.vestuario,
				seguridad: formularioDistribucion.seguridad,
				herramientas: formularioDistribucion.herramientas,
				detalles: formularioDistribucion.detalles,
			});
			cambiarDatosDistribucion({
				trabajador: '',
				turno: '',
				fecha_inicio: '',
				duracion: '',
				motivo: '',
				vestuario: [],
				seguridad: [],
				herramientas: [],
				detalles: '',
			});
			fetchData();
		} catch (err) {
			mostrarError('Error al asignar personal');
		}
	};

	const handleRemover = async (idTrabajador) => {
		if (window.confirm('¿Esta seguro de que desea remover este personal?')) {
			try {
				await removerPersonalAsignacion(id, { id_trabajador: idTrabajador });
				fetchData();
			} catch (err) {
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
			case 'Cambio Pendiente':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	if (cargando) { return (<div className="bg-gray-100 min-h-screen flex items-center justify-center"><div>Cargando...</div></div>); }
	if (error) { return (<div className="bg-gray-100 min-h-screen flex items-center justify-center"><div className="text-red-600">{error}</div></div>); }

	return (
		<div className="bg-gray-100">
			<Header />
			<main className="container mx-auto p-6">
				<h2 className="text-2xl font-bold mb-6">
					Distribucion de Personal segun Requerimientos para "{asignacion?.cliente || 'Cliente'}"
				</h2>
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
							<label className="block text-sm font-medium text-gray-700 mb-2">Vestuario Basico</label>
							<div className="space-y-2">
								{['uniforme', 'zapatos', 'guantes'].map((item) => (
									<label key={item} className="inline-flex items-center">
										<input
											type="checkbox"
											name="vestuario"
											value={item}
											checked={formularioDistribucion.vestuario.includes(item)}
											onChange={cambioFormulario}
											className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
										/>
										<span className="ml-2">
											{item === 'uniforme' ? 'Uniforme completo' :
											 item === 'zapatos' ? 'Zapatos de seguridad' : 'Guantes'}
										</span>
									</label>
								))}
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Equipo de Seguridad</label>
							<div className="space-y-2">
								{['mascarilla', 'gafas', 'arnes'].map((item) => (
									<label key={item} className="inline-flex items-center">
										<input
											type="checkbox"
											name="seguridad"
											value={item}
											checked={formularioDistribucion.seguridad.includes(item)}
											onChange={cambioFormulario}
											className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
										/>
										<span className="ml-2">
											{item === 'mascarilla' ? 'Mascarilla N95' :
											 item === 'gafas' ? 'Gafas de proteccion' : 'Arnes de seguridad'}
										</span>
									</label>
								))}
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Herramientas Especializadas</label>
							<div className="space-y-2">
								{['aspiradora', 'productos', 'limpiavidrios'].map((item) => (
									<label key={item} className="inline-flex items-center">
										<input
											type="checkbox"
											name="herramientas"
											value={item}
											checked={formularioDistribucion.herramientas.includes(item)}
											onChange={cambioFormulario}
											className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
										/>
										<span className="ml-2">
											{item === 'aspiradora' ? 'Aspiradora industrial' :
											 item === 'productos' ? 'Productos quimicos especializados' : 'Equipo limpiavidrios'}
										</span>
									</label>
								))}
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
								rows="2"
								placeholder="Tareas a realizar, Detalles especiales (Alergias, tallas especiales, etc)"
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
						<div>
							<label htmlFor="motivo" className="block text-sm font-medium text-gray-700">
								Motivo de la Asignacion
							</label>
							<select
								id="motivo"
								name="motivo"
								value={formularioDistribucion.motivo}
								onChange={cambioFormulario}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								required
							>
								<option value="">Seleccionar...</option>
								<option>Nueva contratacion</option>
								<option>Redistribucion por expansion</option>
								<option>Cambio de turno</option>
								<option>Reemplazo temporal</option>
								<option>Proyecto especial</option>
							</select>
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
										<button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
			</main>
		</div>
	);
}

export default DistribucionAsignacion;