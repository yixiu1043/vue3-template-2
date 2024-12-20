import { filter } from '@/filters'
import type { DefineComponent } from 'vue'
import type { Stores } from '@/stores'
import { Directives } from '@/directives/types';

declare module 'vue-router' {
  export interface RouteMeta {
    keepAlive?: boolean
    name?: string
    authentication?: boolean
  }

  export type Route = Partial<RouteRecordRaw>
}

declare module 'vue' {
  interface ComponentCustomProperties extends Directives{
    $filter: typeof filter
    $stores: Stores
    /** userStore.user 的快捷调用方式 */
    $user: Stores['user']['user']
  }
}

declare module '*.vue' {
  const vueComponent: DefineComponent<{}, {}, any>

  export default vueComponent
}

