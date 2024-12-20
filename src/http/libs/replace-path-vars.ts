import { Axios } from 'axios'

// 查找路径参数，支持 user/:id user/{id} user/[id]/ 三种模式
const regexp = /\[([^\]]+)\]|\{([^\\}]+)\}|:([^\\/]+)/g

/** 接口路径参数支持
 *
 * 	axios.post('url/:var1/{var2}/[var3]',{data:{var1:'user',var2:'update',var3:'id',name:'lisa'}}))
 *
 *  --> axios('url/user/update/id',{data:'lisa'})
 */
export default function replacePathVars(axios: Axios) {
  axios.interceptors.request.use(function _replacePathVars(config) {
    config.url = config.url!.replaceAll(regexp, (a, b, c, d) => {
      const name = b || c || d
      if (!name) return a

      let value = config.params?.[name]
      if (value !== undefined) {
        delete config.params![name]
        return value
      }

      value = config.data?.[name]
      if (value !== undefined) {
        delete config.data![name]
        return value
      }

      return a
    })
    return config
  })
}
