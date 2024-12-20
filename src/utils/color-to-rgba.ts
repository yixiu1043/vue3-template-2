export default function colorToRgba(color: string, alpha: number = 1) {
  const div = document.createElement('div')
  div.style.cssText = `background-color:${color};position:fixed;display:none`
  document.body.appendChild(div)
  let _color = window.getComputedStyle(div).backgroundColor
  document.body.removeChild(div)
  if (!_color.startsWith('rgba')) {
    _color = _color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
  }
  return
}
