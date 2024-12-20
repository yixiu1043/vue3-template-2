import 'vant/es/popup/style'
import '@/apis'
import { store } from '@/stores'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(store)
app.mount('#app')
