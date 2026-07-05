import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { verContratoEjecutivo, modificarContratoEjecutivo } from './api';
import { Layout } from "./GeneracionPagina";

function formatearFechaInput(fecha) {
	if (!fecha) return '';
	return String(fecha).split('T')[0];
}

function ContratosEjecutivoModificar() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [contrato, setContrato] = useState(null);
	const [formulario, setFormulario] = useState({
		salario: '',
		especializacion: '',
		fecha_entrevista: '',
		fecha_contratacion: '',
		prioridad: '',
		comentarios: '',
	});
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const cargarContrato = async () => {
			try {
				setCargando(true);
				const data = await verContratoEjecutivo(id);
				setContrato(data);
				setFormulario({
					salario: data.salario ?? '',
					especializacion: data.especializacion ?? '',
					fecha_entrevista: formatearFechaInput(data.fecha_entrevista),
					fecha_contratacion: formatearFechaInput(data.fecha_contratacion),
					prioridad: data.prioridad ?? '',
					comentarios: data.comentarios ?? '',
				});
			} catch (_) {
				setError('Error al cargar el contrato ejecutivo');
			} finally {
				setCargando(false);
			}
		};

		cargarContrato();
	}, [id]);

	const cambioFormulario = (e) => {
		setFormulario({
			...formulario,
			[e.target.name]: e.target.value,
		});
	};

	const formularioOnSubmit = async (e) => {
		e.preventDefault();
		try {
			await modificarContratoEjecutivo(id, {
				salario: formulario.salario,
				especializacion: formulario.especializacion,
				fecha_entrevista: formulario.fecha_entrevista,
				fecha_contratacion: formulario.fecha_contratacion,
				prioridad: formulario.prioridad,
				comentarios: formulario.comentarios,
			});
			navigate('/contratos/ejecutivos');
		} catch (_) {
			setError('Error al modificar el contrato ejecutivo');
		}
	};

	const cssParaEstado = (estado) => {
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

	if (!contrato) {
		return (
			<Layout>
				<div className="flex items-center justify-center py-12 text-red-600">
					{error || 'Contrato ejecutivo no encontrado'}
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="mb-6">
				<Link to="/contratos/ejecutivos" className="text-blue-600 hover:text-blue-800">
					&larr; Volver a contratos ejecutivos
				</Link>
			</div>
			<h2 className="text-2xl font-bold mb-6">Modificar Contrato Ejecutivo</h2>
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<h3 className="text-lg font-semibold mb-4">Datos del candidato</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="text-sm font-medium text-gray-500">Nombre</p>
						<p className="text-gray-900">{contrato.nombre}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">Cargo</p>
						<p className="text-gray-900">{contrato.cargo}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">Años de Experiencia</p>
						<p className="text-gray-900">{contrato.experiencia}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">Estado</p>
						<span className={`px-2 py-1 rounded ${cssParaEstado(contrato.estado)}`}>
							{contrato.estado}
						</span>
					</div>
				</div>
			</div>
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h3 className="text-lg font-semibold mb-4">Campos modificables</h3>
				<form onSubmit={formularioOnSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label htmlFor="salario" className="block text-sm font-medium text-gray-700">
								Salario Propuesto (CLP)
							</label>
							<input
								type="number"
								id="salario"
								name="salario"
								value={formulario.salario}
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
								value={formulario.prioridad}
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
						<label htmlFor="especializacion" className="block text-sm font-medium text-gray-700">
							Especializacion/Requisitos
						</label>
						<textarea
							id="especializacion"
							name="especializacion"
							value={formulario.especializacion}
							onChange={cambioFormulario}
							rows="3"
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
								value={formulario.fecha_entrevista}
								onChange={cambioFormulario}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div>
							<label htmlFor="fecha_contratacion" className="block text-sm font-medium text-gray-700">
								Fecha de Contratacion
							</label>
							<input
								type="date"
								id="fecha_contratacion"
								name="fecha_contratacion"
								value={formulario.fecha_contratacion}
								onChange={cambioFormulario}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
					</div>
					<div>
						<label htmlFor="comentarios" className="block text-sm font-medium text-gray-700">
							Comentarios Adicionales
						</label>
						<textarea
							id="comentarios"
							name="comentarios"
							value={formulario.comentarios}
							onChange={cambioFormulario}
							rows="2"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Guardar Cambios
					</button>
					{error && (
						<div className="text-red-600 text-sm mt-2">{error}</div>
					)}
				</form>
			</div>
		</Layout>
	);
}

export default ContratosEjecutivoModificar;