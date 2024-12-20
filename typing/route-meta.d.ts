export {}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string
    /** 页面是否保持内存 */
    keepAlive?: boolean
    /** 仅登录可以访问 */
    authentication?: boolean
    /** 显示公共头部 */
    withHeader?: boolean
    withFixedHeader?: boolean
    footer?: boolean
    transition?: string
  }
}
