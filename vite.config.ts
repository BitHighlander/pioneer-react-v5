import react from '@vitejs/plugin-react-swc'; // Updated import
import million from 'million/compiler';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from "path";
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(), // Updated plugin
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"' },
    }),
    tsconfigPaths(),
    // @ts-ignore
    rollupNodePolyFill() // Ensure this plugin is compatible with Vite
  ],
  resolve: {
    alias: {
      'buffer': require.resolve('buffer/'),
      'events': require.resolve('events/'),
    }
  },
  server: {
    open: true,
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "PioneerLib",
      fileName: (format) => `my-library.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@chakra-ui/react', /^react\//],
      // external: ['react', 'react-dom', '@chakra-ui/react', '@emotion/react'],
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        // @ts-ignore
        rollupNodePolyFill()
      ],
    }
  }
});
