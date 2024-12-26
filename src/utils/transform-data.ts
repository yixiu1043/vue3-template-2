import { isPlainObject, isArray, camelCase, snakeCase } from 'lodash-es'
/**
 * 递归遍历
 * @param value
 * @param map 执行函数
 * @returns
 */
function deepMapKeys(value: unknown, map: (key: string) => string): unknown {
  if (isPlainObject(value)) {
    const obj = value as Record<string, unknown>
    const newObj: any = {}
    for (const [key, val] of Object.entries(obj)) {
      newObj[map(key)] = deepMapKeys(val, map)
    }
    return newObj
  } else if (isArray(value)) {
    const array = value
    return array.map((val: unknown) => deepMapKeys(val, map))
  } else {
    return value
  }
}

/**
 * 转化为驼峰
 * @param value
 * @returns
 */
function toCamelCase(value: unknown): any {
  return deepMapKeys(value, (key: string) => camelCase(key))
}

/**
 * 转化为蛇形
 * @param value
 * @returns
 */
function toSnakeCase(value: unknown): any {
  return deepMapKeys(value, (key: string) => snakeCase(key))
}

/**
 * json转Map
 * @param jsonString
 * @returns
 */
function jsonToMap<K, V>(jsonString: string): Map<K, V> {
  const parsedData = JSON.parse(jsonString)

  if (Array.isArray(parsedData)) {
    // 如果是数组，直接作为键值对处理
    return new Map<K, V>(parsedData)
  } else if (typeof parsedData === 'object' && parsedData !== null) {
    // 如果是对象，将其转换为键值对数组
    return new Map<K, V>(Object.entries(parsedData) as [K, V][])
  } else {
    throw new Error('Invalid JSON format for Map conversion')
  }
}

/**
 * 递归遍历
 * object转Map
 * @param obj
 * @returns
 */
function deepObjectToMap(obj: any): Map<string, any> {
  return new Map(
    Object.entries(obj).map(([key, value]) => [
      key,
      value !== null && typeof value === 'object' ? deepObjectToMap(value) : value,
    ]),
  )
}

export { toCamelCase, toSnakeCase, jsonToMap, deepObjectToMap }
