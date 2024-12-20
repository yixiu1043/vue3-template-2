import * as THREE from 'three'
import { random as r } from 'lodash-es'

function random(max: number = 1, min: number = 0, negative = false) {
  const n = r(min, max)
  if (negative) {
    const flag = Math.random() - 0.5 < 0
    return flag ? n * -1 : n
  }
  return n
}
const length = 12
const ratio = 155 / 60
const top = 10
const [sizeW, sizeH, segW, segH] = [length, length / ratio, 30, 10]
const geom = new THREE.PlaneGeometry(sizeW, sizeH, segW, segH)
const baseMat = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
})

const textures: THREE.MeshBasicMaterial[] = [baseMat.clone(), baseMat.clone(), baseMat.clone()]

export default class Note extends THREE.Mesh {
  private speed = random(0.005, 0.05)

  constructor() {
    const index = Math.floor(Math.random() * textures.length)
    super(geom, textures[index])
    const scale = 0.15
    this.scale.set(scale, scale, scale)
    this.position.z = 3
    this.morph()
    this.random()
  }

  private random() {
    this.position.set(...Note.randomPosition())
    this.rotation.set(random(0, Math.PI * 2), random(0, Math.PI * 2), random(0, Math.PI * 2))
  }

  private morph() {
    const h = 0.1
    const v = 0.1
    const w = random(0.1, 0.5)
    const position = this.geometry.attributes.position
    for (let y = 0; y < segH + 1; y++) {
      for (let x = 0; x < segW + 1; x++) {
        const index = x + y * (segW + 1)
        position.setZ(index, (Math.sin(h * x + v * y) * w * x) / 4)
      }
    }

    position.needsUpdate = true
  }

  static randomPosition = (() => {
    const geom = new THREE.RingGeometry(6, 10)
    geom.translate(0, 0, top)
    const position = geom.getAttribute('position')
    const count = position.count

    return function random() {
      const index = Math.floor(Math.random() * count)
      return [position.getX(index), position.getY(index), position.getZ(index)] as const
    }
  })()

  update() {
    if (this.position.z <= -1) {
      this.position.z = top
      this.random()
      // this.morph()
    } else {
      this.position.z -= this.speed
    }
  }

  static createTexture(text: string, index: number) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#8a9bbe'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    const padding = 20
    ctx.fillRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2)
    ctx.fillStyle = '#8a9bbe'
    ctx.font = '64px Knockout'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    const texture = new THREE.Texture()
    texture.colorSpace = 'srgb'
    texture.image = canvas
    texture.needsUpdate = true
    textures[index].map = texture
    textures[index].needsUpdate = true
  }

  static initTexure = () => {
    this.createTexture('•₱3,000•', 0)
    this.createTexture('•₱5,000•', 1)
    this.createTexture('•₱10,000•', 2)
  }
  static dispose() {
    document.fonts.removeEventListener('loadingdone', Note.initTexure)
  }
}
document.fonts.ready.then((fontFaceSet) => {
  fontFaceSet.forEach(font=>{
    if(font.family==='Knockout' && font.status==='loaded'){
      Note.initTexure()
    }
  })
});
