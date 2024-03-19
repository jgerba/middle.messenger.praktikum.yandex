import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  plugins: [handlebars()],
});
