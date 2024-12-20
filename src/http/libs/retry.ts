import axios, { Axios, AxiosError, type AxiosAdapter, type RetryOptions } from 'axios'

function _default(error: AxiosError) {
  if (axios.isAxiosError(error)) {
    return error.code === AxiosError.ECONNABORTED || error.response?.status! >= 500
  }
  return false
}

const defaultOption: RetryOptions = {
  retryLimit: 0,
  retryDelay: 3000,
  retryShould: _default,
}

export default function retryAdapter(instance: Axios, option: RetryOptions = {}): typeof instance {
  const $option = Object.assign({}, defaultOption, option) as Required<RetryOptions>

  const adapter = instance.defaults.adapter as AxiosAdapter

  //@ts-ignore
  instance.defaults.adapter = async function (config) {
    
    const limit = config.retryLimit ?? $option.retryLimit
    console.log(limit);
    const should = config.retryShould ?? $option.retryShould
    const delay = config.retryDelay ?? $option.retryDelay
    let index = -1

    do {
      index++

      try {
        return await adapter(config)
      } catch (error: any) {
		
        if (index === limit || !should(error)) return Promise.reject(error)
        await new Promise((resolve) => {
          setTimeout(resolve, typeof delay === 'function' ? delay(index) : delay)
        })
      }
    } while (limit === -1 || index < limit)
  }

  return instance
}
