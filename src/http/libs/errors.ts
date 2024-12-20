import type { AxiosError } from 'axios'
import { Axios, type AxiosResponse } from 'axios'
import { getByMaybeFunction } from './utils'

/** 用于将message转为id，防止重复提示消息
 * example:
 * const id = toIntId("message");
 * if( exsit(id) ) return;
 * alert(message)
 */
export { hashCode } from './utils'

type ErrorHandler = (error: AxiosResponse | AxiosError) => string | boolean | void
type Errors = Record<'timeout' | 'unknown' | number | (string & {}), string | ErrorHandler>

export type ErrorsOption = {
  /**
   * 如果是函数，返回值如下：
   * string = 抛出错误信息
   * true = 抛出默认信息+错误码
   * false|undefined = 不抛出信息
   */

  errors: Omit<Errors, 'timeout'> & Partial<Pick<Errors, 'timeout'>>
  /**
   * errors中未匹配到的错误信息会执行 fallback 函数
   * 常用于处理业务错误
   */
  postHandle: ErrorHandler
  /**
   * 抛出错误信息的函数
   * @message 错误信息
   *  */
  showMessage?: (message: string) => any
  /**
   * 业务代码校验，过滤出正确的业务状态码
   * @returns true
   * 表示正确，进入then回调
   * @returns false
   * 表示错误, 进入reject回调
   * @returns string|number
   * 表示错误, 进入错误处理函数(返回值作为key)和reject回调
   * @param response
   * axios完整的响应体
   */
  preHandle: (response: AxiosResponse) => boolean | string | number
}

export default function errors(instance: Axios, option: ErrorsOption) {
  const { errors } = option

  function getMessage(code: keyof typeof errors, error: any) {
    const maybeFunc = errors[code] || errors['unknown']
    const message = typeof maybeFunc === 'function' ? maybeFunc(error) : maybeFunc

    return message
  }

  instance.interceptors.response.use((response) => {
    const result = option.preHandle(response)
    if (result === true) return response
    //@ts-ignore
    response.___statusCode__ = result
    throw response
  })

  instance.interceptors.response.use(null, (error) => {
    let msg: string | boolean | void

    if (error.___statusCode__) {
      msg = getMessage(error.___statusCode__ as any, error)
    } else if (error.response) {
      // console.log("请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围");
      msg = getMessage(error.response.status as any, error)
    } else if (error.request) {
      //console.log("请求已经成功发起，但没有收到响应");
      msg = getMessage('timeout', error)
    } else {
      //console.log("发送请求时出了点问题");
      msg = getMessage(400, error)
    }

    // 非静默接口，抛出异常

    if (getByMaybeFunction(error.config!.silent) !== true) {
      if (typeof msg === 'string') {
        error.realMessage = msg
        option.showMessage?.(msg)
      } else {
        const _message = error.message + (error.response?.status ?? error.code)
        error.realMessage = _message

        if (msg === true) {
          option.showMessage?.(_message)
        }
      }
    }

    option.postHandle(error)

    return Promise.reject(error)
  })
}
