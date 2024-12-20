type Then<R> = Parameters<Promise<R>['then']>
type Catch<R> = Parameters<Promise<R>['catch']>[0]
type Finally<R> = Parameters<Promise<R>['finally']>[0]

type Option = {
  retry?: number
  retryAfter?: 'then' | 'catch' | 'finally'
  interval?: number
}

export default class Polling<
  R extends any,
  Q extends Array<any> = Array<any>,
  M extends Then<R> = Then<R>,
> {
  count = 0
  running = false
  option: Required<Option> = {
    retry: 0,
    retryAfter: 'catch',
    interval: 3000,
  }

  private timer = 0
  private stacks: (
    | { type: 1; callee: M }
    | { type: 2; callee: Catch<R> }
    | { type: 3; callee: Finally<R> }
    | { type: 4; callee: Finally<R> }
  )[] = []

  constructor(
    public excutor: (...args: Q) => Promise<R>,
    option?: Option,
  ) {
    Object.assign(this.option, option)
    this.count = option?.retry ?? 0
  }

  then(...callbacks: M) {
    this.stacks.push({
      type: 1,
      callee: callbacks,
    })
    return this
  }

  catch(onrejected: Catch<R>) {
    this.stacks.push({
      type: 2,
      callee: onrejected,
    })
    return this
  }

  finally(onfinallied: Finally<R>) {
    this.stacks.push({
      type: 3,
      callee: onfinallied,
    })
    return this
  }

  compelete(oncompelete: Finally<R>) {
    this.stacks.push({
      type: 4,
      callee: oncompelete,
    })
    return this
  }

  start(...args: Q) {
    // clearTimeout 防止重复调用
    window.clearTimeout(this.timer)
    this.excute(...args)
    return this
  }

  stop() {
    this.running = false
    window.clearTimeout(this.timer)
    return this
  }

  private excute(...args: Q) {
    this.running = true
    let promise = this.excutor(...args)
    
    this.stacks.forEach((stack) => {
      if (stack.type === 1) {
        promise = promise.then(...stack.callee as any)
      } else if (stack.type === 2) {
        promise = promise.catch(stack.callee) as any
      } else if (stack.type === 3) {
        promise = promise.finally(stack.callee)
      }
    })

    promise = promise.finally(() => {
      if (!this.running) return promise
      if (this.count-- <= 0) {
        this.stacks.forEach((stack) => {
          if (stack.type === 4) {
            stack.callee?.()
          }
        })
      } else {
        this.timer = window.setTimeout(() => {
          this.excute(...args)
        }, this.option.interval)
      }
      //   return promise
    })
  }
}
