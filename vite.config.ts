import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
export default defineConfig({
  base: '/persona-selection-results/',
  plugins:[react()],
  css:{postcss:{plugins:[tailwindcss()]}},
  build:{outDir:'docs',emptyOutDir:true},
});
