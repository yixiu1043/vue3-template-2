import type {
  IWebSocketBean,
  IWebSocketBeanParam,
  IWebSocketReconnect,
} from '../typings'
import WebSocketHeart from './web-socket-heart'
import WebSocketReconnect from './web-socket-reconnect'
import { WebSocketStatusEnum } from './web-socket-status-enum'

/**
 * WebSocket封装类
 * @param 封装了心跳机制 、重连机制
 */
export default class WebSocketBean implements IWebSocketBean {
  status: WebSocketStatusEnum = null as any
  websocket: WebSocket = null as any
  heart: WebSocketHeart = null as any
  reconnect: IWebSocketReconnect = null as any
  param: IWebSocketBeanParam

  constructor(param: IWebSocketBeanParam) {
    this.param = param
  }

  onopen = async () => {
    //开启心跳
    this.heart.start()

    //通知连接成功或重连成功
    this.reconnect.stop()

    //调用生命周期
    if (this.param.onopen) await this.param.onopen()

    //修改状态为已连接
    this.status = WebSocketStatusEnum.open
  }

  onmessage = (ev: MessageEvent<any>) => {
    //调用生命周期
    if (this.param.onmessage) this.param.onmessage(ev)

    this.heart.onmessage(ev.data)
  }

  onerror = (ev: Event) => {
    //调用生命周期
    if (this.param.onerror) this.param.onerror(ev)
    //销毁对象
    this.close()
    //开始重连
    this.reconnect.start()
  }

  start = (param?: IWebSocketBeanParam) => {
    //如果已经创建先关闭
    this.close()

    //使用新配置或者老配置
    if (param) this.param = param
    else param = this.param

    //创建连接
    this.websocket = new WebSocket(param.url)

    //修改状态为加载中
    this.status = WebSocketStatusEnum.load

    //绑定连接成功事件
    this.websocket.onopen = this.onopen
    //绑定消息接收事件
    this.websocket.onmessage = this.onmessage
    //绑定连接异常事件
    this.websocket.onerror = this.onerror
    //绑定连接关闭事件
    this.websocket.onclose = this.onerror

    //创建心跳
    this.heart = new WebSocketHeart(this)

    //创建重连，如果存在则跳过
    if (this.reconnect === null) this.reconnect = new WebSocketReconnect(this)

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.addEventListener('beforeunload', this.dispose)
  }

  /**
   * 发送数据
   * @param data 数据对象，Object、Array、String
   */
  send(data: any) {
    return this.websocket.send(data)
  }

  /**
   * 关闭socket，销毁绑定事件、心跳事件、窗口关闭事件，修改状态为已关闭
   */
  close = () => {
    if (this.websocket === null) return
    window.removeEventListener('beforeunload', this.dispose)
    //销毁绑定事件，关闭socket
    if (this.websocket) {
      this.websocket.onerror = null
      this.websocket.onmessage = null
      this.websocket.onclose = null
      this.websocket.onopen = null
      this.websocket.close()
      this.websocket = null as any
    }
    //销毁心跳事件
    if (this.heart) {
      this.heart.stop()
      this.heart = null as any
    }

    //修改状态为已关闭
    this.status = WebSocketStatusEnum.close
  }

  /**
   * 销毁所有对象
   */
  dispose = () => {
    this.close()
    if (this.reconnect) {
      this.reconnect.stop()
      this.reconnect = null as any
    }
  }
}
