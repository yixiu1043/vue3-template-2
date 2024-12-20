import type { RouteLocationNormalized } from 'vue-router'

// 第一次加载不使用转场动画
let unloaded = true
let back: boolean | null = null

/** 转场动画 */
export default function transition(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
): string | undefined {
  if (unloaded) {
    unloaded = false
    return
  }
  console.log(back)

  if (to.fullPath.startsWith(from.fullPath)) {
    console.log('父页面进入到子页面')
  } else if (from.fullPath.startsWith(to.fullPath)) {
    console.log('子页面后退到父页面')
  } else {
    console.log('前进到独立页面')
  }

  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  back = null
  return toDepth < fromDepth ? 'slide-right' : 'slide-left'
}

window.addEventListener('popstate', (e) => {
  console.log(e.state)

  back = !!e.state.back
})
