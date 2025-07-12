
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      
      navigate('/');
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Inicia Sesión en Mi Sistema HR</h2>
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Iniciar Sesión con Google
        </button>
        <p className="mt-4 text-gray-600">Solo se permite el acceso con una cuenta de Google.</p>
      </div>
    </div>
  );
};

export default Login;