import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import server from './build/server'
import build from './build/build'
import optimize from './build/optimize'
import plugins from './build/plugins'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: '/',
    plugins: plugins(mode, command),
    optimizeDeps: optimize,
    server,
    build: build(command),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
