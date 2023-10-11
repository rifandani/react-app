/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string | undefined; // prefixed with "VITE_" -> exposed to our Vite-processed code
  readonly VITE_API_BASE_URL: string | undefined; // this WON'T be exposed to Vite-processed code
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
