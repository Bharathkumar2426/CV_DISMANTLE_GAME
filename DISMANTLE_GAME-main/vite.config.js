import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative asset paths for GitHub Pages, Vercel, Netlify, and subpaths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  server: {
    host: true,
    port: 5173
  }
});
