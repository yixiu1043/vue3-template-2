import router from '@/router'

const params = new URLSearchParams(window.location.search)

export const backToApp = (path: string) => {
  if (!params.get('os')) return false
  const anchor = document.createElement('a')
  anchor.href = `toApp:/${path}`
  anchor.click()
  return true
}

export function goBack(target: Path) {
  //@ts-ignore
  if (!backToApp(target.app || target)) {
    //@ts-ignore
    const _target: string = target?.web || target
    if (_target) {
      if (_target.startsWith('http')) {
        window.location.href = _target
      } else {
        router.push(_target)
      }
    } else {
      router.back()
    }
  }
}

export interface OSPath {
  web: string
  app: string
}

export type Path = string | OSPath
