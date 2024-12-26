export interface GroupGameResponse {
  certified: number
  membersNum: number
  createTime: number
  games: Game[]
}

export interface Game {
  appId: string
  appName: string
  gameId: string
  gameName: string
  iconUrl: string
  gameUrl: string
  seq: number
  notify: number
  quick: number
  isDefault: number
}
