import '@/styles/font.less'
import './style.less'
import Roulette from './roulette/Roulette'
import Building from './building/Building'

new Roulette(document.querySelector('#roulette') as HTMLCanvasElement).start()
new Building(document.querySelector('#building') as HTMLCanvasElement).start()
