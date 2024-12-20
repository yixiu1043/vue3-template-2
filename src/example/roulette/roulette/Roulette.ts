import * as THREE from 'three'
import Knockout from '@/assets/fonts/Knockout HTF49-Liteweight_Regular.json'
import { Font, OrbitControls, RectAreaLightHelper } from 'three/addons'
import Gear from './Roulette.gear'
import Booth from './Roulette.booth'
import NBA from './Roulette.nba'
import BaseBorad from './Roulette.baseboard'
import Notes from './Roulette.notes'
import Prize from './Roulette.prize'
import { throttle } from 'lodash-es'
import gsap from 'gsap'

const font = new Font(Knockout)
const speed = 2 / 1000
export default class Roulette {
  declare control: OrbitControls
  declare renderer: THREE.WebGLRenderer
  declare camera: THREE.PerspectiveCamera
  declare unbind: VoidFunction

  scene = new THREE.Scene()
  baseboard = new BaseBorad(font)
  gear = new Gear()
  nba = new NBA(font)
  booth = new Booth()
  notes = new Notes()
  prize = new Prize()
  paused = false
  raf = 0
  width = 0
  height = 0
  constructor(public canvas: HTMLCanvasElement) {
    this.width = canvas.offsetWidth
    this.height = canvas.offsetHeight
    this.camera = new THREE.PerspectiveCamera(17, this.width / this.height, 1, 10000)
    this.initCamera()
    // this.initControl(this.camera, canvas)
    // this.initHelper()
    this.initLights()
    this.initRenderer(canvas)

    this.scene.add(this.baseboard)
    this.scene.add(this.gear)
    this.scene.add(this.nba)
    this.scene.add(this.booth)
    this.scene.add(this.notes)
    this.scene.add(this.prize)

    this.unbind = this.bindEvent()
  }

  private initCamera() {
    this.camera.position.set(0, -40, 15)
    // this.camera.position.set(0, 0, 90)
    this.camera.lookAt(0, 0, 1.8)
    // this.camera.up.set(0, 0, 2)
    this.scene.add(this.camera)
  }

  private initControl(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) {
    const control = new OrbitControls(camera, canvas)
    // control.enableDamping = true
    // control.enablePan = false
    // control.maxDistance = 100
    // control.minDistance = 10
    this.control = control
  }

  private initRenderer(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    })

    renderer.setSize(this.width, this.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.setClearAlpha(0)
    this.renderer = renderer
  }

  private loop = () => {
    !this.paused && this.rotate(speed)
    this.notes.update()
    this.renderer.render(this.scene, this.camera)
  }

  private rotate(speed: number) {
    this.baseboard.rotation.z -= speed
    this.gear.rotation.z += speed / 2
    this.nba.rotation.z -= speed
  }

  private initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    const pointLight = new THREE.SpotLight(0xffffff, 100)

    directionalLight.position.set(0, 0, 30)
    directionalLight.castShadow = true

    pointLight.position.set(-2, -8, 2)
    pointLight.angle = Math.PI / 4
    pointLight.decay = 2

    this.scene.add(ambientLight, directionalLight, pointLight)
  }

  private initHelper() {
    //AxisHelper是一个坐标轴对象，添加到场景中我们就可以看到世界坐标系的具体位置
    const axes = new THREE.AxesHelper(10000)
    this.scene.add(axes)

    // 添加一个辅助网格地面
    const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444)
    this.scene.add(gridHelper)
  }

  private bindEvent() {
    this.canvas.style.touchAction = 'pan-y'
    let sx = 0
    let lastPoint: PointerEvent
    let lastTime = 0
    let deltaTime = 0
    let deltaX = 0

    const evt = (e: PointerEvent) => {
      lastTime = e.timeStamp
      lastPoint = e
      e.preventDefault()
      this.paused = true
      sx = e.pageX

      const handle = throttle((e: PointerEvent) => {
        // if (e.timeStamp - lastTime > 300) {
        //   lastTime = e.timeStamp
        // }

        const x = e.pageX - lastPoint.pageX
        const rate = -x / 100
        this.rotate(rate)
        this.renderer.render(this.scene, this.camera)
        lastPoint = e
      }, 1000 / 40)

      const unbind = (e: PointerEvent) => {
        this.off(document, 'pointermove', handle)
        this.off(document, 'pointerup', unbind)
        this.off(document, 'pointercancel', unbind)

        deltaTime = e.timeStamp - lastTime
        deltaX = e.pageX - sx
        const speed = deltaX / deltaTime
        const o = { value: -speed / 4 }
        gsap.to(o, {
          value: 0,
          ease: 'sine.out',
          duration: 0.3,
          onUpdate: () => {
            this.rotate(o.value)
          },
          onComplete: () => {
            this.paused = false
          },
        })
      }

      this.on(document, 'pointermove', handle)
      this.on(document, 'pointerup', unbind)
      this.on(document, 'pointercancel', unbind)
    }

    return this.on(this.canvas, 'pointerdown', evt)
  }

  on = (element: any, type: any, callback: any, option?: any) => {
    element.addEventListener(type, callback, option)
    return () => this.off(element, type, callback, option)
  }

  off = (element: any, type: any, callback: any, option?: any) => {
    element.removeEventListener(type, callback, option)
  }

  start = () => {
    this.loop()
    this.raf = requestAnimationFrame(this.start)
  }

  pause() {
    window.cancelAnimationFrame(this.raf)
  }

  stop() {
    // this.note.dispose()
    const cleanMaterial = (material: any) => {
      // console.log('dispose material!')
      material.dispose()

      // dispose textures
      for (const key of Object.keys(material)) {
        const value = material[key]
        if (value && typeof value === 'object' && 'minFilter' in value) {
          // console.log('dispose texture!')
          value.dispose()
        }
      }
    }

    this.scene.traverse((object: any) => {
      // console.log('dispose geometry!')
      object.geometry?.dispose()

      if (object.material?.isMaterial) {
        cleanMaterial(object.material)
      } else if (object.material) {
        // an array of materials
        for (const material of object.material) cleanMaterial(material)
      }
    })

    this.notes.dispose()
    this.renderer.dispose()
    this.pause()
    this.unbind()
    //@ts-ignore
    this.scene = this.camera = this.control = this.renderer = null
  }
}

export class Circle {
  constructor(
    public radius: number,
    public length: number,
  ) {}

  each(
    excutor: (attrs: { x: number; y: number; rad: number; index: number; avg: number }) => void,
  ): void {
    const avg = (Math.PI * 2) / this.length

    for (let i = 0; i <= this.length; i++) {
      const rad = avg * i
      const x = Math.cos(rad) * this.radius
      const y = Math.sin(rad) * this.radius

      excutor({ x, y, rad, index: i, avg })
    }
  }
}

export const textureLoader = new THREE.TextureLoader()
