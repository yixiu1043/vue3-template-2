import type { Directive, DirectiveElement } from '../types'
import copy from 'copy-text-to-clipboard'
import { showToast } from 'vant'

const toast = (message: string) => {
  showToast({
    overlay: false,
    forbidClick: false,
    message: message,
    duration: 800,
  })
}

const handle = async (e: MouseEvent) => {
  const text = (e.target as HTMLElement).dataset.clipboardText
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    toast('Copied successful')
  } catch (error) {
    if (copy(text)) {
      toast('Copied successful')
    } else {
      toast('Your web browser does not support copy')
    }
  }
}

/** 这里使用copy-text-to-clipboard轻量级的复制插件，
 * 如果有反馈兼容性问题，切换到 index.back.ts，并安装clipboard插件
 */
export default <Directive<DirectiveElement, number | string>>{
  name: 'clipboard',
  created(el) {
    el.addEventListener('click', handle)
  },
  mounted(el, { value }) {
    el.dataset.clipboardText = value.toString()
  },
  updated(el, { value }) {
    el.dataset.clipboardText = value.toString()
  },
  unmounted(el) {
    el.removeEventListener('click', handle)
  },
}
