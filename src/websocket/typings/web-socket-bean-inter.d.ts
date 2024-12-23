/**
 * WebSocket封装类
 * @param 封装了心跳机制 、重连机制
 */
interface WebSocketBeanInter {
  status: WebSocketStatusEnum
  websocket: WebSocket
  heart: IWebSocketHeart
  reconnect: IWebSocketReconnect
  param: IWebSocketBeanParam
  onopen: () => Promise<void>
  onmessage: (ev: MessageEvent<any>) => void
  onerror: () => void
  start: (param?: IWebSocketBeanParam) => void
  hiddenReconnectVisibility: () => void
  hiddenReconnect: boolean
  /**
   * 发送数据
   * @param data 数据对象，Object、Array、String
   */
  send: (data: any) => Promise<void>
  /**
   * 关闭socket，销毁绑定事件、心跳事件、窗口关闭事件，修改状态为已关闭
   */
  close: () => void
  /**
   * 销毁所有对象
   */
  dispose: () => void
}

interface WebSocketBeanObj {
  new (param: IWebSocketBeanParam): WebSocketBeanInter
}

declare let WebSocketBean: WebSocketBeanObj

declare enum WebSocketStatusEnum {
  /**
   * 创建中
   */
  load = 0,
  /**
   * 已连接
   */
  open = 1,
  /**
   * 已关闭
   */
  close = 2,
}

/**
 * 将数据类型转换为字符串
 * @param data  返回数据类型、原数据、处理后的字符串
 * @returns
 */
declare function dataToStr(data: any): Promise<{
  type: 'string' | 'blob' | 'arraybuffer' | 'object'
  /**
   * 处理后的字符串
   */
  str: string
  /**
   * 原数据
   */
  data: any
}>

/**
 * 在数据前后添加指定字符串并返回原始数据类型
 * @param str
 * @param type
 * @param prefix
 * @param suffix
 * @returns
 */
declare function addStrToData(
  str: string,
  type: string,
  prefix?: string,
  suffix?: string,
): Promise<string | Blob | ArrayBuffer>
