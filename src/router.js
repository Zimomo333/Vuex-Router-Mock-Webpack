import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import { getToken } from './utils/auth'

Vue.use(VueRouter)

export const routes = [
    { 
        path: '/',
        redirect: '/info',
        component: () => import('./views/home.vue'),
        children: [
            { 
                path: '/info',
                title: '个人中心',
                icon: 'el-icon-user-solid',
                component: () => import('./views/info.vue')
            },
            { 
                path: '/orders',
                title: '我的订单',
                icon: 'el-icon-s-order',
                component: () => import('./views/orders.vue')
            }
        ]
    },
    { path: '/login', component: () => import('./views/login.vue') }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

router.beforeEach(async(to, from, next) => {
  
    // determine whether the user has logged in
    const hasToken = getToken()
  
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next('/')
      } else {
        const hasGetUserInfo = store.getters.name
        if (hasGetUserInfo) {
          next()
        } else {
          try {
            // get user info
            await store.dispatch('getInfo')
  
            next()
          } catch (error) {
            await store.dispatch('resetToken')
            next('/login')
          }
        }
      }
    } else {
        /* has no token*/
        if (to.path === '/login') {   //next()才能跳出循环
            next()
        } else {
            next('/login')
        }
    }
})

export default router