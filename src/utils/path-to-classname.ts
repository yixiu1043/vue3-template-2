export default function pathToClassname(path: string, prefix: string = '') {
  
  const parts = path.split('/').filter(Boolean)
  const classList: string[] = []

  while (parts.length) {
    classList.push(prefix + parts.join('-'))
    parts.pop()
  }

  return classList.reverse()
}
