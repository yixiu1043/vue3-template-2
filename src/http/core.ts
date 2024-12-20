import axios, { Axios } from 'axios'
import type { Method, AxiosRequestConfig, AxiosRequestConfigLess, AxiosDefaults } from 'axios'
import { noop, getId } from './libs/utils'
import type { CreateAxiosDefaults } from 'axios'

type Methods = Lowercase<Method>
type Defaults = Omit<CreateAxiosDefaults, '__id__' | '__abort__'>
type Request<R = any, Q extends any = {}> = {
  (payload?: Q, configure?: AxiosRequestConfigLess): Promise<R>
  abort: Function
}

export default class Http {
  declare instance: Axios
  constructor(config?: Defaults) {
    this.instance = axios.create(config as CreateAxiosDefaults)
    this.instance.defaults.adapter = axios.getAdapter('xhr')
  }

  request<M extends Methods>(method: M, cfg: Omit<AxiosRequestConfigLess, 'method'> = {}) {
    const _this = this
    const field = ['get', 'delete', 'head', 'options'].includes(method) ? 'params' : 'data'

    return function facotry<R = any, Q = any>(
      url: string,
      config: Omit<AxiosRequestConfigLess, 'url'> = {},
    ): Request<R,Q> {
      config = axios.mergeConfig(cfg, config)
      config[field] = {
        ...cfg[field],
        ...config[field],
      }

      const request: Request<R> = (payload, configure = {}) => {
        let controller: AbortController | null = null
        const _payload = {
          ...config[field],
          ...payload,
          ...configure[field],
        }

        const final = axios.mergeConfig(config, {
          url,
          method,
          ...configure,
          [field]: _payload,
          __abort__: noop,
        }) as AxiosRequestConfig

        // 每次请求的唯一id
        ;(final as any).__id__ = getId(final)

        if (final.cancelable ?? true) {
          controller = new AbortController()
          final.signal = controller.signal
          request.abort = (final as any).__abort__ = controller.abort.bind(controller)
        }
        return _this.instance.request(final).finally(() => {
          request.abort = (final as any).__abort__ = controller = null as any
        }) as any
      }

      request.abort = noop

      return request as any
    }
  }

  createMethods<M extends Methods[]>(...methods: M) {
    return methods.reduce(
      (acc, method) => {
        acc[method as M[number]] = this.request(method)
        return acc
      },
      Object.create(null) as Record<M[number], ReturnType<typeof this.request>>,
    )
  }

  use<R>(plugin: (instance: Axios) => R): this
  use<T, R>(plugin: (instance: Axios, options: T) => R, options: T): this
  use<T, R>(plugin: (instance: Axios, options?: T) => R, options?: T): this {
    plugin(this.instance, options)
    return this
  }

  extend(config?: AxiosRequestConfigLess) {
    config = axios.mergeConfig(this.instance.defaults, config)
    const newer = new Http(config)
    newer.instance.interceptors = this.instance.interceptors

    return newer
  }
}
