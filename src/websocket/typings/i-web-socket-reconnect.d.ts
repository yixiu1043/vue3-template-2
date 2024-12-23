import type { IWebSocketBean } from './i-web-socket-bean'

/**
 * 重连
 */
export interface IWebSocketReconnect {
  /**
   * 开启状态
   */
  status: boolean
  /**
   * WebSocketBean对象
   */
  websocketbean: IWebSocketBean

  /**
   * 当前重连次数
   */
  num: number

  /**
   * 最大重连次数，默认为10次
   */
  reconnectMaxNum: number

  /**
   * 重连间隔时间
   */
  reconnectGapTime: number

  /**
   * 开始尝试重连
   */
  start: () => void

  /**
   * 关闭重连
   */
  stop: () => void
}

interface Window {
  [key: string]: any
}
