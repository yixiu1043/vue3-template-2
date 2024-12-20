import * as THREE from 'three'
import { TextGeometry, type Font } from 'three/addons'
import { Circle } from './Roulette'

export default class NBA extends THREE.Group {
  text = 'NBA PLAYOFFS  '.repeat(6)
  radius = 3.3
  constructor(public font: Font) {
    super()
    this.drawBoard()
    this.drawTexts()
    this.position.set(0, 0, 0.6)
  }

  drawBoard() {
    const radius = this.radius
    const color1 = '#01bb7b'
    const color2 = '#5a31c5'

    const canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2)

    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // canvas.style.cssText = 'position:fixed;inset:0;'
    // document.body.appendChild(canvas)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = 'srgb'
    texture.repeat.set(0.4,0.4)

    const shape = new THREE.Shape()
    shape.absarc(0, 0, radius, 0, 2 * Math.PI)
    const gemo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      curveSegments: 36,
      bevelEnabled: false,
    })

    const mat = new THREE.MeshStandardMaterial({ map: texture })

    const mesh = new THREE.Mesh(gemo, [
      mat,
      new THREE.MeshStandardMaterial({
        color: '#000',
        opacity: 0.5,
        transparent: true,
        flatShading: true,
      }),
    ])

    mesh.castShadow = true
    mesh.receiveShadow = true
    this.add(mesh)
  }

  drawTexts() {
    const mesh = new THREE.Mesh(undefined, [
      new THREE.MeshStandardMaterial({
        color: '#b4b9e0',
        flatShading: true,
      }),
      new THREE.MeshStandardMaterial({
        color: '#1c2148',
        flatShading: true,
      }),
    ])

    const option = {
      font: this.font,
      size: 0.25,
      bevelEnabled: false,
      height: 0.04,
    }

    new Circle(this.radius - 0.1, this.text.length - 1).each(({ x, y, rad, index }) => {
      const cloned = mesh.clone()

      cloned.geometry = new TextGeometry(this.text[index], option)
      cloned.position.set(x, y, 0.1)
      cloned.rotation.set(0, 0, rad + Math.PI / 2)

      this.add(cloned)
    })
  }
}
