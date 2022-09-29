import { createRouter, createWebHistory } from 'vue-router'
import UserDetail from '../views/UserDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: UserDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
