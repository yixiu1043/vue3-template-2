import type { IWebSocketHeart } from './i-web-socket-heart'
import type { IWebSocketReconnect } from './i-web-socket-reconnect'
import type { IWebSocketBeanParam } from './i-web-socket-bean-param'

export interface IWebSocketBean {
  /**
   * 连接状态
   */
  status: number

  /**
   * WebSocket对象
   */
  websocket: WebSocket

  /**
   * 心跳对象
   */
  heart: IWebSocketHeart

  /**
   * 重连对象
   */
  reconnect: IWebSocketReconnect

  /**
   * 参数信息
   */
  param: IWebSocketBeanParam

  /**
   * 关闭旧连接创建新连接
   * @param param
   * @returns
   */
  start: (param?: IWebSocketBeanParam) => void

  /**
   * 发送数据
   * @param data 数据对象，Object、Array、String
   */
  send(data: any): void

  /**
   * 异常操作绑定
   */
  onerror: (ev: Event) => void

  /**
   * 关闭socket，销毁绑定事件、心跳事件、窗口关闭事件，修改状态为已关闭
   */
  close: () => void

  /**
   * 销毁所有对象
   */
  dispose: () => void
}
