import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Comf from '@/components/Comf'
import Coms from '@/components/Coms'
import Iwd from '@/components/Iwd'
import Pwd from '@/components/Pwd'
import Check from '@/pages/Check'
import Login from '@/pages/Login'
import User from '@/pages/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/comf',
      name: 'Comf',
      component: Comf,
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/coms',
      name: 'Coms',
      component: Coms,
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      redirect: '/user/iwd',
      children: [
          {path: '/user/iwd', component: Iwd},
          {path: '/user/pwd', component: Pwd},
      ],
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/check',
      name: 'Check',
      component: Check,
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})


