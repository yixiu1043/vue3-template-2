// src/store/plugin/modules/persistedstate.ts
// 参考地址：https://prazdevs.github.io/pinia-plugin-persistedstate/guide/
import { createPersistedState } from 'pinia-plugin-persistedstate'
import AES from 'crypto-js/aes'
import utf8 from 'crypto-js/enc-utf8.js'
import hex from 'crypto-js/enc-hex.js'
import base64 from 'crypto-js/enc-base64.js'

const seed = 'aranaplus day day up'
const key = utf8.parse(seed) //16位
const iv = utf8.parse(seed)
/**
 * pinia 全局持久化配置，会覆盖默认配置，但也会被单个store的persist配置覆盖
 */

const option: Parameters<typeof createPersistedState>[number] = {
  storage: sessionStorage,
  beforeRestore: (context) => {
    console.log(context)
    return context
  },
  afterRestore: (context) => {
    console.log(context)
    return context
  },
}

if (import.meta.env.PROD) {
  // 设置序列化，生产加密，开发采用默认不加密
  option.serializer = {
    serialize(value: object) {
      const encrypted = AES.encrypt(JSON.stringify(value), key, {
        iv: iv,
      })
      return encrypted.ciphertext.toString()
    },
    deserialize(value: string) {
      const encryptedHexStr = hex.parse(value)
      const srcs = base64.stringify(encryptedHexStr)
      const decrypt = AES.decrypt(srcs, key, {
        iv: iv,
      })
      return JSON.parse(decrypt.toString(utf8))
    },
  }
}

export default createPersistedState(option)
