import { defineStore } from 'pinia'
import * as productService from '@/services/productService'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        selectedProduct: null
    }),
    actions: {
        async fetchProducts() {
            const res = await productService.getProducts()
            this.products = res.data
        },
        async fetchProduct(id) {
            const res = await productService.getProductById(id)
            this.selectedProduct = res.data
        }
    }
})
