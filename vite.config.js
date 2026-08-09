import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  appType: 'mpa',
  plugins: [
    {
      name: 'rewrite-legal-urls',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url === '/privacidad' ||
            req.url === '/privacidad/' ||
            req.url === '/privacy' ||
            req.url === '/privacy/' ||
            req.url === '/pages/privacidad' ||
            req.url === '/pages/privacidad/'
          ) {
            req.url = '/privacidad/index.html';
          } else if (
            req.url === '/eliminar-cuenta' ||
            req.url === '/eliminar-cuenta/' ||
            req.url === '/delete-account' ||
            req.url === '/delete-account/' ||
            req.url === '/pages/eliminar-cuenta' ||
            req.url === '/pages/eliminar-cuenta/'
          ) {
            req.url = '/eliminar-cuenta/index.html';
          }
          next();
        });
      },
    },
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacidad: resolve(__dirname, 'privacidad/index.html'),
        pagesPrivacidad: resolve(__dirname, 'pages/privacidad/index.html'),
        eliminarCuenta: resolve(__dirname, 'eliminar-cuenta/index.html'),
        pagesEliminarCuenta: resolve(__dirname, 'pages/eliminar-cuenta/index.html'),
      },
    },
  },
  server: {
    port: 4000,
    open: true,
  },
});

