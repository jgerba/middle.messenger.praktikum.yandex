import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    build: {
        outDir: 'dist',
    },
    plugins: [handlebars()],
});
