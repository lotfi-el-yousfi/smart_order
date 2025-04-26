import {createRouter, createWebHistory} from 'vue-router'

import OrderListView from "./domain/order/view/OrderListView.vue";
import OrderFormView from "./domain/order/view/OrderFormView.vue";
import OrderDetailView from "./domain/order/view/OrderDetailView.vue";
import login from "./domain/auth/view/login.vue";
import register from "./domain/auth/view/register.vue";
import ClientForm from "./domain/client/components/ClientForm.vue";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/client',
        name: 'client',
        component: ClientForm


    }, {
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router