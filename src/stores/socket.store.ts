import { useAppStore } from '@/stores/app.store'
import type { IWebSocketBeanParam } from '@/websocket'
import { WebSocketBean, WebSocketStatusEnum } from '@/websocket'
import { handleMessage } from '@/services'

export const useSocketStore = defineStore('socket', () => {
  const app = useAppStore()

  const DEFAULT_OPTIONS: IWebSocketBeanParam = {
    // binaryType: "arraybuffer" | "blob",
    binaryType: 'arraybuffer',
    url: app.wsUrl,
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

  let socket = {} as WebSocketBean
  const status = ref(WebSocketStatusEnum.close)
  const message = ref(null)
  const error = ref<null | string>(null)
  const isLogin = ref(true)
  const isConnected = computed<boolean>(() => {
    return status.value === WebSocketStatusEnum.open
  })

  // 连接
  const connect = (options = {}) => {
    if (socket.websocket != null) {
      console.log('---dispose ---')
      socket.dispose()
    }
    socket = new WebSocketBean({ ...DEFAULT_OPTIONS, ...options })
    socket.start()
    status.value = socket.status
  }

  const onopen = () => {
    status.value = socket.status
    error.value = null
  }

  const onmessage = (messageEvent: MessageEvent<any>) => {
    console.log('---onmessage--', messageEvent.data)
    message.value = messageEvent.data
    try {
      if (messageEvent.data !== 'PONG') {
        handleMessage(messageEvent.data)
      }
    } catch (e) {
      console.error(`onmessage: parse data error--:${e}`)
    }
  }

  const onerror = (errorEvent: Event) => {
    console.log('断开')
    status.value = socket.status
    error.value = errorEvent.type
    console.log('errorEvent', errorEvent)
  }

  const send = (message: string) => {
    if (!isConnected) return
    socket.send(message)
  }

  // 断开
  const disconnect = () => {
    socket.dispose()
    status.value = socket.status
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
    socket,
    status,
    message,
    error,
    connect,
    send,
    disconnect,
    isConnected,
  }
})
