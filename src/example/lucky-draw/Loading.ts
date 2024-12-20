import gsap from 'gsap'
import logo from '@/example/roulette/assets/title.png'
import * as THREE from 'three'
import style from './style.module.less'

const app = document.getElementById('app') as HTMLDivElement
const image = new Image()
image.src = logo

const W = window.innerWidth
const H = window.innerHeight

class Loading {
  declare scene: THREE.Scene
  declare renderer: THREE.WebGLRenderer
  declare camera: THREE.PerspectiveCamera
  declare material: any
  declare particle: ParticleExplode
  z = 600
  constructor() {
    const scene = (this.scene = new THREE.Scene())
    const camera = (this.camera = new THREE.PerspectiveCamera(this.fov, W / H, 0.1, this.z * 2))
    camera.position.z = this.z
    camera.lookAt(scene.position)
    scene.add(camera)

    const renderer = (this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    }))
    renderer.setClearColor(0xffffff, 0)
    renderer.setSize(W, H)
    const dom = renderer.domElement
    dom.className = style.canvas
  }

  get fov() {
    return THREE.MathUtils.radToDeg(2 * Math.atan(H / 2 / this.z))
  }

  init = () => {
    const particle = (this.particle = new ParticleExplode(this.scene))
    particle.createPoints()
    this.material = particle.mesh.mesh.material as any
    this.renderer.render(this.scene, this.camera)
  }

  loading() {
    app.classList.add(style.blur)
    document.body.appendChild(this.renderer.domElement)
    const timeline = gsap.timeline()
    timeline.to(this.renderer.domElement, {
      opacity: 1,
      duration: 0.3,
    })
    timeline.to(this.material.uniforms.uProgress, {
      value: 3,
      duration: 1,
      delay: 0.5,
    })

    this.renderer.setAnimationLoop(() => {
      this.particle.update()
      this.renderer.render(this.scene, this.camera)
    })
  }
  loadingdone() {
    const timeline = gsap.timeline()
    timeline.to(this.material.uniforms.uProgress, {
      value: 0,
      duration: 1,
      onComplete: () => {
        app.classList.remove(style.blur)
      },
    })

    timeline.to(this.renderer.domElement, {
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
      onComplete: () => {
        this.renderer.render(this.scene, this.camera)
        this.renderer.setAnimationLoop(null)
        this.renderer.domElement.remove()
        app.classList.remove(style.blur)
      },
    })
  }
}
const loader = new Loading()
image.onload = loader.init
document.body.append(image)
image.className = style.image

export default loader

class DOMMeshObject {
  declare el: Element
  declare rect: DOMRect
  declare mesh: THREE.Points

  constructor(el: HTMLElement, scene: THREE.Scene, material: THREE.Material) {
    this.el = el
    const { width, height } = (this.rect = el.getBoundingClientRect())
    const gemo = new THREE.PlaneGeometry(width, height, width / 2, height / 2)
    const mesh = (this.mesh = new THREE.Points(gemo, material))
    scene.add(mesh)
  }

  setPosition() {
    const { mesh, rect } = this
    const { top, left, width, height } = rect
    const x = left + width / 2 - window.innerWidth / 2
    const y = top + height / 2 - window.innerHeight / 2
    mesh.position.set(x, y, 0)
  }
}

class ParticleExplode {
  clock = new THREE.Clock()
  declare mesh: DOMMeshObject
  constructor(public scene: THREE.Scene) {}
  particleExplodeMaterial = new THREE.ShaderMaterial({
    vertexShader: particleExplodeVertexShader,
    fragmentShader: particleExplodeFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: {
        value: 0,
      },
      uMouse: {
        value: new THREE.Vector2(0, 0),
      },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uProgress: {
        value: 0,
      },
      uTexture: {
        value: null,
      },
    },
  })
  // 创建点
  createPoints() {
    const texture = new THREE.Texture(image)
    texture.needsUpdate = true
    const material = this.particleExplodeMaterial.clone()
    material.uniforms.uTexture.value = texture
    const mesh = (this.mesh = new DOMMeshObject(image, this.scene, material))
    mesh.setPosition()
  }

  boom() {
    const material = this.mesh.mesh.material as any
    gsap.to(material.uniforms.uProgress, {
      value: 3,
      duration: 1,
    })
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime()
    const material = this.mesh.mesh.material as any
    material.uniforms.uTime.value = elapsedTime
  }
}

const particleExplodeFragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform sampler2D uTexture;

varying vec2 vUv;

void main(){
    vec4 color=texture2D(uTexture,vUv);
    // if(color.r<.1&&color.g<.1&&color.b<.1){
    //     discard;
    // }
    gl_FragColor=color;
}
`

const particleExplodeVertexShader = `
vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}

float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    
    // First corner
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    
    // Other corners
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    
    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1=x0-i1+1.*C.xxx;
    vec3 x2=x0-i2+2.*C.xxx;
    vec3 x3=x0-1.+3.*C.xxx;
    
    // Permutations
    i=mod(i,289.);
    vec4 p=permute(permute(permute(
                i.z+vec4(0.,i1.z,i2.z,1.))
                +i.y+vec4(0.,i1.y,i2.y,1.))
                +i.x+vec4(0.,i1.x,i2.x,1.));
                
                // Gradients
                // ( N*N points uniformly over a square, mapped onto an octahedron.)
                float n_=1./7.;// N=7
                vec3 ns=n_*D.wyz-D.xzx;
                
                vec4 j=p-49.*floor(p*ns.z*ns.z);//  mod(p,N*N)
                
                vec4 x_=floor(j*ns.z);
                vec4 y_=floor(j-7.*x_);// mod(j,N)
                
                vec4 x=x_*ns.x+ns.yyyy;
                vec4 y=y_*ns.x+ns.yyyy;
                vec4 h=1.-abs(x)-abs(y);
                
                vec4 b0=vec4(x.xy,y.xy);
                vec4 b1=vec4(x.zw,y.zw);
                
                vec4 s0=floor(b0)*2.+1.;
                vec4 s1=floor(b1)*2.+1.;
                vec4 sh=-step(h,vec4(0.));
                
                vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
                vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
                
                vec3 p0=vec3(a0.xy,h.x);
                vec3 p1=vec3(a0.zw,h.y);
                vec3 p2=vec3(a1.xy,h.z);
                vec3 p3=vec3(a1.zw,h.w);
                
                //Normalise gradients
                vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
                p0*=norm.x;
                p1*=norm.y;
                p2*=norm.z;
                p3*=norm.w;
                
                // Mix final noise value
                vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
                m=m*m;
                return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),
                dot(p2,x2),dot(p3,x3)));
            }
            
            vec3 snoiseVec3(vec3 x){
                return vec3(snoise(vec3(x)*2.-1.),
                snoise(vec3(x.y-19.1,x.z+33.4,x.x+47.2))*2.-1.,
                snoise(vec3(x.z+74.2,x.x-124.5,x.y+99.4)*2.-1.)
            );
        }
        
        vec3 curlNoise(vec3 p){
            const float e=.1;
            vec3 dx=vec3(e,0.,0.);
            vec3 dy=vec3(0.,e,0.);
            vec3 dz=vec3(0.,0.,e);
            
            vec3 p_x0=snoiseVec3(p-dx);
            vec3 p_x1=snoiseVec3(p+dx);
            vec3 p_y0=snoiseVec3(p-dy);
            vec3 p_y1=snoiseVec3(p+dy);
            vec3 p_z0=snoiseVec3(p-dz);
            vec3 p_z1=snoiseVec3(p+dz);
            
            float x=p_y1.z-p_y0.z-p_z1.y+p_z0.y;
            float y=p_z1.x-p_z0.x-p_x1.z+p_x0.z;
            float z=p_x1.y-p_x0.y-p_y1.x+p_y0.x;
            
            const float divisor=1./(2.*e);
            return normalize(vec3(x,y,z)*divisor);
        }
        
        uniform float uTime;
        uniform float uProgress;
        varying vec2 vUv;
        
        void main(){
            vec3 noise=curlNoise(vec3(position.x*.02,position.y*.008,uTime*.05));
            vec3 distortion=vec3(position.x*1.,position.y*0.5,1.)*noise*uProgress;
            vec3 newPos=position+distortion;
            vec4 modelPosition=modelMatrix*vec4(newPos,1.);
            vec4 viewPosition=viewMatrix*modelPosition;
            vec4 projectedPosition=projectionMatrix*viewPosition;
            gl_Position=projectedPosition;
            gl_PointSize=2.;
            
            vUv=uv;
        }
`
