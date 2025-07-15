// src/components/Recipes/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  // Manejo de imagen por defecto si no hay URL
  const imageUrl = recipe.imagenUrl || 'https://via.placeholder.com/400x300?text=Sin+Imagen';

  return (
    <div className="bg-secondaryBg rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <Link to={`/recetas/${recipe.id}`}>
        <img
          src={imageUrl}
          alt={recipe.nombre}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-bold text-textColor mb-2">{recipe.nombre}</h3>
        <p className="text-textSecondary text-sm mb-4">
          Tiempo: {recipe.tiempoPreparacion} min | Porciones: {recipe.porciones}
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={`/recetas/${recipe.id}`}
            className="bg-accentGreen hover:bg-accentGreenHover text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Ver Receta
          </Link>
          {/* Puedes añadir botones de Editar/Eliminar aquí más adelante si quieres que estén en la card */}
          {/* Por ahora, los mostraremos en la página de detalle */}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;