import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname + '/src'),
    }
  },
  plugins: [
    react(),
    svgLoader({ defaultImport: 'url', svgo: false })
  ]
});
