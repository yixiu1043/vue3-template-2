import type { Axios } from 'axios'

export default function response(instance: Axios) {
  instance.interceptors.response.use(function $response(response) {
    console.log('response', response.data.data);
    return response.data.data
    // return response.data.body // mock api
  })
}
