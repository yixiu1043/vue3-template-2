import { generateRequestId } from '@/utils'
import { useAppStore } from '@/stores/app.store'
import { useSocketStore } from '@/stores/socket.store'
import { putRequestId } from '@/services/message-service'

/** 进入游戏 */
const enterGame = () => {
  const app = useAppStore()
  const message = {
    action: 'enter_game',
    gameId: app.currentGameId,
    requestId: generateRequestId(),
  }

  const socket = useSocketStore()
  const map = new Map(Object.entries(message))
  putRequestId(map)
  socket.send(JSON.stringify(message))
}

/** 获取用户信息 */
const getUserInfo = () => {
  const app = useAppStore()
  const message = {
    action: 'get_user_info',
    gameId: app.currentGameId,
    requestId: generateRequestId(),
  }
  const socket = useSocketStore()
  const map = new Map(Object.entries(message))
  putRequestId(map)
  socket.send(JSON.stringify(message))
}

/** 下注 */
const betting = (round: string, items: Map<any, any>[]) => {
  const app = useAppStore()

  const message = {
    action: 'normal_bet',
    gameId: app.currentGameId,
    requestId: generateRequestId(),
    round: round,
    items: items,
  }
  const socket = useSocketStore()
  const map = new Map(Object.entries(message))
  putRequestId(map)
  socket.send(JSON.stringify(message))
}

export { enterGame, getUserInfo, betting }
