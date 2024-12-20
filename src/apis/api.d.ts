declare module 'axios' {
  export interface AxiosRequestConfig {
    /** 需要加密的字段 */
    encrptedFields?: string | string[] | ((config: AxiosRequestConfig) => string)
  }
}

export {}
