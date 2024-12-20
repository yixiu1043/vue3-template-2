import type { Directive as VueDirective } from 'vue'

export interface DirectiveElement extends HTMLElement {
  __handler__: () => any
}

// 指令名转小写
// type LowerDirectiveName<T extends Keys> = T extends `v${infer V}` ? Lowercase<V> : never

// // 指令对象类型
// export interface DirectiveOptions<T extends Keys> {
//   name: LowerDirectiveName<T>
//   directive: Directives[T]
// }

// export type Keys = keyof Directives

export type Directive<T extends DirectiveElement = DirectiveElement, V = any> = VueDirective<
  T,
  V
> & { name: string }

export interface Directives {
  vInOutView: typeof import('./in-out-view')
  vClipboard: typeof import('./clipboard')
  vAuth: typeof import('./auth')
}
