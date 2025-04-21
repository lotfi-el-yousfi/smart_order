import {createRouter, createWebHistory} from 'vue-router'

import user from '@/domain/user/view/user.vue';
import productRouter from '@/domain/product/router';
import OrderListView from "./domain/order/view/OrderListView.vue";
import OrderFormView from "./domain/order/view/OrderFormView.vue";
import OrderDetailView from "./domain/order/view/OrderDetailView.vue";

const routes = [
    {
        path: '/user',
        name: 'user',
        component: user
    },
    {
        path: '/orders',
        name: 'OrderList',
        component: OrderListView

    },
    {
        path: '/orders/new',
        name: 'OrderCreate',
        component: OrderFormView,
    },
    {
        path: '/orders/edit/:id',
        name: 'OrderEdit',
        component: OrderFormView,
        props: true
    },
    {
        path: '/orders/:id',
        name: 'OrderDetail',
        component: OrderDetailView,
        props: true
    },
    productRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router