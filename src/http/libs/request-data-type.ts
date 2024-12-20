import { Axios } from 'axios'

export default function requestDataType(axios: Axios) {
  axios.interceptors.request.use(function convert(config) {
    // 这里处理了formData、form、json三种数据类型的转换
    if (config.dataType === 'formData') {
      config.headers.setContentType('multipart/form-data')
    }
    if (config.dataType === 'form') {
      config.headers.setContentType('application/x-www-form-urlencoded;charset=utf-8')
    }

    return config
  })
}
