export default function hashCode(source: any) {
  const string = source.toString()
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i)
    hash = (hash << 5) - hash + code
    hash = hash & hash
  }
  
  return Math.abs(hash).toString()
}
