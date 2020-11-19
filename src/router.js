import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./pages/home.vue'),
            redirect: '/index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('./pages/index.vue'),
                },
                {
                    path: 'product/:id',
                    name: 'product',
                    component: () => import('./pages/product.vue')
                },
                {
                    path: 'detail/:id',
                    name: 'detail',
                    component: () => import('./pages/detail.vue')
                }
            ]
        },
        {
            path: '/text',
            name: 'text',
            component: () => import('./pages/text.vue')
        }
    ]
})