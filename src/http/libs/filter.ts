import type { AxiosRequestConfig } from 'axios'
import { Axios } from 'axios'

type Filter = typeof $filter

const invalidValues = [null, undefined, '', NaN, Infinity, -Infinity]

function $filter(value: any) {
  if (invalidValues.includes(value)) return true
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0

  return false
}

function filters(entries: any, f: Filter) {
  if (!entries || typeof entries !== 'object') return entries
  Object.keys(entries).forEach((key) => {
    if (f(entries[key])) {
      delete entries[key]
    }
  })
  return entries
}

/**
 * default: null, undefined, '', NaN, Infinity, -Infinity [] {}
 * @param axios
 * @param option
 */
export default function filter(
  axios: Axios,
  option: {
    ignore?: (config: AxiosRequestConfig) => boolean
    handle?: Filter
  } = {},
) {
  const { ignore = () => false, handle = $filter } = option

  axios.interceptors.request.use(function (config) {
    if (ignore(config)) return config

    config.params = filters(config.params, handle)
    config.data = filters(config.data, handle)
    return config
  })
}
