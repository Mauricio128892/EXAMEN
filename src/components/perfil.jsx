
import React from 'react';
import { useAuth } from '../AuthContext';

const Pefil = () => { 
  const { user } = useAuth();


  if (!user) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-xl text-gray-600">Cargando información del perfil...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto mt-8 bg-white shadow-md rounded-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Mi Perfil</h2>
      
      <div className="flex flex-col items-center space-y-4">
 
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
        ) : (
         
          <div className="w-32 h-32 rounded-full border-4 border-blue-500 bg-gray-200 flex items-center justify-center text-5xl font-bold text-gray-600">
            {user.displayName ? user.displayName[0].toUpperCase() : '?'}
          </div>
        )}

      
        <h3 className="text-2xl font-semibold text-gray-900">
          {user.displayName || 'Nombre no disponible'} 
        </h3>

      
        <p className="text-lg text-gray-700">
          Correo: <span className="font-medium">{user.email || 'Correo no disponible'}</span>
        </p>

      </div>
    </div>
  );
};

export default Pefil; 
