import type { Axios } from 'axios'
import { toCamelCase } from '@/utils/transform-data'

export default function response(instance: Axios) {
  instance.interceptors.response.use(function $response(response) {
    // console.log('response', response.data.data);
    return toCamelCase(response.data.data)
    // return response.data.body // mock api
  })
}
