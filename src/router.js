import { createRouter, createWebHistory } from 'vue-router' // 使用Vue 3语法
import Home from '@/views/Home.vue'
import Detail from '@/views/Detail.vue'
import About from '@/views/About.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/Home.vue") 
    },
    {
      path: '/detail/:id', // 添加动态参数
      name: 'detail',
      component: () => import("@/views/Detail.vue") 
    },
    {
      path: '/about',
      name: 'about',
      component: () => import("@/views/About.vue") 
    }
  ]
})