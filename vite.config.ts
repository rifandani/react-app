import replace, { RollupReplaceOptions } from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import { ManifestOptions, VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'React App',
    short_name: 'React App',
    description: 'Bulletproof React 18 SPA Template',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
  // workbox: {
  //   globPatterns: [
  //     '**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}',
  //   ],
  // },
};

const replaceOptions: RollupReplaceOptions = {
  __DATE__: new Date().toISOString(),
};
const sw = process.env.SW === 'true';
const claims = process.env.CLAIMS === 'true';
const reload = process.env.RELOAD_SW === 'true';
const selfDestroying = process.env.SW_DESTROY === 'true';

if (sw) {
  pwaOptions.srcDir = 'src';
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
  pwaOptions.strategies = 'injectManifest';
  (pwaOptions.manifest as Partial<ManifestOptions>).name =
    'PWA Inject Manifest';
  (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject';
}

if (claims) pwaOptions.registerType = 'autoUpdate';
// eslint-disable-next-line no-underscore-dangle
if (reload) replaceOptions.__RELOAD_SW__ = 'true';
if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

export default defineConfig({
  server: {
    port: 3300,
  },
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [
    tsconfigPaths(),
    react(),
    visualizer() as unknown as PluginOption,
    VitePWA(pwaOptions),
    replace(replaceOptions) as unknown as PluginOption,
  ],
  test: {
    // to see how your tests are running in real time in the terminal, add "default"
    // to generate HTML output and preview the results of your tests, add "html"
    reporters: ['default', 'html'],
    environment: 'jsdom', // mocking the DOM API
    globals: true, // use APIs globally like jest
    // transformMode: { web: [/\.[jt]sx?$/] },
    setupFiles: ['src/setup-test.ts'],
    exclude: [...configDefaults.exclude, 'e2e/*'],
    // Will call .mockRestore() on all spies before each test. This will clear mock history and reset its implementation to the original one.
    restoreMocks: true,
    coverage: {
      provider: 'istanbul', // 'istanbul' / 'v8'
      reporter: ['text', 'json', 'html'],
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
        // above is default
        'src/setup-test.ts',
        'src/index.tsx',
        'src/mocks/**',
        'src/assets/**',
        'src/lib/**',
      ],
    },
  },
});
