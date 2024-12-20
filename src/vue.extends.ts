// 全局扩展模块
import type { App } from 'vue'
import { allowMultipleToast, setToastDefaultOptions } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import enUS from 'vant/es/locale/lang/en-US'
import { Locale } from 'vant'
import filters from './filters'
import directives from './directives'
import { showLoadingToast, showToast } from 'vant/es'
// import VueLazyload from 'vue-lazyload'

Locale.use('en-US', enUS)

allowMultipleToast(true)
setToastDefaultOptions({
  duration: 3000,
  overlay: false,
})

export default function (app: App) {
  app.use(filters)
  app.use(directives)
  // app.use(VueLazyload, {
  //   preLoad: 1.3,
  //   // error: errorimage,
  //   // loading: loadimage,
  //   attempt: 1,
  //   lazyComponent: true,
  // })
}
