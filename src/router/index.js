import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/auth/Auth'
import AdminPages from '../components/admin/AdminPages'
import Home from '../components/home/Home'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
{
    path: '/auth',
    name: 'auth',
    component: Auth
}, {
    path: '/admin',
    name: 'admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    path: '/',
    name: 'home',
    component: Home
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
