import * as THREE from 'three'

import { TextGeometry, type Font } from 'three/addons'
import { Circle } from './Roulette'

export default class BaseBorad extends THREE.Group {
  text = '1234567890NBA'.repeat(2)
  radius = 5

  constructor(public font: Font) {
    super()
    this.drawPlane()
    this.drawTexts()
  }

  private drawPlane() {
    const shape = new THREE.Shape()
    shape.absarc(0, 0, this.radius, 0, Math.PI * 2)
    const geometry = new THREE.ExtrudeGeometry(shape, {
      curveSegments: 36,
      depth: 0.1,
      steps: 1,
      bevelEnabled: false,
    })

    const mesh = new THREE.Mesh(geometry, [
      new THREE.MeshStandardMaterial({
        color: '#7720d4',
        flatShading: true,
        dithering: true,
      }),

      new THREE.MeshStandardMaterial({
        color: '#4903a5',
        flatShading: true,
        dithering: true,
      }),
    ])

    mesh.receiveShadow = true
    this.add(mesh)
  }

  private drawTexts() {
    const option = {
      font: this.font,
      size: 0.6,
      height: 0.05,
      curveSegments: 12,
    }

    const mats = [
      new THREE.MeshStandardMaterial({
        color: '#D1A7FF',
        side: THREE.FrontSide,
      }),

      new THREE.MeshStandardMaterial({
        color: '#34026a',
      }),
    ]

    const geom = new THREE.PlaneGeometry(0.02, this.radius)
    const seprator = new THREE.Mesh(
      geom,
      new THREE.MeshStandardMaterial({
        color: '#000000',
        transparent: true,
        opacity: 0.3,
      }),
    )

    new Circle(this.radius+0.5, this.text.length).each(({ x, y, rad, index }) => {
      this.drawSeprator(seprator, x, y, rad)
      if (index === this.text.length) return
      const geometry = new TextGeometry(this.text[index], option)

      geometry.translate(0.46, 0.6, 0)
      geometry.rotateZ(0.15)

      const mesh = new THREE.Mesh(geometry, mats)

      this.drawText(mesh, x, y, rad)
    })
  }

  private drawSeprator(mesh: THREE.Mesh, x: number, y: number, rad: number) {
    const seprator = mesh.clone()

    seprator.position.set(x / 2, y / 2, 0.21)
    seprator.rotation.set(0, 0, rad + Math.PI / 2)
    this.add(seprator)
  }

  private drawText(mesh: THREE.Mesh, x: number, y: number, rad: number) {
    mesh = mesh.clone()
    mesh.position.set(x, y, 0.1)
    mesh.rotation.set(0, 0, rad + Math.PI / 2)
    this.add(mesh)
  }
}
