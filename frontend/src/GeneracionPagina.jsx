// Cosas de generacion que son compartidas entre paginas
import { Link, useLocation } from "react-router-dom";

const navItems = [
	{ to: "/dashboard", label: "Dashboard", description: "Panel principal" },
	{ to: "/asignacion", label: "Volumen de Personal", description: "Asignacion de personal", matchPrefix: "/asignacion" },
	{ to: "/contratos/personal", label: "Contratos de Trabajo", description: "Contratos de trabajadores" },
	{ to: "/contratos/ejecutivos", label: "Contratos Ejecutivos", description: "Personal ejecutivo" },
];

const cerrarSesion = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	window.location.href = "/";
};

const esActivo = (pathname, item) => {
	if (item.matchPrefix) {
		return pathname.startsWith(item.matchPrefix);
	}
	return pathname === item.to;
};

const Sidebar = () => {
	const { pathname } = useLocation();

	return (
		<aside className="w-full md:w-64 bg-white shadow-md shrink-0">
			<nav className="p-4">
				<p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 px-3">
					Navegacion
				</p>
				<ul className="space-y-1">
					{navItems.map((item) => {
						const activo = esActivo(pathname, item);
						return (
							<li key={item.to}>
								<Link
									to={item.to}
									className={`block rounded-lg px-3 py-2.5 transition-colors ${
										activo
											? "bg-blue-600 text-white"
											: "text-gray-700 hover:bg-gray-100"
									}`}
								>
									<span className="font-medium">{item.label}</span>
									<span className={`block text-xs mt-0.5 ${activo ? "text-blue-100" : "text-gray-500"}`}>
										{item.description}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
};

const Header = () => {
	return (
		<header className="bg-blue-600 text-white p-4 shrink-0">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-bold">Empresa de Aseos</h1>
				<button onClick={cerrarSesion} className="hover:underline text-sm">
					Cerrar Sesion
				</button>
			</div>
		</header>
	);
};

const Layout = ({ children }) => {
	return (
		<div className="bg-gray-100 min-h-screen flex flex-col">
			<Header />
			<div className="flex flex-col md:flex-row flex-1">
				<Sidebar />
				<main className="flex-1 p-6 overflow-auto">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Header;
export { Layout };