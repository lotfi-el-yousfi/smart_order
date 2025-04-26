// src/router/routes.ts
import {createRouter, createWebHistory} from 'vue-router';
import ProductList from '@/domain/product/components/ProductList.vue';

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [
        {
            path: '/products',
            name: 'ProductList',
            component: ProductList,
        },
        // Add other routes as needed
    ],
});

export default router;