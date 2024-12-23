import { StringBuffer } from '@/utils/string-buffer'

const generateRequestId = (): string => {
  const currentTime: number = Date.now()
  const nonce: string = generateNonce(4)
  return `${currentTime}.${nonce}`
}

const generateRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min
}

const generateNonce = (length: number): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const buffer: StringBuffer = new StringBuffer()
  for (let i = 0; i < length; i++) {
    const random: number = generateRandomInt(0, chars.length)
    buffer.write(chars[random])
  }
  return buffer.toString()
}

export { generateRequestId, generateNonce }
