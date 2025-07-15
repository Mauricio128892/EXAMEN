    // src/pages/HomePage.jsx
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';

    const HomePage = () => {
      const { currentUser } = useAuth();

      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-primaryBg text-textColor p-4"> {/* Adjust min-h to account for Navbar height */}
          <h1 className="text-5xl font-bold mb-6 text-accentGreen">Bienvenido a Recetario</h1>
          <p className="text-xl text-textSecondary mb-8 text-center max-w-2xl">
            Tu lugar para descubrir, crear y organizar tus recetas favoritas.
          </p>
          {currentUser ? (
            <Link
              to="/recetas"
              className="bg-accentGreen hover:bg-accentGreenHover text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Ver Mis Recetas
            </Link>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="bg-accentGreen hover:bg-accentGreenHover text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/signup"
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      );
    };

    export default HomePage;
    