//AF接入

import { useAppStore } from '@/stores/app.store'
import type { Axios } from 'axios'

export default function AFEventTracking(instance: Axios) {
  instance.defaults.headers.common = {
    ...instance.defaults.headers.common,
    container: 'BROWSER',
    idfv: '',
    package: '',
    afAppId: 'web-arenaplus.net',
    platform: 'H5',
  }

  instance.interceptors.request.use(function $af(config) {
    config.headers['appsFlyerId'] = useAppStore().afUserId
    return config
  })
}
