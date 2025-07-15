// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, signInWithGoogle, login } = useAuth(); // Asegúrate de que 'login' esté aquí
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/recetas');
    }
  }, [currentUser, navigate]);

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password); // Llamada a la función 'login' del contexto
    } catch (err) {
      console.error('Error de inicio de sesión:', err.message);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Correo o contraseña incorrectos.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El formato del correo electrónico es inválido.');
      } else {
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Error de inicio de sesión con Google:', err.message);
      setError('Error al iniciar sesión con Google.'); // Muestra el error de popup en la UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primaryBg">
      <div className="bg-secondaryBg p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 text-textColor">
        <h2 className="text-3xl font-bold mb-6 text-center text-accentGreen">Iniciar Sesión</h2>
        {error && <p className="text-redDanger text-center mb-4">{error}</p>}
        {loading && <p className="text-center text-textSecondary">Cargando...</p>}

        <form onSubmit={handleEmailPasswordLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-textSecondary text-sm font-bold mb-2">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
              placeholder="tu@ejemplo.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-textSecondary text-sm font-bold mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
              placeholder="********"
              required
            />
          </div>
          <div className="flex items-center justify-between flex-col space-y-4">
            <button
              type="submit"
              className="bg-accentGreen hover:bg-accentGreenHover text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors w-full"
              disabled={loading}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors w-full"
              disabled={loading}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" className="w-5 h-5" />
              <span>Iniciar Sesión con Google</span>
            </button>
          </div>
        </form>

        <p className="text-center text-textSecondary mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to="/signup" className="text-accentGreen hover:underline font-bold">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
