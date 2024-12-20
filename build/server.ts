import { ServerOptions } from 'vite'

const option: ServerOptions = {
  host: '0.0.0.0',
  port: 8081,
  proxy: {
    '/api': {
      // target: 'http://10.33.17.40:8081/api', // mock 本地
      target: 'http://im.hey-dev.net',
      changeOrigin: true,
      rewrite(path) {
        return path.replace(/^\/api/, '')
      },
    },
  },
}

export default option
