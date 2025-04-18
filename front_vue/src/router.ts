import {createRouter, createWebHistory} from 'vue-router'

import order from '@/domain/order/view/order.vue';
import user from '@/domain/user/view/user.vue';
import productRouter from '@/domain/product/router';

const routes = [

    {
        path: '/order',
        name: 'order',
        component: order
    },

    {
        path: '/user',
        name: 'user',
        component: user
    },
    productRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router