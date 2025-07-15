// src/components/Recipes/DeleteConfirmationModal.jsx
import React from 'react';
// Ya no necesitamos 'db', 'deleteDoc', 'doc' aquí porque la lógica de eliminación se pasa via props
// import { db } from '../../firebase';
// import { deleteDoc, doc } from 'firebase/firestore';

// El modal ahora recibe una prop 'onConfirm' que es la función que realmente elimina la receta
const DeleteConfirmationModal = ({ recipeId, onClose, onConfirm }) => {
  // La función handleDelete ahora simplemente llama a onConfirm y luego cierra el modal
  const handleDelete = () => {
    onConfirm(recipeId); // Llama a la función de confirmación que se pasó como prop
    onClose(); // Cierra el modal después de confirmar
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-secondaryBg rounded-lg shadow-xl p-6 w-full max-w-sm border border-gray-700 text-textColor"> {/* Aplicando estilos de tu paleta */}
        <h2 className="text-xl font-bold text-textColor mb-4">Confirmar Eliminación</h2>
        <p className="text-textSecondary mb-6">
          ¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete} // Llama a la función local que a su vez llama a onConfirm
            className="px-4 py-2 bg-redDanger hover:bg-red-700 text-white rounded-md transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
