// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Solo Routes y Route

// Importa el proveedor de autenticación y el componente de ruta protegida
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Importa los componentes de diseño
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Importa todas las páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import RecipesPage from './pages/RecipesPage';
import CreateRecipePage from './pages/CreateRecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import EditRecipePage from './pages/EditRecipePage';
// import ProfilePage from './pages/ProfilePage'; // Asegúrate de que esta línea esté COMENTADA o ELIMINADA


function App() {
  return (
    // No hay <Router> aquí, ya está en main.jsx
    <div className="min-h-screen bg-primaryBg flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/recetas" element={<RecipesPage />} />
            <Route path="/recetas/crear" element={<CreateRecipePage />} />
            <Route path="/recetas/:id" element={<RecipeDetailPage />} />
            <Route path="/recetas/editar/:id" element={<EditRecipePage />} />
            {/* <Route path="/perfil" element={<ProfilePage />} /> */} {/* Asegúrate de que esta línea esté COMENTADA o ELIMINADA */}
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={
            <div className="flex justify-center items-center h-full text-center">
              <h1 className="text-textColor text-4xl font-bold">404: Página No Encontrada</h1>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
