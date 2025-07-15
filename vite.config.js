// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none', // Mantener esta configuración para el popup de Google Auth
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
  },
});
