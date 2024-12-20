import axios, { AxiosInterceptorManager } from 'axios'
import { RetryOptions } from '../src/lib/retry'
import type { noop } from '../src/lib/utils'

declare module 'axios' {
  export interface AxiosStatic {
    mergeConfig: any
  }

  export interface RetryOptions {
    /** 最大重试次数，0-不重试 -1-不限次数  */
    retryLimit?: number
    retryDelay?: number | ((index: number) => number)
    retryShould?(error: AxiosError): boolean
  }

  export interface AxiosRequestConfig
    extends RetryOptions,
      Partial<{
        cancelable: boolean
        repeatable: boolean
        loading: boolean
        retryLimit: number
        retryDelay: number
        cache: boolean
        dataType: 'jsonp' | 'script' | 'json' | 'form' | 'formData'
        jsonpCallback: string
        poillingInterval: number
        poillingInterval: number
        strictMode: boolean
        silent: boolean | ((result: AxiosError | AxiosResponse) => boolean)
        blockedWhenunauthenticated: boolean
        retryShould: (error: AxiosError) => boolean
        retokenShould(err: AxiosError): boolean
        extra: Record<string | number, any>
      }> {
    readonly __id__: number
    readonly __abort__: typeof noop
  }
  export type AxiosRequestConfigLess = Omit<AxiosRequestConfig, '__id__' | '__abort__'>
}

type Functionable<T> = T | ((...args: any[]) => any)
