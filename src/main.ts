import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

//@ts-ignore
import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// service workerの登録
registerSW()

app.mount('#app')
