export function on<T extends EventTarget, U extends Parameters<T['addEventListener']>>(
  el: T,
  ...args: U
) {
  //@ts-ignore
  el.addEventListener(...args)
  return () => {
    off()
  }
}
export function off() {}
