import {createRouter, createWebHistory} from "vue-router";
import orderList from "../order/components/order-list.vue";
const routes = [
    {
        path: '/',
        name: 'order.list',
        component: orderList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router