import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  appType: 'mpa',
  plugins: [
    {
      name: 'rewrite-privacidad-url',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url === '/privacidad' ||
            req.url === '/privacidad/' ||
            req.url === '/privacy' ||
            req.url === '/privacy/'
          ) {
            req.url = '/pages/privacidad/index.html';
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
        privacidad: resolve(__dirname, 'pages/privacidad/index.html'),
      },
    },
  },
  server: {
    port: 4000,
    open: true,
  },
});
