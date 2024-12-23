import { getAppConfig } from '@/apis'
import type { Kiwi } from '@/model'

export const useExampleStore = defineStore('example', {
  state: () => ({
    kiwi: {} as Kiwi,
  }),
  getters: {},
  actions: {
    async fetchAppConfig() {
      const { kiwi } = await getAppConfig({
        channelId: 3,
      })
      this.kiwi = kiwi
      console.log('kiwi', kiwi)
      console.log('kiwi', kiwi.kiwiDownload1)
    },
  },
})
