import { amountize, monetise } from '@/utils'
import type { App } from 'vue'

export const filter = {
  amountize,
  monetise
}

export default function (app: App) {
  app.config.globalProperties.$filter = filter
}
