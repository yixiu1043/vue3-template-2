import webConst from '@/const/web.const'
import { random } from 'lodash-es'
import  MD5 from 'crypto-js/md5'

const range = (count = 6) => [...Array(count)].map((_) => random(9, false)).join('')

const getQid = () => MD5(Date.now() + range()).toString()

export const sort = (text: string | Object) => {
  return JSON.stringify(text).split('').sort().reverse().join('')
}

export default function sign(data: Object, token?: string, u2token?: string) {
  const qid = getQid()
  let s = sort(data) + qid + webConst.appid + webConst.v
  if (token && u2token) {
    s += token + u2token
  }
  return {
    qid,
    sign: MD5(s).toString(),
  }
}
