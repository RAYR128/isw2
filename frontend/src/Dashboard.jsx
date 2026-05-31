import { Link } from 'react-router-dom';
import Header from "./GeneracionPagina";

function Dashboard() {
	return (
		<div className="bg-gray-100">
			<Header />
			<main className="container mx-auto p-6">
				<h2 className="text-2xl font-bold mb-6">Dashboard de Gestion</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Link to="/asignacion" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<h3 className="text-lg font-semibold mb-2">Volumen de Personal</h3>
						<p className="text-gray-600">Gestionar envio de personal a diferentes lugares</p>
					</Link>
					<Link to="/contratos/personal" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<h3 className="text-lg font-semibold mb-2">Contratos de Trabajo</h3>
						<p className="text-gray-600">Contratos por tiempo y necesidad de la empresa</p>
					</Link>
				</div>
				{/*
				<br />
				<h2 className="text-2xl font-bold mb-6">Administracion</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Link to="/contratos/ejecutivo" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<h3 className="text-lg font-semibold mb-2">Contratos Ejecutivos</h3>
						<p className="text-gray-600">Contadores, prevencionistas, personal quimico, etc.</p>
					</Link>
				</div>
				*/}
			</main>
		</div>
	);
}

export default Dashboard;