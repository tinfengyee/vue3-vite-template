import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
// defineConfig
import { loadEnv, type UserConfigExport, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'
// import { svgLoader as CustomSvgLoader } from './build/plugins/SVGLoader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

const ENV = process.env.NODE_ENV ?? 'development'
const CONFIG = loadEnv(ENV, process.cwd())

// https://vitejs.dev/config/
// export default defineConfig()
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: CONFIG.VITE_APP_BASE_URL,
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5173',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      svgLoader({
        svgoConfig: {
          multipass: true
        }
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(__dirname, 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
      // 自定义 svg 插件
      // CustomSvgLoader('./src/assets/svg/')
    ],
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: fileURLToPath(new URL('./src/', import.meta.url))
        },
        {
          find: /#\//,
          replacement: fileURLToPath(new URL('./src/', import.meta.url))
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    }
  }
}
