import { showToast } from 'vant'

export default function share(
  option: string | { url?: string; message?: string; [key: string]: any },
) {
  if (!navigator.share) {
    showToast({
      message: `Your browser is not supported to share`,
      overlay: false,
    })
  }

  option = typeof option === 'string' ? { message: option } : option
  const url = new window.URL(option?.url || window.location.href)
  const message = option.message
  delete option?.url
  delete option?.message

  const params = new window.URL(url).searchParams
  for (let i = 0, keys = Object.keys(option); i < keys.length; i++) {
    const key = keys[i]
    if (params.has(key)) {
      params.delete(key)
    }
    params.append(key, option[key])
  }
  navigator.share({
    title: 'ArenaPlus',
    text: message,
    url: url.origin + url.pathname + '?' + params.toString() + url.hash,
  })
}
