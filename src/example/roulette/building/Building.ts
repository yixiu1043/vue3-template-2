interface Light {
  x: number
  y: number
  lighting: boolean
}

export default class Building {
  size = 4.9
  space = 3.8
  timer: number = 0
  declare ctx: CanvasRenderingContext2D
  declare lights: Light[]
  // 缓存上次改变的位置，每次更新前恢复到初始状态
  lastUpdated: number[] = []
  constructor(public canvas: HTMLCanvasElement) {
    canvas.width = 145
    canvas.height = 218
    this.ctx = canvas.getContext('2d')!
    this.ctx.fillStyle = '#fff'
    this.lights = this.initLights()
    // this.update()
    // this.loop()
  }

  private initLights() {
    const { size, space } = this
    const lights: Light[] = []
    const raw: number[][] = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    ]

    for (let rowIndex = 0, len = raw.length; rowIndex < len; rowIndex++) {
      for (let colIndex = 0, len = raw[rowIndex].length; colIndex < len; colIndex++) {
        const x = colIndex * (size + space)
        const y = rowIndex * (size + space)
        lights.push({ x, y, lighting: raw[rowIndex][colIndex] === 1 })
      }
    }

    return lights
  }

  private restore() {
    const count = this.lastUpdated.length
    for (let i = 0; i < count; i++) {
      this.lights[this.lastUpdated[i]].lighting = true
    }
    this.lastUpdated = []
  }

  private paint() {
    const { ctx, size } = this
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (const item of this.lights) {
      if (item.lighting) {
        ctx.fillRect(item.x, item.y, size, size)
      }
    }
  }

  private random() {
    const count = Math.floor(Math.random() * 30 + 10)
    const ary = this.lastUpdated
    while (ary.length < count) {
      const index = Math.floor(Math.random() * this.lights.length)

      if (ary.includes(index)) continue
      const lighting = this.lights[index].lighting
      if (lighting === false) continue
      ary.push(index)
      this.lights[index].lighting = false
    }
  }

  start() {
    this.pause()
    this.paint()
    this.timer = window.setInterval(() => {
      this.restore()
      this.random()
      this.paint()
    }, 1000)
  }

  pause() {
    clearInterval(this.timer)
  }

  stop() {
    this.pause()
    //@ts-ignore
    this.canvas = this.ctx = null
  }
}
