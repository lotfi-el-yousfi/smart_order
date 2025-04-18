import {defineStore} from 'pinia'

import {deleteProduct, getProductById, getProducts, updateProduct} from "../service/ressource/product-service";
import {Product} from "../model/Product";

export const useproductStore = defineStore('productStore', {
    state: () => ({
        products: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchProducts() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getProducts();

                const data = await response.data;
                this.products = data;
                console.log('Fetched products:', data);
                this.loading = false;
            } catch (error: any) {
                this.error = error.message || 'Failed to fetch products';
                this.loading = false;
                console.error('Error fetching products:', error);
            }
        },
        updateProduct(updatedProduct: Product): any {
            this.loading = true
            updateProduct(updatedProduct.id, updatedProduct)
                .then(() => {

                    //update in the list of products
                    let p: Product | undefined = this.products.find((p) => p.id === updatedProduct.id);
                    if (p) {
                        p.name = updatedProduct.name;
                        p.price = updatedProduct.price;
                        p.description = updatedProduct.description;
                    }
                    this.loading = false
                    this.error = null;
                }).catch((error) => {
                this.error = error
                this.loading = false
            })
        },
        fetchProductById(id: number) {
            this.loading = true
            getProductById(id).then((product) => {
                this.products.push(product)

                this.loading = false
                this.error = null;
            }).catch((error) => {
                this.error = error
                this.loading = false
            })
        }
        , deleteProductById(id: number) {
            this.loading = true
            deleteProduct(id).then((
                product) => {
                this.loading = false
                this.error = null;
                this.products = this.products.filter(product => product.id !== id);            }).catch((error) => {
                this.error = error
                this.loading = false
            })
        }
        ,
    }
})
