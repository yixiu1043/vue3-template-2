import loader from '@/components/loading/loading'
import { Http, loading, errors, filter, throttle, replacePathVars, convert, retry } from '@/http'
export { Polling } from '@/http'
import encrypt from './encryption'
import response from './response'
import request from './request'
import AFEventTracking from './af-event-tracking'
import web from '@/const/web.const'
import errorsOption from './errors'

const http = new Http({
  baseURL: web.apiNamespace,
  timeout: web.timeout,
  loading: false, // 是否loading，默认不loading
  silent: true, // 是否抛出错误toast提示，，默认不提示
})

let close: VoidFunction
http.use(replacePathVars)
http.use(filter)
http.use(throttle)
http.use(convert)
http.use(encrypt)
http.use(errors, errorsOption)
http.use(response)
http.use(AFEventTracking)
http.use(request)
http.use(retry)
http.use(loading, {
  toggle(showing, config) {
    if (showing) {
      close = loader()
    } else {
      close?.()
    }
  },
})

const { get, post } = http.createMethods('get', 'post')

export { get, post }

export default http
