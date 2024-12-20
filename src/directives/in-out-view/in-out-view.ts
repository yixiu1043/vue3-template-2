import { watch, type App } from 'vue'
import { usePageVisibility } from '@vant/use'
import type { Directive, DirectiveElement } from '../types'
export type InOutViewCallback = (
  appear: boolean,
  el: Element,
  entry?: IntersectionObserverEntry,
) => void

interface ObservedElement extends DirectiveElement {
  __ob__: IntersectionObserver
  __entry__: IntersectionObserverEntry
}

const map = new Map<Element, InOutViewCallback>()
const pageVisibility = usePageVisibility()

watch(pageVisibility, (value) => {
  const hidden = value === 'hidden'
  for (const [el, f] of map.entries()) {
    const e = el as ObservedElement
    const state = hidden || !e.__entry__.isIntersecting
    f(state, el, e.__entry__)
  }
})

const handleObserve: IntersectionObserverCallback = (entries) => {
  for (const entry of entries) {
    ;(entry.target as ObservedElement).__entry__ = entry
    map.get(entry.target)?.(!entry.isIntersecting, entry.target, entry)
  }
}

const ob = new window.IntersectionObserver(handleObserve)

/** example */
/** v-in-out-view.root:parent.margin:20.throred:[1,2,3,...,10] */
/** v-in-out-view.root:parent.margin:20.throred:5 */
export default <Directive<ObservedElement, InOutViewCallback>>{
  name: 'in-out-view',
  mounted(el, { value, modifiers }) {
    map.set(el, value)
    const option = parse(modifiers)
    if (option) {
      ob.observe(el)
    } else {
      customObserver(el, option)
    }
  },
  updated(el, { value, modifiers }) {
    const option = parse(modifiers)
    map.set(el, value)
    if (option) {
      customObserver(el, option)
    }
  },
  unmounted(el, { value }) {
    map.delete(el)
    ob.unobserve(el)
    el.__ob__?.disconnect()
    value?.(true, el)
  },
}

function parse(modifiers: object): object | undefined {
  const keys = Object.keys(modifiers)
  if (keys.length === 0) return
  const acc = Object.create(null)
  for (const item of Object.keys(modifiers)) {
    //eslint-disable-next-line
    let [k, v] = item.split(':')
    if (k === 'threshold') v = v.includes('[') ? JSON.parse(v) : Number(v)
    acc[k] = v ?? true
  }
  return acc
}

function customObserver(el: ObservedElement, option: any = {}) {
  const ob = new window.IntersectionObserver(handleObserve, {
    root: option.parent ? el.parentElement : undefined,
    rootMargin: option.margin,
    threshold: option.threshold,
  })
  el.__ob__?.disconnect()
  el.__ob__ = ob
  ob.observe(el)
}
