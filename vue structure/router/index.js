import {createRouter, createWebHistory} from 'vue-router'
import ProductLayout from '@/components/ProductLayout.vue'
import ProductList from '@/views/ProductList.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import ProductEdit from '@/views/ProductEdit.vue'
import ProductCreate from '@/views/ProductCreate.vue'

const routes = [
    {
        path: '/products',
        component: ProductLayout,
        children: [
            {path: '', component: ProductList},
            {path: 'create', component: ProductCreate},
            {path: ':id', component: ProductDetails, props: true},
            {path: ':id/edit', component: ProductEdit, props: true}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
