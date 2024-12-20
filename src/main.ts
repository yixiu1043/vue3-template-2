import '@/apis'
import 'virtual:svg-icons-register'
import './styles/index.less'
import { createApp } from 'vue'
import { store } from './stores'
import App from './App.vue'
import router from './router'
import vueExtends from './vue.extends'
import { yamiLoader } from 'yami-loader'


const app = createApp(App)

app.use(store)
app.use(router)
app.use(vueExtends)
app.mount('#app')

if (window.location.search.includes('debug=axiba')) {
  yamiLoader.loadScript('https://unpkg.com/vconsole@latest/dist/vconsole.min.js').then((data) => {
    //@ts-ignore
    new window.VConsole()
  })
}
