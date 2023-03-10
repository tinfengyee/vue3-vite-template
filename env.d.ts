/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_HOST: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
