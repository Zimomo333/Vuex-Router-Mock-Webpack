import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import { getToken } from './utils/auth'

Vue.use(VueRouter)

export const routes = [
  {
    path: '//',     // 转义 / ，防止自动省略为空
    component: () => import('./views/home.vue'),
    meta: { 
      title: '首页',
      icon: 'el-icon-s-order'
    },
    hidden: true,
    children: [
      { 
        path: '/info',
        component: () => import('./views/info.vue'),
        meta: { 
            title: '个人中心',
            icon: 'el-icon-user-solid'
        }
      },
      {
        path: '/orders',        // 以 / 开头的嵌套路径会被当作根路径
        component: () => import('./views/orders/index.vue'),    // 可写成{render: (e) => e("router-view")}，避免新建空router-view文件
        meta: { 
            title: '订单管理',
            icon: 'el-icon-s-order'
        },
        children: [
          {
            path: 'my-orders',      // 子路由不要加 /
            component: () => import('./views/orders/myOrders.vue'),
            meta: { 
                title: '我的订单',
                icon: 'el-icon-s-order'
            }
          },
          {
            path: 'submit',
            component: () => import('./views/orders/submit.vue'),
            meta: { 
                title: '提交订单',
                icon: 'el-icon-s-order'
            }
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    component: () => import('./views/login.vue'),
    hidden: true
  }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

//路由全局前置守卫，验证token
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