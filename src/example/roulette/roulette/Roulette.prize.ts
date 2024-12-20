import * as THREE from 'three'
import gsap from 'gsap'
import basketball from '@/example/lottery/index/img/basketball.png'
import title from '@/example/lottery/index/img/title.png'
import { textureLoader } from './Roulette'
import car from '../assets/car.png'
import motocycle from '../assets/motocycle.png'

const timeline = gsap.timeline({
  repeat: -1,
  paused: true,
})

const loader = new THREE.TextureLoader()
const s = 3.3
const prizes: { image: string; to: any }[] = [
  {
    image: car,
    to: { x: s * 1.4, y: s, z: s },
  },
  {
    image: motocycle,
    to: { x: s * 1.4, y: s, z: s },
  },
]
export default class Prize extends THREE.Group {
  clock = new THREE.Clock()
  constructor() {
    super()
    this.drawBasketball()
    this.drawPrizes()
    this.drawTitle()
    this.position.set(0, 0, 1)
    timeline.play()
  }

  getTemplate(src: string) {
    const map = loader.load(src)
    map.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.SpriteMaterial({ map: map })
    const sprite = new THREE.Sprite(material)
    sprite.scale.set(0, 0, 0)
    return sprite
  }

  drawPrizes() {
    prizes.forEach((prize) => {
      const sprite = this.getTemplate(prize.image)
      sprite.scale.set(0, 0, 0)
      sprite.center = new THREE.Vector2(0.55, 1)
      sprite.position.set(0, -2.5, 3)
      this.add(sprite)

      timeline.to(sprite.scale, {
        ...prize.to,
      })

      timeline.to(sprite.scale, {
        x: 0,
        y: 0,
        z: 0,
        delay: 3,
      })
    })
  }

  drawBasketball() {
    const map = textureLoader.load(basketball)
    map.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.SpriteMaterial({ map: map })
    const sprite = new THREE.Sprite(material)
    sprite.position.set(1.5, -3.2, 1)
    this.add(sprite)
  }
  drawTitle() {
    const map = textureLoader.load(title)
    map.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.SpriteMaterial({ map: map })
    const sprite = new THREE.Sprite(material)
    // const s = 2.7
    // sprite.scale.set(s * 2.147, s, 1)
    // sprite.position.set(0, 0, 4.4)
    // this.add(sprite)
    const s = 2.7
    sprite.scale.set(s * 2.11, s * 1.3, 1)
    sprite.position.set(0, -2.6, 4.85)
    this.add(sprite)
  }
}
