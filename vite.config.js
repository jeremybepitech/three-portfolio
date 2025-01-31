import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    base: '/three-portfolio/', // GitHub Pages base URL
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist', // Dossier de sortie du build
        assetsDir: 'assets', // Met les assets statiques dans un sous-dossier
    }
});
