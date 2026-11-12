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
import VueLazyload from 'vue-lazyload'
import logoImage from '@/assets/images/logo.png'

const app = createApp(App)
app.use(router)
app.use(VueLazyload, {
  preLoad: 1.3,
  error: logoImage,
  loading: logoImage,
  attempt: 3
})
app.mount('#app')
