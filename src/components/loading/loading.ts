import './loading.less'
import { showToast, type ToastOptions } from 'vant/es'
import { render } from 'vue'
import { SVGIcon } from '../svg-icon'

let container = document.createElement('div')

/** 缓存svg-icon中的loading组件的html结构 */
render(
  h(SVGIcon, {
    icon: 'loading',
    size: '30vw',
    color: '#fff',
  }),
  container,
)
const html = container.innerHTML
container = null as any

const option: ToastOptions = {
  message: html,
  type: 'html',
  duration: 0,
  className: 'ap-loading',
  forbidClick: true,
  overlay: false,
}

export default function loading() {
  return showToast(option).close
}
