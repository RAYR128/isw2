// Cosas de generacion que son compartidas entre paginas
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="bg-blue-600 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">Empresa de Aseos</h1>
				<nav>
					<Link to="/dashboard" className="hover:underline mr-4">Dashboard</Link>
					<button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/'; }} className="hover:underline">
						Cerrar Sesion
					</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;