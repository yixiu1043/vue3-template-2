export interface MiniAppResponse {
  apps: App[]
  count: number
  total: number
}

export interface App {
  description: string
  downloadUrl: string
  favoriteAt: number
  flag: number
  icon: string
  iconGaussian: string
  id: number
  lastLoginAt: number
  miniappCreatedAt: number
  name: string
  screen: string
  sessionCreatedAt: number
  typ: number
  version: number
}
