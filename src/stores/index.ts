import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from './app.store'
const pinia = createPinia()

export function store(app: App) {
  app.use(pinia)

  app.config.globalProperties.$stores = {
    app: useAppStore(),
  }
}

// export default stores

export interface Stores {
  app: ReturnType<typeof useAppStore>
}
