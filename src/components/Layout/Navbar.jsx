// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <nav className="bg-accentGreen text-white p-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
          Mi App de Recetas
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/recetas" className="hover:text-gray-200 transition-colors">Recetas</Link>

          {currentUser ? (
            <>
              <Link to="/recetas/crear" className="hover:text-gray-200 transition-colors">Crear Receta</Link>
              {/* Enlace a "Mi Perfil" REMOVIDO */}
              <button
                onClick={handleLogout}
                className="bg-redDanger hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            // Solo un enlace a Iniciar Sesión si no hay usuario
            <Link to="/login" className="bg-accentGreenHover hover:bg-accentGreen text-white px-3 py-1 rounded-md transition-colors">
              Iniciar Sesión
            </Link>
            // Enlace a "Registrarse" REMOVIDO
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
