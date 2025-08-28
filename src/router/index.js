import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ChartTest from '../views/ChartTest.vue'
import EffectsDemo from '../views/EffectsDemo.vue'
import ScreenTest from '../views/ScreenTest.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/test',
    name: 'ChartTest',
    component: ChartTest
  },
  {
    path: '/effects',
    name: 'EffectsDemo',
    component: EffectsDemo
  },
  {
    path: '/screen-test',
    name: 'ScreenTest',
    component: ScreenTest
  },
  // 可以添加更多路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router