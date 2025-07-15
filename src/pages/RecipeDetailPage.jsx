// src/pages/RecipeDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Importa la instancia de Firestore
import { doc, getDoc, deleteDoc } from 'firebase/firestore'; // Importa funciones para obtener y eliminar documentos
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext'; // Para verificar si el usuario es el propietario
import DeleteConfirmationModal from '../components/Recipes/DeleteConfirmationModal'; // Importa el modal de confirmación

const RecipeDetailPage = () => {
  const { id } = useParams(); // Obtiene el ID de la receta de la URL
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obtiene el usuario actual
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminación

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'recipes', id); // Crea una referencia al documento específico por su ID
        const docSnap = await getDoc(docRef); // Obtiene el documento

        if (docSnap.exists()) {
          setRecipe({ id: docSnap.id, ...docSnap.data() }); // Si el documento existe, guarda sus datos en el estado
        } else {
          setError("La receta no fue encontrada.");
          console.log("No such document!");
          // Opcional: Podrías redirigir a una página 404 o al listado de recetas si no se encuentra
          // navigate('/recetas');
        }
      } catch (err) {
        console.error("Error al obtener la receta:", err);
        setError("Error al cargar la receta. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Solo intenta buscar la receta si hay un ID en los parámetros de la URL
      fetchRecipe();
    } else {
      setError("No se proporcionó un ID de receta."); // Si no hay ID en la URL
      setLoading(false);
    }
  }, [id, navigate]); // Dependencias: se ejecuta cuando el ID de la URL cambia o si navigate cambia

  // Manejador para el botón de eliminar (abre el modal)
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // Manejador para la eliminación real (pasado al modal)
  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'recipes', id)); // Elimina el documento de Firestore
      alert('Receta eliminada con éxito!'); // Notificación de éxito
      navigate('/recetas'); // Redirige al listado de recetas después de eliminar
    } catch (err) {
      console.error('Error al eliminar la receta:', err);
      alert('Error al eliminar la receta. Inténtalo de nuevo.'); // Notificación de error
    } finally {
      setShowDeleteModal(false); // Cierra el modal
    }
  };


  if (loading) {
    return <LoadingSpinner />; // Muestra un spinner mientras carga
  }

  if (error) {
    return <div className="text-center text-redDanger mt-8 text-xl">{error}</div>; // Muestra un mensaje de error
  }

  if (!recipe) {
    // Esto podría ocurrir si la receta no se encontró y no hubo error, o si la data es nula
    return <div className="text-center text-textSecondary mt-8 text-xl">Receta no disponible.</div>;
  }

  // Verifica si el usuario actual es el propietario de la receta
  const isOwner = currentUser && currentUser.uid === recipe.userId;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-secondaryBg rounded-lg shadow-xl overflow-hidden border border-gray-700 max-w-4xl mx-auto p-6 md:p-8">
        <img
          src={recipe.imagenUrl || 'https://via.placeholder.com/800x600?text=Sin+Imagen'}
          alt={recipe.nombre}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold text-textColor mb-4">{recipe.nombre}</h1>
        <p className="text-textSecondary text-lg mb-4">
          Tiempo de Preparación: <span className="font-semibold">{recipe.tiempoPreparacion} minutos</span>
        </p>
        <p className="text-textSecondary text-lg mb-6">
          Porciones: <span className="font-semibold">{recipe.porciones}</span>
        </p>

        <h2 className="text-2xl font-bold text-textColor mb-3">Ingredientes:</h2>
        <ul className="list-disc list-inside text-textSecondary mb-6">
          {recipe.ingredientes && recipe.ingredientes.map((ing, index) => (
            <li key={index}>{ing.cantidad} {ing.nombre}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-textColor mb-3">Instrucciones:</h2>
        <ol className="list-decimal list-inside text-textSecondary space-y-2">
          {recipe.instrucciones && recipe.instrucciones.map((inst, index) => (
            <li key={index}>{inst}</li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col md:flex-row justify-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Botones de acción (Editar y Eliminar) solo si el usuario es el propietario */}
          {isOwner && (
            <>
              <button
                onClick={() => navigate(`/recetas/editar/${recipe.id}`)}
                className="bg-accentGreen hover:bg-accentGreenHover text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Editar Receta
              </button>
              <button
                onClick={handleDeleteClick} // Llama a la función que abre el modal
                className="bg-redDanger hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Eliminar Receta
              </button>
            </>
          )}
          <button
            onClick={() => navigate('/recetas')}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Volver a Recetas
          </button>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          recipeId={recipe.id} // Pasa el ID de la receta al modal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete} // Pasa la función de eliminación real
        />
      )}
    </div>
  );
};

export default RecipeDetailPage;
