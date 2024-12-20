export function waiting(duration: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
