import { Plugin } from 'vite'

export default function vantPlugin(): Plugin {
  return {
    name: 'vant',
    // apply: 'build', // 应用模式
    enforce: 'post', // 作用阶段
    generateBundle(_, bundle) {
      console.log(bundle)
      for (const key in bundle) {
        if (bundle[key]) {
          const chunk = bundle[key] // 拿到文件名对应的值
          // 判断+提取+移除
          if (chunk.type === 'asset' && chunk.fileName.includes('.css')) {
            console.log(chunk.source)
          }
        }
      }
    }
  }
}
