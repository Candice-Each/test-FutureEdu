import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/css/screen.css'
import '@/assets/css/main.css'

// src/main.js
import { createApp } from 'vue'
import App from './src/App.vue'
import router from './src/router'

// 引入全局样式
import '@/assets/scss/global.scss'

// 引入Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
app.use(router)
app.mount('#app')