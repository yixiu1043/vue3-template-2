import type { App } from 'vue'
import type { Directive } from './types'
import { Lazyload } from 'vant'

const directives = import.meta.glob('./*/index.ts', { eager: true })

export default function (app: App) {
  //@ts-ignore
  Object.values(directives).forEach(({ default: directive }) => {
    app.directive(directive.name, directive)
  })

  app.use(Lazyload, {
    lazyComponent: true,
  })
}
