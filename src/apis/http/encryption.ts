import type { Axios } from 'axios'
import web from '@/const/web.const'
import { isEmpty, isFunction } from 'lodash-es'
import type { JSEncrypt } from 'jsencrypt'

let encryptor: JSEncrypt
async function load() {
  const JSEncrypt = await import('jsencrypt')
  const encryptor = new JSEncrypt.JSEncrypt()
  encryptor.setPublicKey(web.webkey)
  return encryptor
}

export default function encrypt(axios: Axios) {
  axios.interceptors.request.use(
    async function encryptRequset(config) {
      const fields = config.encrptedFields
      if (isFunction(fields)) {
        config.data = fields(config)
      } else {
        encryptor ||= await load()
        const data = config.data
        if (typeof fields === 'string' && data[fields]) {
          data[fields] = encryptor.encrypt(data[fields])
        } else if (Array.isArray(fields)) {
          fields.forEach((field) => {
            data[field] = encryptor.encrypt(data[field])
          })
        }
      }
      return config
    },
    undefined,
    {
      runWhen({ encrptedFields: fields, data }) {
        return (isFunction(fields) || !isEmpty(fields)) && !isEmpty(data)
      },
    },
  )
}
