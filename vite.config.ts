import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'
// import { svgLoader as CustomSvgLoader } from './build/plugins/SVGLoader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
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
})
