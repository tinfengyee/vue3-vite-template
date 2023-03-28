import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import svgLoader from 'vite-svg-loader'
import { resolve } from 'node:path'
import { configMockPlugin } from './mock'
import { fullImportPlugin } from './fullImportPlugin'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { configUnpluginPlugin } from './unplugin'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv
  const vitePlugins: PluginOption[] = [
    vue(),
    vueJsx(),
    // svg-loader
    svgLoader({
      svgoConfig: {
        multipass: true
      }
    }),
    // vite-plugin-svg-icons
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
  // unpluginPlugin - AutoImport/Components/Icons
  vitePlugins.push(configUnpluginPlugin(isBuild))
  // fullImportPlugin
  !isBuild && vitePlugins.push(fullImportPlugin())
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))
  return vitePlugins
}
