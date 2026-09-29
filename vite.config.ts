import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
export default defineConfig({
  base: '/olmo-raw-continuations/',
  plugins:[react()],
  css:{postcss:{plugins:[tailwindcss()]}},
  build:{outDir:'docs',emptyOutDir:true},
});
