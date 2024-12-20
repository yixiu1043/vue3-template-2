const id = 'visitorId'

const web = {
  timeout: 30 * 1000,
  host: '/',
  productId: '3',
  appid: 'xxxH505',
  v: '1.0.0',
  webkey:
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  apiNamespace: '/api',
  deviceId: localStorage.getItem(id) || '',
}

if (!web.deviceId) {
  import('@fingerprintjs/fingerprintjs').then((module) => {
    module
      .load()
      .then((res) => res.get())
      .then((res) => {
        web.deviceId = res.visitorId
        localStorage.setItem(id, web.deviceId)
      })
  })
}

export default web
