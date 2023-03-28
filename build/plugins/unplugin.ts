/**
 *  Introduces component library styles on demand.
 * https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import type { ComponentResolver } from 'unplugin-vue-components/types'

function generateResolver(isBuild: boolean) {
  const compResolver: (ComponentResolver | ComponentResolver[])[] = [
    IconsResolver({
      enabledCollections: ['ep']
    })
  ]
  isBuild && compResolver.push(ElementPlusResolver())
  return compResolver
}

export function configUnpluginPlugin(isBuild: boolean) {
  const unplugins = [
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
      resolvers: generateResolver(isBuild),

      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts'
    }),
    Icons({
      autoInstall: true
    })
  ]
  return unplugins
}
