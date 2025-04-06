import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue';

import order from '@/domain/order/view/order.vue';
import product from '@/domain/product/view/product.vue';
import user from '@/domain/user/view/user.vue';

const routes = [
    {
        path: '/',
        name: 'App',
        component: App
    },
    {
        path: '/order',
        name: 'order',
        component: order
    }, {
        path: '/product',
        name: 'product',
        component: product
    }, {
        path: '/user',
        name: 'user',
        component: user
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router