import type { AxiosAdapter } from 'axios'
import { Axios, type AxiosRequestConfig } from 'axios'

type Toggle = (showing: boolean, config: AxiosRequestConfig) => void

export default function loading(
  instance: Axios,
  option: {
    default?: boolean
    delay?: number
    toggle: Toggle
  },
) {
  let counter = 0

  const adapter = instance.defaults.adapter as AxiosAdapter

  instance.defaults.adapter = function (config) {
    const enable = config.loading !== false
    if (enable && counter++ === 0) {
      option.toggle(true, config)
    }

    return adapter(config).finally(() => {
      if (enable && --counter === 0) {
        option.toggle(false, config)
      }
    })
  }
}
