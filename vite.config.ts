import react from '@vitejs/plugin-react-swc'; // Updated import
import million from 'million/compiler';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

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
    // rollupNodePolyFill(), // Ensure this plugin is compatible with Vite
  ],
  resolve: {
    alias: {
      // buffer: require.resolve('buffer/'),
      // // events: require.resolve('events/'),
      // lib: resolve(__dirname, 'src/lib'),
      // routes: resolve(__dirname, 'src/routes'),
      // util: 'rollup-plugin-node-polyfills/polyfills/util',
      // sys: 'util',
      // events: 'rollup-plugin-node-polyfills/polyfills/events',
      // //stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      // stream: 'stream-browserify',
      // path: 'rollup-plugin-node-polyfills/polyfills/path',
      // querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      // punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      // url: 'rollup-plugin-node-polyfills/polyfills/url',
      // http: 'rollup-plugin-node-polyfills/polyfills/http',
      // https: 'rollup-plugin-node-polyfills/polyfills/http',
      // os: 'rollup-plugin-node-polyfills/polyfills/os',
      // assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      // constants: 'rollup-plugin-node-polyfills/polyfills/constants',
      // _stream_duplex:
      //   'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
      // _stream_passthrough:
      //   'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
      // _stream_readable:
      //   'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      // _stream_writable:
      //   'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
      // _stream_transform:
      //   'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
      // timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      // console: 'rollup-plugin-node-polyfills/polyfills/console',
      // vm: 'rollup-plugin-node-polyfills/polyfills/vm',
      // zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      // tty: 'rollup-plugin-node-polyfills/polyfills/tty',
      // domain: 'rollup-plugin-node-polyfills/polyfills/domain',
    },
  },
  server: {
    open: true,
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'PioneerLib',
      fileName: (format) => `my-library.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.tsx'),
      },
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: 'index_[hash].js',
        assetFileNames: 'index_[hash][extname]',
        format: 'es',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@chakra-ui/react': 'Chakra',
          '@emotion/react': 'emotion',
        },
      },
      external: [
        'react',
        'react-dom',
        '@chakra-ui/react',
        '@emotion/react',
        /^react\//,
      ],
      // external: ['react', 'react-dom', '@chakra-ui/react', '@emotion/react'],
      plugins: [
        // NodeGlobalsPolyfillPlugin({
        //   process: true,
        //   buffer: true,
        // }),
        // // @ts-ignore
        // rollupNodePolyFill(),
      ],
    },
  },
});
