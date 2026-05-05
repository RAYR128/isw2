import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Asignacion from './Asignacion';
import DistribucionAsignacion from './DistribucionAsignacion';
import ContratosPersonal from './ContratosPersonal';
import ContratosEjecutivo from './ContratosEjecutivo';

function App() {
	const [esAuthValido, cambiarEstadoAuth] = useState(false);
	const [cargando, estadoCarga] = useState(true);

	// Primero veamos si hay un token valido (hay que validar esto despues)
	useEffect(() => {
		const token = localStorage.getItem('token');
		cambiarEstadoAuth(!!token);
		estadoCarga(false);
	}, []);

	// Ahora decidimos que mostrar
	if(cargando) { return <div>Cargando...</div>; }
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />}/>
				<Route path="/dashboard" element={esAuthValido ? <Dashboard /> : <Navigate to="/" />}/>
				<Route path="/asignacion" element={esAuthValido ? <Asignacion /> : <Navigate to="/" />}/>
				<Route path="/asignacion/:id" element={esAuthValido ? <DistribucionAsignacion /> : <Navigate to="/" />}/>
				<Route path="/contratos/personal" element={esAuthValido ? <ContratosPersonal /> : <Navigate to="/" />}/>
				<Route path="/contratos/ejecutivo" element={esAuthValido ? <ContratosEjecutivo /> : <Navigate to="/" />}/>
			</Routes>
		</Router>
	);
}

export default App;