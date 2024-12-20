import * as THREE from 'three'
import { SVGLoader } from 'three/addons'
import booth from '../assets/booth.svg?url'

export default class Booth extends THREE.Group {
  constructor() {
    super()
    this.drawBoard()
    this.position.set(-2.82, -2.9, 0.8)
    const scale = 0.113
    this.scale.set(scale, scale, 1)
    this.applyMatrix4(new THREE.Matrix4().makeRotationZ(-3.2))
  }

  drawBoard() {
    new SVGLoader().load(booth, (data) => {
      const paths = data.paths

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        const material = new THREE.MeshBasicMaterial({
          color: path.color,
          side: THREE.DoubleSide,
        })

        const material2 = new THREE.MeshBasicMaterial({
          color: path.color.lerp(new THREE.Color('#000'), 0.5),
        })

        const shapes = path.toShapes(true)

        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j]

          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.15,
            curveSegments: 36,
            bevelEnabled: false,
            steps: 1,
          })

          const mesh = new THREE.Mesh(geometry, [material, material2])

          mesh.castShadow = true
          this.add(mesh)
        }
      }
    })
  }
}
