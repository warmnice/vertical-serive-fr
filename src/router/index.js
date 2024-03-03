import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
// 定义路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('../views/Add.vue')
      }
    ]
  },
  {
    path: '/change',
    name: 'change',
    component: () => import('../views/Change.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 前置路由守卫控制展示正确页面
router.beforeEach((to, _from, next) => {
  if (to.path === '/') {
    next('/home')
  } else {
    next()
  }
})

export default router
