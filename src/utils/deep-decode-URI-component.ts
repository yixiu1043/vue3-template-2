export default function deepDecodeURIComponent(uri: string) {
  const decoded = window.decodeURIComponent(uri)
  if (decoded === uri) return uri
  return deepDecodeURIComponent(decoded)
}
