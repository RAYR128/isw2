import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { verContratosPersonalIds, verContratoPersonal, crearContratoPersonal } from './api';
import Header from "./GeneracionPagina";

function ContratosPersonal() {
	const [contratos, verContratosP] = useState([]);
	const [cargando, estadoCarga] = useState(true);
	const [error, mostrarError] = useState('');

	// Formulario para crear contratos de personal
	const [formularioPersonal, cambiarDatosPersonal] = useState({
		nombre: '',
		inicio: '',
		duracion: '',
		salario: '',
		ipc: '',
	});

	useEffect(() => {
		verLosContratos();
	}, []);

	const verLosContratos = async () => {
		try {
			estadoCarga(true);
			const ids = await verContratosPersonalIds();
			const contratosData = await Promise.all(
				ids.map(contrato => verContratoPersonal(contrato.id))
			);
			verContratosP(contratosData);
		} catch (err) {
			mostrarError('Error al cargar los contratos');
		} finally {
			estadoCarga(false);
		}
	};

	// Cambio de formulario
	const cambioFormulario = (e) => {
		cambiarDatosPersonal({
			...formularioPersonal,
			[e.target.name]: e.target.value,
		});
	};

	// Submit de formulario
	const formularioOnSubmit = async (e) => {
		e.preventDefault();
		try {
			await crearContratoPersonal({
				nombre: formularioPersonal.nombre,
				inicio: formularioPersonal.inicio,
				duracion: formularioPersonal.duracion,
				salario: formularioPersonal.salario,
				ipc: formularioPersonal.ipc,
			});
			cambiarDatosPersonal({
				nombre: '',
				inicio: '',
				duracion: '',
				salario: '',
				ipc: '',
			});
			verLosContratos();
		} catch (err) {
			mostrarError('Error al crear el contrato');
		}
	};

	const getEstadoClass = (estado) => {
		switch (estado) {
			case 'Activo':
				return 'bg-green-100 text-green-800';
			case 'Proximo a vencer':
				return 'bg-yellow-100 text-yellow-800';
			case 'Pendiente':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	if (cargando) { return (<div className="bg-gray-100 min-h-screen flex items-center justify-center"><div>Cargando...</div></div>); }

	return (
		<div className="bg-gray-100">
			<Header />
			<main className="container mx-auto p-6">
				<h2 className="text-2xl font-bold mb-6">Contratos de Trabajos de los Trabajadores</h2>
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<h3 className="text-lg font-semibold mb-4">Nuevo Contrato</h3>
					<form onSubmit={formularioOnSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
							<div>
								<label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
									Nombre del Trabajador
								</label>
								<input
									type="text"
									id="nombre"
									name="nombre"
									value={formularioPersonal.nombre}
									onChange={cambioFormulario}
									placeholder="Nombre completo"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="inicio" className="block text-sm font-medium text-gray-700">
									Fecha de Inicio
								</label>
								<input
									type="date"
									id="inicio"
									name="inicio"
									value={formularioPersonal.inicio}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label htmlFor="duracion" className="block text-sm font-medium text-gray-700">
									Duracion (años)
								</label>
								<select
									id="duracion"
									name="duracion"
									value={formularioPersonal.duracion}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Seleccionar...</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="salario" className="block text-sm font-medium text-gray-700">
									Salario Base (CLP)
								</label>
								<input
									type="number"
									id="salario"
									name="salario"
									value={formularioPersonal.salario}
									onChange={cambioFormulario}
									placeholder="Ej: 350000"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label htmlFor="ipc" className="block text-sm font-medium text-gray-700">
									Ajuste IPC (%)
								</label>
								<input
									type="number"
									id="ipc"
									name="ipc"
									value={formularioPersonal.ipc}
									onChange={cambioFormulario}
									step="0.1"
									placeholder="Ej: 3.5"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
						</div>
						<button
							type="submit"
							className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Crear Contrato
						</button>
						{error && (
							<div className="text-red-600 text-sm mt-2">{error}</div>
						)}
					</form>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">Contratos Activos</h3>
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-gray-50">
								<th className="px-4 py-2 text-left">Trabajador</th>
								<th className="px-4 py-2 text-left">Inicio</th>
								<th className="px-4 py-2 text-left">Duracion</th>
								<th className="px-4 py-2 text-left">Salario & IPC</th>
								<th className="px-4 py-2 text-left">Estado</th>
							</tr>
						</thead>
						<tbody>
							{contratos.map((contrato) => (
								<tr key={contrato.id || contrato.nombre}>
									<td className="border px-4 py-2">{contrato.nombre}</td>
									<td className="border px-4 py-2">{contrato.inicio}</td>
									<td className="border px-4 py-2">{contrato.duracion}</td>
									<td className="border px-4 py-2">{contrato.salario} / {contrato.ipc}%</td>
									<td className="border px-4 py-2">
										<span className={`px-2 py-1 rounded ${getEstadoClass(contrato.estado)}`}>
											{contrato.estado}
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

export default ContratosPersonal;