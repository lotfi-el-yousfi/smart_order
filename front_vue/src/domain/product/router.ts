import {createRouter, createWebHistory} from "vue-router";
import ProductList from "@/domain/product/components/product-list.vue";

const routes = [
    {
        path: '/',
        name: 'product.list',
        component: ProductList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router