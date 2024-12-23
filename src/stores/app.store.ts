import { defineStore } from 'pinia'
import localforage from 'localforage'

export const useAppStore = defineStore('app', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxMzcwNjAsInVkaWQiOjI2NjE5OTUsInNpZCI6IjE3MzQ5NjA0NjM1VnJ3blE9PSIsImlzcyI6ImFiYy5jb20iLCJhdWQiOlsidXNlciJdLCJleHAiOjE3MzYxNzAwNjMsIm5iZiI6MTczNDk2MDQ2MywiaWF0IjoxNzM0OTYwNDYzfQ.qyFoVCxbnwiH3hAo9GhHkGWD35IWqSO3Q_6t9ozMwn0'
  const channelId = 3
  const language = 'en'
  const platform = ''
  const currentAppVersion = ''
  const chatId1 = 15768 // 毛坯房
  const chatId2 = 5668466 // 游戏体验反馈
  const userId = 2137060
  const accountId = '1713781455TDUP5r'
  const currentGameId = 'ks' // 先写死
  const wsUrl = `ws://im.hey-dev.net/websock/gameopen?platform=dongfangcaipiao&session_id=ZRAFgd51MrfqF1TTx3JstaZfWIGUPnXjpgcXzp5hca-mAkjLlTMu8w==`

  const theme = ref('light')

  const initAppStore = async () => {
    theme.value = await localforage.getItem('THEME') ?? 'light'
    // token = token
    // channelId = channelId
    // language = language
    // platform = platform
    // currentAppVersion = currentAppVersion
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localforage.setItem('THEME', theme.value)
  }

  const toggleGame = (game = {}) => {
    // currentGameId = game.gameId;
  }

  return {
    token,
    channelId,
    language,
    platform,
    currentAppVersion,
    theme,
    toggleTheme,
    initAppStore,
    wsUrl,
    currentGameId,
  }
})
