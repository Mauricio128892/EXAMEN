// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth function
import { auth } from '../firebase'; // Import auth instance

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login'); // Redirige al login después del registro
    } catch (err) {
      console.error('Error al registrar usuario:', err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está registrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setError('Error al registrar. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primaryBg p-4">
      <div className="bg-secondaryBg p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 text-textColor">
        <h2 className="text-3xl font-bold mb-6 text-center text-accentGreen">Registrarse</h2>
        {error && <p className="text-redDanger text-center mb-4">{error}</p>}

        <form onSubmit={handleSignUp}>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-textSecondary text-sm font-bold mb-2">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
              placeholder="********"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-accentGreen hover:bg-accentGreenHover text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>

        <p className="text-center text-textSecondary mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-accentGreen hover:underline font-bold">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
