// src/pages/CreateRecipePage.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/Recipes/RecipeForm';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateRecipe = async (recipeData) => {
    if (!currentUser) {
      setError('Debes iniciar sesión para crear recetas.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'recipes'), {
        ...recipeData,
        userId: currentUser.uid, // Asocia la receta al ID del usuario
        fechaCreacion: Timestamp.now(), // Añade una marca de tiempo
      });
      alert('Receta creada con éxito!'); // Notificación de éxito
      navigate('/recetas'); // Redirige al listado de recetas
    } catch (e) {
      console.error('Error añadiendo documento:', e);
      setError('Error al crear la receta. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/recetas'); // Redirige a la página de recetas
  };

  return (
    <div className="container mx-auto p-8">
      <RecipeForm
        onSubmit={handleCreateRecipe}
        isEditing={false}
        loading={loading}
        error={error}
      />
      {/* Botón de Cancelar */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleCancel}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full transition-colors"
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CreateRecipePage;
