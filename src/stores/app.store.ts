import { defineStore } from 'pinia'
import localforage from 'localforage'

export const useAppStore = defineStore('app', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxMzczMDcsInVkaWQiOjI2NjMyMTMsInNpZCI6IjE3MzQzNDc3MDhBcExxR3c9PSIsImlzcyI6ImFiYy5jb20iLCJhdWQiOlsidXNlciJdLCJleHAiOjE3MzU1NTczMDgsIm5iZiI6MTczNDM0NzcwOCwiaWF0IjoxNzM0MzQ3NzA4fQ.0yCMATEIv3HyCDJ1_Se6uom__b21SaHxZNjEow96BPI'
  const channelId = 3
  const language = 'en'
  const platform = ''
  const currentAppVersion = ''
  const theme = ref('light')

  const initAppStore = async () => {
    theme.value = await localforage.getItem('THEME') ?? 'light'
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localforage.setItem('THEME', theme.value)
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
  }
})
