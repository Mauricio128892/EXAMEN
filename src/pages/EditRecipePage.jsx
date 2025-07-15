// src/pages/EditRecipePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'; // Importa updateDoc y Timestamp
import RecipeForm from '../components/Recipes/RecipeForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

const EditRecipePage = () => {
  const { id } = useParams(); // Obtiene el ID de la receta a editar
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [recipe, setRecipe] = useState(null); // Estado para la receta a editar
  const [loading, setLoading] = useState(true); // Para la carga inicial de la receta
  const [saving, setSaving] = useState(false); // Para el estado de guardado del formulario
  const [error, setError] = useState(null); // Para errores de carga o guardado

  // useEffect para cargar la receta existente
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'recipes', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedRecipe = { id: docSnap.id, ...docSnap.data() };
          // Verificar si el usuario actual es el propietario de la receta
          if (currentUser && currentUser.uid === fetchedRecipe.userId) {
            setRecipe(fetchedRecipe);
          } else {
            setError("No tienes permiso para editar esta receta.");
            navigate('/recetas'); // Redirige si no es el propietario
          }
        } else {
          setError("Receta no encontrada.");
          navigate('/recetas'); // Redirige si la receta no existe
        }
      } catch (err) {
        console.error("Error al cargar la receta para editar:", err);
        setError("Error al cargar la receta para editar. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    if (id && currentUser) { // Asegúrate de que hay un ID y un usuario logueado
      fetchRecipe();
    } else if (!currentUser) {
      setLoading(false);
      setError("Necesitas iniciar sesión para editar recetas.");
      navigate('/login'); // Redirige si no hay usuario
    } else {
      setLoading(false);
      setError("ID de receta no proporcionado para editar.");
      navigate('/recetas');
    }
  }, [id, currentUser, navigate]); // Dependencias: ID de la URL y usuario actual

  // Manejador para el envío del formulario (actualización)
  const handleUpdate = async (updatedRecipeData) => {
    setSaving(true);
    setError(null);
    try {
      const recipeRef = doc(db, 'recipes', id);
      await updateDoc(recipeRef, {
        ...updatedRecipeData,
        // No actualizamos userId ni fechaCreacion al editar, solo los datos del formulario
        fechaActualizacion: Timestamp.now(), // Opcional: añadir una marca de tiempo de actualización
      });
      alert('Receta actualizada con éxito!');
      navigate(`/recetas/${id}`); // Redirige a la vista de detalle de la receta actualizada
    } catch (e) {
      console.error('Error al actualizar la receta:', e);
      setError('Error al actualizar la receta. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />; // Muestra spinner mientras carga la receta
  }

  if (error) {
    return <div className="text-center text-redDanger mt-8 text-xl">{error}</div>; // Muestra errores de carga/permiso
  }

  if (!recipe) {
    // Esto podría ocurrir si la receta no se encontró o no tiene permisos
    return <div className="text-center text-textSecondary mt-8 text-xl">Cargando datos de la receta o sin acceso.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <RecipeForm
        initialData={recipe} // Pasa la receta cargada al formulario
        onSubmit={handleUpdate}
        isEditing={true} // Indica al formulario que está en modo edición
        loading={saving} // Pasa el estado de guardado
        error={error} // Pasa errores de guardado
      />
    </div>
  );
};

export default EditRecipePage;
