/// <reference types="vite/client" />

interface ViteEnv {
  VITE_ENV: string
  VITE_OUTPUT_DIR: string
  VITE_PUBLIC_PATH: string
  VITE_GLOB_API_URL: string
  VITE_USE_MOCK: boolean
  VITE_PORT: number
  // 更多环境变量...
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
