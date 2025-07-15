// src/pages/RecipesPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importa la instancia de Firestore
import { collection, query, orderBy, getDocs } from 'firebase/firestore'; // Importa funciones para obtener documentos
import RecipeCard from '../components/Recipes/RecipeCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext'; // Si quieres filtrar por usuario logueado

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth(); // Para filtrar si solo quieres las recetas del usuario

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipesCollectionRef = collection(db, 'recipes');
        // Opcional: Si solo quieres las recetas del usuario logueado:
        // const q = query(recipesCollectionRef, where("userId", "==", currentUser.uid), orderBy("fechaCreacion", "desc"));
        // Si quieres todas las recetas:
        const q = query(recipesCollectionRef, orderBy("fechaCreacion", "desc")); // Ordenar por fecha de creación

        const querySnapshot = await getDocs(q);
        const recipesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecipes(recipesList);
      } catch (err) {
        console.error("Error al obtener recetas:", err);
        setError("Error al cargar las recetas.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentUser]); // Dependencia: si cambias el filtro por usuario, que se recarguen

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-redDanger mt-8 text-xl">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-textColor mb-8 text-center">Nuestras Recetas</h1>
      {recipes.length === 0 ? (
        <p className="text-center text-textSecondary text-xl">
          Aún no hay recetas. ¡Sé el primero en <Link to="/recetas/crear" className="text-accentGreen hover:underline">crear una</Link>!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;