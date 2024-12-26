import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from './app.store'
import { useSocketStore } from '@/stores/socket.store'
const pinia = createPinia()

export function store(app: App) {
  app.use(pinia)

  app.config.globalProperties.$stores = {
    app: useAppStore(),
    socket: useSocketStore(),
  }
}

// export default stores

export interface Stores {
  app: ReturnType<typeof useAppStore>
  socket: ReturnType<typeof useSocketStore>
}
