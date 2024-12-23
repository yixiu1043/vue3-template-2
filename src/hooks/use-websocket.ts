import type { IWebSocketBeanParam } from '@/websocket'
import { WebSocketBean, WebSocketStatusEnum } from '@/websocket'
import { useAppStore } from '@/stores/app.store'

export default function useWebSocket(options = {}) {
  const app = useAppStore()
  const wsUrl = `ws://im.hey-dev.net/websock/open?token=${app.token}&cipher=true&type=mode2`

  const DEFAULT_OPTIONS: IWebSocketBeanParam = {
    // binaryType: "arraybuffer" | "blob",
    binaryType: 'arraybuffer',
    url: wsUrl,
    needReconnect: true,
    reconnectGapTime: 2000,

    heartSend: 'ping',
    heartGet: 'pong',
    heartGapTime: 10 * 1000,
    onopen: async () => {
      onopen()
    },
    onmessage: (data: MessageEvent<any>) => {
      //在这里写消息处理逻辑
      onmessage(data)
    },
    onerror: (err: Event) => {
      onerror(err)
    },
  }

  const state = {
    options: { ...DEFAULT_OPTIONS, ...options },
    socket: {} as WebSocketBean,
  }

  // 连接状态
  // const status = ref(WebSocketStatusEnum.close)
  const status = computed(() => {
    return state.socket.status
  })
  const message = ref(null)
  const error = ref<null | string>(null)
  const isLogin = ref(true)

  // 连接
  const connect = () => {
    state.socket = new WebSocketBean(state.options)
    state.socket.start()
    // status.value = state.socket.status
  }

  const onopen = () => {
    // status.value = state.socket.status
    error.value = null
  }

  const onmessage = (messageEvent: MessageEvent<any>) => {
    console.log('---onmessage--', messageEvent.data)
    message.value = messageEvent.data
  }

  const onerror = (errorEvent: Event) => {
    console.log('断开')
    // status.value = state.socket.status
    error.value = errorEvent.toString()
  }

  // const onclose = () => {
  //   status.value = state.socket.status
  // }

  const send = (message: string) => {
    state.socket.send(message)
  }

  // 断开
  const disconnect = () => {
    state.socket.close()
  }

  watchEffect(() => {
    // 检测登录后就发起连接，退出后断开连接
    if (isLogin.value) {
      connect()
      console.log('---connect---')
    } else {
      disconnect()
    }
  })

  return {
    status,
    message,
    error,
    connect,
    send,
    disconnect,
  }
}
