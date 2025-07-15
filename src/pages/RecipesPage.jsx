// src/pages/RecipesPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import RecipeCard from '../components/Recipes/RecipeCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'; // <--- ¡AÑADE ESTA LÍNEA!

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipesCollectionRef = collection(db, 'recipes');
        const q = query(recipesCollectionRef, orderBy("fechaCreacion", "desc"));

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

    // Esto asegura que las recetas se recarguen si el usuario cambia (ej. login/logout)
    // o si es la primera carga.
    fetchRecipes();
  }, [currentUser]);

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
