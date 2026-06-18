import { useState, useEffect } from 'react';
import { verContratosEjecutivo, crearContratoEjecutivo } from './api';
import { Layout } from "./GeneracionPagina";

function ContratosEjecutivo() {
	const [contratos, verContratosP] = useState([]);
	const [cargando, estadoCarga] = useState(true);
	const [error, mostrarError] = useState('');

	// Formulario para añadir contrato ejecutivo
	const [formularioEjecutivo, cambiarDatosEjecutivo] = useState({
		nombre: '',
		cargo: '',
		experiencia: '',
		salario: '',
		especializacion: '',
		fecha_entrevista: '',
		prioridad: '',
		comentarios: '',
	});

	const verLosContratos = async () => {
		try {
			estadoCarga(true);
			const data = await verContratosEjecutivo();
			verContratosP(data);
		} catch (_) {
			mostrarError('Error al cargar los contratos');
		} finally {
			estadoCarga(false);
		}
	};

	useEffect(() => {
		verLosContratos();
	}, []);

	// Cambio de formulario
	const cambioFormulario = (e) => {
		cambiarDatosEjecutivo({
			...formularioEjecutivo,
			[e.target.name]: e.target.value,
		});
	};

	// Submit de formulario
	const formularioOnSubmit = async (e) => {
		e.preventDefault();
		try {
			await crearContratoEjecutivo({
				nombre: formularioEjecutivo.nombre,
				cargo: formularioEjecutivo.cargo,
				experiencia: formularioEjecutivo.experiencia,
				salario: formularioEjecutivo.salario,
				especializacion: formularioEjecutivo.especializacion,
				fecha_entrevista: formularioEjecutivo.fecha_entrevista,
				prioridad: formularioEjecutivo.prioridad,
				comentarios: formularioEjecutivo.comentarios,
			});
			// Reset form and refresh data
			cambiarDatosEjecutivo({
				nombre: '',
				cargo: '',
				experiencia: '',
				salario: '',
				especializacion: '',
				fecha_entrevista: '',
				prioridad: '',
				comentarios: '',
			});
			verLosContratos();
		} catch (_) {
			mostrarError('Error al iniciar el proceso de contratacion');
		}
	};

	// tema de estado
	const cssParaEstao = (estado) => {
		switch (estado) {
			case 'Activo':
				return 'bg-green-100 text-green-800';
			case 'Inactivo':
				return 'bg-red-100 text-red-800';
			case 'En Proceso':
				return 'bg-blue-100 text-blue-800';
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

	return (
		<Layout>
				<h2 className="text-2xl font-bold mb-6">Contratacion de Personal Ejecutivo</h2>
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<h3 className="text-lg font-semibold mb-4">Nueva Contratacion</h3>
					<form onSubmit={formularioOnSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
									Nombre Completo
								</label>
								<input
									type="text"
									id="nombre"
									name="nombre"
									value={formularioEjecutivo.nombre}
									onChange={cambioFormulario}
									placeholder="Nombre del candidato"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
									Cargo
								</label>
								<select
									id="cargo"
									name="cargo"
									value={formularioEjecutivo.cargo}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Seleccionar...</option>
									<option>Contador</option>
									<option>Prevencionista de Riesgos</option>
									<option>Personal Quimico</option>
									<option>Encargado de Ventas</option>
									<option>Gerente de Operaciones</option>
									<option>Especialista en Logistica</option>
								</select>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="experiencia" className="block text-sm font-medium text-gray-700">
									Años de Experiencia
								</label>
								<input
									type="number"
									id="experiencia"
									name="experiencia"
									value={formularioEjecutivo.experiencia}
									onChange={cambioFormulario}
									min="0"
									placeholder="5"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label htmlFor="salario" className="block text-sm font-medium text-gray-700">
									Salario Propuesto (CLP)
								</label>
								<input
									type="number"
									id="salario"
									name="salario"
									value={formularioEjecutivo.salario}
									onChange={cambioFormulario}
									placeholder="800000"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
						</div>
						<div>
							<label htmlFor="especializacion" className="block text-sm font-medium text-gray-700">
								Especializacion/Requisitos
							</label>
							<textarea
								id="especializacion"
								name="especializacion"
								value={formularioEjecutivo.especializacion}
								onChange={cambioFormulario}
								rows="3"
								placeholder="Describa la especializacion requerida, certificaciones, etc."
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="fecha_entrevista" className="block text-sm font-medium text-gray-700">
									Fecha de Entrevista
								</label>
								<input
									type="date"
									id="fecha_entrevista"
									name="fecha_entrevista"
									value={formularioEjecutivo.fecha_entrevista}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">
									Prioridad
								</label>
								<select
									id="prioridad"
									name="prioridad"
									value={formularioEjecutivo.prioridad}
									onChange={cambioFormulario}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Seleccionar...</option>
									<option>Alta</option>
									<option>Media</option>
									<option>Baja</option>
								</select>
							</div>
						</div>
						<div>
							<label htmlFor="comentarios" className="block text-sm font-medium text-gray-700">
								Comentarios Adicionales
							</label>
							<textarea
								id="comentarios"
								name="comentarios"
								value={formularioEjecutivo.comentarios}
								onChange={cambioFormulario}
								rows="2"
								placeholder="Notas sobre el candidato, referencias, etc."
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<button
							type="submit"
							className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Añadir Contrato
						</button>
						{error && (
							<div className="text-red-600 text-sm mt-2">{error}</div>
						)}
					</form>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">Personal Ejecutivo Actual</h3>
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-gray-50">
								<th className="px-4 py-2 text-left"></th>
								<th className="px-4 py-2 text-left">Nombre</th>
								<th className="px-4 py-2 text-left">Cargo</th>
								<th className="px-4 py-2 text-left">Fecha de Contratacion</th>
								<th className="px-4 py-2 text-left">Estado</th>
							</tr>
						</thead>
						<tbody>
							{contratos.map((contrato) => (
								<tr key={contrato.id}>
									<td className="border px-4 py-2">
										<button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
											Modificar
										</button>
									</td>
									<td className="border px-4 py-2">{contrato.nombre}</td>
									<td className="border px-4 py-2">{contrato.cargo}</td>
									<td className="border px-4 py-2">{contrato.fecha_contratacion}</td>
									<td className="border px-4 py-2">
										<span className={`px-2 py-1 rounded ${cssParaEstao(contrato.estado)}`}>
											{contrato.estado}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
		</Layout>
	);
}

export default ContratosEjecutivo;