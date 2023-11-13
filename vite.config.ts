/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"' },
    }),
    tsconfigPaths(),
  ],
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"), // Set the entry file of your library
      name: "PioneerLib", // Set the name of your library
      fileName: (format) => `my-library.${format}.js` // Set the fileName of your library
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@chakra-ui/react', '@emotion/react'],
    }
  }
});
