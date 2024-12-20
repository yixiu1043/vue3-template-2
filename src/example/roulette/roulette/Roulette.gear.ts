import * as THREE from 'three'
import { Circle, textureLoader } from './Roulette'

const logos = Object.values<{ default: string }>(
  import.meta.glob('../assets/team/*.png', { eager: true }),
).map((i) => i.default)
// 必须是16个球队
logos.push(...logos.copyWithin(16 - logos.length, 0))

export default class Gear extends THREE.Group {
  count = 140
  radius = 4.1
  disRadius = 0.05
  teamDisRadius = this.radius - 0.3
  constructor() {
    super()
    this.drawBoard()
    this.drawLogos()
    this.position.set(0, 0, 0.3)
  }

  drawBoard() {
    const shape = new THREE.Shape()
    const OR = this.radius
    const IR = OR - this.disRadius

    new Circle(IR, this.count).each(({ x, y, rad, avg }) => {
      shape.lineTo(x, y)
      const _rad = avg / 10

      rad += _rad * 5

      x = Math.cos(rad) * OR
      y = Math.sin(rad) * OR

      shape.lineTo(x, y)

      rad = rad + _rad / 5
      x = Math.cos(rad) * OR
      y = Math.sin(rad) * OR

      shape.lineTo(x, y)
    })
    this.drawPlane(shape)
    this.drawDecoration(shape)
  }

  drawPlane(shape: THREE.Shape) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: false,
    })
    const material = new THREE.MeshStandardMaterial({
      color: '#4dbcfc',
      side: THREE.FrontSide,
      flatShading: true,
    })
    const mesh = new THREE.Mesh(geometry, [
      material,
      new THREE.MeshStandardMaterial({ color: '#215fad', flatShading: true }),
    ])

    mesh.receiveShadow = true
    mesh.castShadow = true

    this.add(mesh)
  }

  drawDecoration(shape: THREE.Shape) {
    const geometry = new THREE.ShapeGeometry(shape)

    const levels = [
      {
        scale: 0.905,
        color: '#ffffff',
      },
      {
        scale: 0.9,
        color: '#55a8e3',
      },
      {
        scale: 0.87,
        color: '#4c97d4',
      },
      {
        scale: 0.84,
        color: '#4088c2',
        shadow: true,
      },
    ]

    const mesh = new THREE.Mesh(geometry)
    const material = new THREE.MeshStandardMaterial({
      opacity: 0.5,
      transparent: true,
      flatShading: true,
    })

    levels.forEach((level, index) => {
      const cloned = mesh.clone()
      const m = material.clone()
      cloned.receiveShadow = level.shadow!
      m.color.set(level.color)
      cloned.material = m
      const scale = level.scale
      cloned.scale.set(scale, scale, scale)
      cloned.position.set(0, 0, 0.151 + index / 100)
      this.add(cloned)
    })
  }

  private drawLogos() {
    const radius = this.teamDisRadius
    const mesh = this.meshTemplate()
    const meshs: (typeof mesh)[] = []

    new Circle(radius, logos.length).each(({ x, y, rad }) => {
      const cloned = mesh.clone()
      cloned.position.set(x, y, 0.55)
      cloned.rotation.set(Math.PI / 2, rad + Math.PI / 2, 0)
      meshs.push(cloned)
      this.add(cloned)
    })

    logos.forEach((logo, index) => {
      const mesh = meshs[index]
      textureLoader.load(logo, (src) => {
        const color = this.pickColor(src.image)
        src.colorSpace = 'srgb'
        src.offset.x = 0.5
        src.offset.y = 0.5
        const m0 = mesh.material[0].clone()
        const m1 = mesh.material[1].clone()

        m0.map = m0.map!.clone().copy(src)
        m1.color = color

        mesh.material = [m0, m1]
      })
    })

    //@ts-ignore
    // this.pickColor = null
  }

  private meshTemplate() {
    const texture = new THREE.Texture()

    const material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      map: texture,
      flatShading: true,
    })

    const shape = new THREE.Shape()
    shape.absarc(0, 0, 0.5, 0, Math.PI * 2)
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: false,
      curveSegments: 36,
    })
    const mesh = new THREE.Mesh(geometry, [
      material,
      new THREE.MeshStandardMaterial({
        color: 0x008348,
        flatShading: true,
      }),
    ])
    const scale = 0.8
    mesh.scale.set(scale, scale, 1)
    mesh.castShadow = true
    return mesh
  }

  pickColor = (() => {
    const offcanvas = new window.OffscreenCanvas(72, 72)
    const ctx = offcanvas.getContext('2d')!
    return (src: HTMLImageElement) => {
      ctx.drawImage(src, 0, 0)
      const data = ctx.getImageData(0, 72 / 2, 1, 1).data.slice(0, 3)
      return new THREE.Color(`rgba(${data.map((i) => i / 1.2)})`)
    }
  })()
}
