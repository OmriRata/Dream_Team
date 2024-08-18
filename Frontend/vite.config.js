import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/users': 'http://localhost:5000'
    }
  },
  plugins: [react()],
  assetsInclude: ['**/*.csv'] // Include this line to help Vite recognize CSV files
});
