// src/components/Layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primaryBg text-textSecondary p-4 text-center border-t border-gray-700 mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Mi App de Recetas. Todos los derechos reservados.</p>
        <p className="text-sm mt-2">Hecho con ❤️ y React</p>
      </div>
    </footer>
  );
};

export default Footer;
