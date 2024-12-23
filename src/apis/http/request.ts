import web from '@/const/web.const'
import type { Axios } from 'axios'
import { useAppStore } from '@/stores/app.store'
import { toSnakeCase } from '@/utils/transform-data'

const _withoutWebToken = ['/webToken', '/getH5TokenByTempTicket']
const withoutWebToken = (url: string) => !_withoutWebToken.includes(url)

export default function request(instance: Axios) {
  instance.defaults.headers.common = {
    ...instance.defaults.headers.common,
    appId: web.appid,
    domainName: location.hostname.replace('www.', ''),
    v: web.v,
    deviceid: web.deviceId,
    platform: 'H5',
  }

  instance.interceptors.request.use(async function $commonParams(config) {
    const app = useAppStore()

    config.headers.set('Content-Type', 'application/json; charset=utf-8')
    config.headers.set('Channel', app.channelId)
    config.headers.set('token', app.token)
    config.headers.set('language', app.language)
    config.headers.set('Platform', app.platform)
    config.headers.set('Client-Version', app.currentAppVersion)

    config.data = toSnakeCase(config.data)
    config.params = toSnakeCase(config.params)

    return config
  })
}
