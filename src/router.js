import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
    { path: '/info', name: '个人中心', icon: 'el-icon-user-solid', component: () => import('../views/info.vue') },
    { path: '/orders', name: '我的订单', icon: 'el-icon-s-order', component: () => import('../views/orders.vue') }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router