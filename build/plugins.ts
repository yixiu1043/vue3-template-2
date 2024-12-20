import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteMockServe } from 'vite-plugin-mock'
import svgLoader from 'vite-svg-loader'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import path from 'path'

function plugins(mode: string, command: 'serve' | 'build'): PluginOption[] {
  return [
    svgLoader(),
    Icons({ autoInstall: true, compiler: 'vue3' }),
    viteCompression(),
    VueRouter({
      dts: './typing/typed-router.d.ts',
      extensions: ['.page.vue'],
      // exclude: ['**/*.component.vue', '**/components/**/*', '*/**/!(index).vue'],
    }),
    vue(),
    vueJsx(),
    //https://github.com/chenxch/unplugin-vue-setup-extend-plus
    vueSetupExtend({
      //禁止组件属性自动导出
      enableAutoExpose: false,
    }),
    AutoImport({
      imports: ['vue', 'pinia', VueRouterAutoImports],
      resolvers: [VantResolver()], // 支持Vant按需加载
      // vueTemplate: true,
      dts: 'typing/auto-import.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      dts: 'typing/components.d.ts',
      extensions: ['vue', 'tsx', 'jsx'],
      resolvers: [VantResolver(), IconsResolver({ prefix: 'icon' })], // 支持Vant和Iconify按需加载
    }),
    // chunkSplitPlugin({
    //   strategy: 'all-in-one',
    //   // 指定拆包策略
    //   customSplitting: {
    //     vendor: [/node_modules/],
    //     // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
    //     'components-util': [/src\/components/, /src\/utils/],
    //   },
    // }),
    visualizer({ open: false }),
    viteMockServe({
      // mockPath: 'mock',
      // enable: command === 'serve',
      ignore(fileName) {
        return fileName !== 'Response.ts'
      },
    }),
    createSvgIconsPlugin({
      //// 指定需要缓存的svg图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: `icon-local-[dir]-[name]`,
      // 自定义插入位置,@default: body-last
      inject: 'body-last',
      //自定义domId,默认：__svg__icons__dom__
      customDomId: '__SVG_ICON_LOCAL__',
    }),
  ]
}

export default plugins
