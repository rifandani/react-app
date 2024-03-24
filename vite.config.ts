import type { RollupReplaceOptions } from '@rollup/plugin-replace';
import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import process from 'node:process';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwind from 'tailwindcss';
import { defineConfig, type PluginOption } from 'vite';
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  mode: process.env.SW_DEV === 'true' ? 'development' : 'production',
  includeAssets: ['*.ico', '*.svg', '*.png'],
  manifest: {
    name: 'React App',
    short_name: 'React App',
    description: 'Bulletproof React 18 SPA Template',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    display_override: ['window-controls-overlay'],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    type: process.env.SW === 'true' ? 'module' : 'classic',
    navigateFallbackAllowlist: [/^index.html$/],
  },
  workbox: {
    globPatterns: [
      '**/*.{html,css,js,json,txt,ico,svg,jpg,png,webp,woff,woff2,ttf,eot,otf,wasm}',
    ],
  },
};

const claims = process.env.CLAIMS === 'true';
const replaceOptions: RollupReplaceOptions = {
  __DATE__: new Date().toISOString(),
};

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src';
  pwaOptions.strategies = 'injectManifest';
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
  (pwaOptions.manifest as Partial<ManifestOptions>).name =
    'PWA Inject Manifest';
  (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject';
}

if (claims) pwaOptions.registerType = 'autoUpdate';
if (process.env.SW_DESTROY === 'true') pwaOptions.selfDestroying = true;
if (process.env.RELOAD_SW === 'true') replaceOptions.__RELOAD_SW__ = 'true';

export default defineConfig({
  server: {
    port: 3300,
  },
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    tsconfigPaths({ loose: true }),
    react(),
    visualizer({
      filename: 'html/visualizer-stats.html',
    }) as unknown as PluginOption,
    VitePWA(pwaOptions),
    replace(replaceOptions) as unknown as PluginOption,
  ],
});
