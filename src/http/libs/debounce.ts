import type { AxiosAdapter } from 'axios';
import { Axios, type AxiosResponse } from 'axios'

/** 
 * 请求节流，
 * 指定的一段时间重复请求时，只保留最旧的请求，请求完成后再全部返回相同结果
 * 不能和throttle同时使用
 *  */
export default function debounce(instance: Axios, duration: number) {
  const store: Record<number, { timestamp: number; func: Function[] }[]> = {}
  const adapter = instance.defaults.adapter as AxiosAdapter

  instance.defaults.adapter = function (config) {
    const id = config.__id__
    const now = Date.now()
    store[id] ||= []
    const queue = store[id].find((i) => i.timestamp + duration <= now)
    if (queue) {
      return new Promise((resolve) => {
        queue.func.push((response: AxiosResponse) => {
          resolve(response)
        })
      })
    }

    return adapter(config).then((response) => {
      const queue = store[id].find((i) => i.timestamp + duration <= now)
      while (queue && queue.func.length) {
        queue.func.shift()!(response)
      }
      delete store[id]
      return response
    })
  }
}
