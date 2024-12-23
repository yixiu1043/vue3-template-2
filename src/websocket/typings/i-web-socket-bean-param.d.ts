/**
 * 参数信息
 */
export interface IWebSocketBeanParam {
  /**
   * 连接地址
   */
  url: string

  /**
   * 传输协议
   */
  binaryType: BinaryType

  /**
   * 发送消息前缀，默认为空
   */
  sendPrefix?: string

  /**
   * 发送消息后缀，默认为空
   */
  sendSuffix?: string

  /**
   * 接收消息前缀，默认为空
   */
  messagePrefix?: string

  /**
   * 接收消息后缀，默认为空
   */
  messageSuffix?: string

  /**
   * 生命周期-在建立连接以后首先调用
   */
  onopen?: () => Promise<any>

  /**
   * 生命周期-在获取到数据以后首先调用
   */
  onmessage?: (ev: MessageEvent<any>) => any

  /**
   * 生命周期-在关闭或者连接异常以后首先调用
   */
  onerror?: (ev: Event) => void

  /**
   * 生命周期-在重连开始以后首先调用
   */
  onreconnect?: () => void

  //重连参数列表

  /**
   * 最大重连次数，默认为10次
   */
  reconnectMaxNum?: number

  /**
   * 重连间隔时间，默认为30000
   */
  reconnectGapTime?: number

  /**
   * 是否需要重连，默认为false
   */
  needReconnect?: boolean

  /**
   * 重连失败通知
   */
  onFailReconnect?: () => void

  //心跳参数列表

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
  heartGapTime?: number

  /**
   * 心跳无响应上限，默认为10
   */
  heartFailNum?: number
}
