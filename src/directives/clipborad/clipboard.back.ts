// import type { App } from 'vue'
// import { showToast } from 'vant'

// const toast = (message: string) => {
//   showToast({
//     overlay: false,
//     forbidClick: false,
//     message: message,
//     duration: 800,
//   })
// }

// let clazz: any
// const load = async () => {
//   clazz = (await import('clipboard')).default
//   clazz.prototype.on('success', (e: any) => {
//     toast('Copied successful')
//     e.clearSelection()
//   })

//   clazz.prototype.on('error', () => {
//     toast('Your web browser does not support copy')
//   })
// }

// export default function clipboard(app: App) {
//   app.directive('clipboard', {
//     async created(el: any) {
//       await load()
//       el.clipboard = new clazz(el)
//     },
//     mounted(el: HTMLElement, { value }) {
//       el.dataset.clipboardText = value
//     },
//     updated(el: HTMLElement, { value }) {
//       el.dataset.clipboardText = value
//     },
//     beforeUnmount(el: any) {
//       el.clipboard?.destroy()
//     },
//   })
// }
