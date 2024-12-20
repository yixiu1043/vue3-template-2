import { BuildOptions } from 'vite'
const option = (command: string): BuildOptions => {
  return {
    // outDir:'activity',
    assetsDir: '/',
    rollupOptions: {
      // external: ['vue', 'vue-router', 'pinia']
      input:
        command === 'build'
          ? {
            index: process.cwd() + '/index.html',
            // roulette: process.cwd() + '/roulette/index.html',
            // luckyDraw: process.cwd() + '/lucky-draw/index.html',
          }
          : undefined,
      output: {
        // dir: 'activity',
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        // experimentalMinChunkSize: 200 * 1024,
        manualChunks(id: string, module) {
          const name = ['three', 'fingerprintjs', 'tsparticles'].find((i) => id.includes(i))
          if (name) {
            return name
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  }
}

export default option
