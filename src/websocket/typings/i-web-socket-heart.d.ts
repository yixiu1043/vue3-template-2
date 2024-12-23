/**
 * 心跳
 */
export interface IWebSocketHeart {
  /**
   * 启动心跳
   * @returns
   */
  start: () => void

  /**
   * 关闭心跳
   * @returns
   */
  stop: () => void

  /**
   * 心跳发送内容，默认为heartSend
   */
  heartSend?: string | ((param: IWebSocketBeanParam) => any)

  /**
   * 心跳接收内容，默认为heartGet
   */
  heartGet?: string | ((param: IWebSocketBeanParam, data: any) => any)

  /**
   * 心跳发送间隔时间，默认为30000
   */
  heartGapTime: number

  /**
   * 心跳无响应次数
   */
  failNum: number

  /**
   * 心跳无响应上限，默认为10
   */
  heartFailNum: number

  /**
   * WebSocketBean对象
   */
  websocketbean: IWebSocketBean

  /**
   * 获取心跳信息
   * @param ev
   * @returns
   */
  onmessage: (ev: any) => any
}
