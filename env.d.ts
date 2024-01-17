/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="virtual:pwa-register" />
interface ImportMetaEnv {
  readonly VITE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
