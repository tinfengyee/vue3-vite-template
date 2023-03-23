import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
// defineConfig
import { loadEnv, type UserConfigExport, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
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
      cors: true,
      proxy: {
        '^/api|management/.*': {
          target: 'http://localhost:8080',
          changeOrigin: true
          // secure: false
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
      // proxy: {
      //   '/api': {
      //     target: 'http://127.0.0.1:5173',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // imports: ['vue', 'vue-router'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        dts: 'src/auto-imports.d.ts'
        // eslintrc: {
        //   enabled: true, // Default `false`
        //   filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        //   globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        // }
      }),
      Components({
        // 生产环境按需导入
        // resolvers: command === 'build' ? ElementPlusResolver() : undefined,
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep']
          })
          // ElementPlusResolver()
        ],

        // allow auto load markdown components under `./src/components/`
        extensions: ['vue'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts'
      }),
      Icons({
        autoInstall: true
      }),
      // 开发环境完整引入element-plus
      {
        name: 'dev-auto-import-element-plus',
        apply: 'serve',
        transform(code, id) {
          if (command !== 'build' && /src\/main.ts$/.test(id)) {
            // console.log(code)
            const name = 'ElementPlus'

            // 引入 ElementPlus 和 样式
            const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/dist/index.css';\n`

            // 通过匹配字符串来使用 ElementPlus （此处替换规则根据 main.ts 的情况而定）
            // 相当于将字符串 `app.use(router).mount('#app')` 替换成 `app.use(router).use(ElementPlus).mount('#app')`
            code = code.replace('.mount(', ($1) => `.use(${name})` + $1)

            return prepend + code
          }
        }
      },
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
