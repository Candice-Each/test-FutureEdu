import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 确保路径正确

// 先导入Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// 再导入自定义样式
import '@/assets/scss/global.scss'
import '@/assets/css/screen.css'
import '@/assets/css/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
