
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import { auth } from './firebase'; 
import { signOut } from 'firebase/auth'; 


import Navbar from './components/Navbar'; 
import Login from './components/Login'; 
import Employees from './components/Employees'; 
import Perfil from './components/perfil'; 


const HomePage = () => (
  <div className="p-4">
    <h1 className="text-3xl font-bold mb-4">Bienvenido a mi página de RH</h1>
    <p className="text-gray-700">Explora las secciones de tu sistema de Recursos Humanos.</p>
  </div>
);


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
   
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-700">
        Cargando...
      </div>
    );
  }

  if (!user) {

    React.useEffect(() => {
      navigate('/login');
    }, [navigate]);
    return null; 
  }


  return children;
};


function App() {
  const { user } = useAuth(); 
  const navigate = useNavigate(); 


  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      navigate('/login'); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    
      alert("Error al cerrar sesión: " + error.message); 
    }
  };

  return (
    <>

      {user && <Navbar onSignOut={handleSignOut} />}


      <Routes>

        <Route path="/login" element={<Login />} />


        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage /> 
            </PrivateRoute>
          }
        />
        <Route
          path="/empleados"
          element={
            <PrivateRoute>
              <Employees /> 
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil /> 
            </PrivateRoute>
          }
        />

        
        <Route path="*" element={<h1 className="text-4xl text-center mt-20">404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
