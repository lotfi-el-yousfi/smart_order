
import {defineStore, acceptHMRUpdate} from 'pinia';
import {ref} from 'vue';
import {ProductDto} from '../model/ProductDto';
import * as productService from '../service/product-service';

export const useProductStore = defineStore('ProductStore', () => {
    const products = ref<ProductDto[]>([]);
    const currentProduct = ref<ProductDto | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const clearError = () => {
        error.value = null;
    };

    const fetchProducts = async () => {
        isLoading.value = true;
        clearError();
        try {
            products.value = await productService.fetchProducts();
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch products';
        } finally {
            isLoading.value = false;
        }
    };

    const fetchProductById = async (id: number) => {
        isLoading.value = true;
        clearError();
        try {
            currentProduct.value = await productService.fetchProductById(id);
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch product';
        } finally {
            isLoading.value = false;
        }
    };

    const createProduct = async (product: Omit<ProductDto, 'id'>) => {
        isLoading.value = true;
        clearError();
        try {
            const createdProduct = await productService.createProduct(product);
            products.value.push(createdProduct);
            return createdProduct;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to create product';
            throw err; // Re-throw for component handling
        } finally {
            isLoading.value = false;
        }
    };

    const updateProduct = async (id: number, product: Partial<ProductDto>) => {
        isLoading.value = true;
        clearError();
        try {
            const updatedProduct = await productService.updateProduct(id, product);
            products.value = products.value.map(p =>
                p.id === updatedProduct.id ? updatedProduct : p
            );
            if (currentProduct.value?.id === updatedProduct.id) {
                currentProduct.value = updatedProduct;
            }
            return updatedProduct;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to update product';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteProduct = async (id: number) => {
        isLoading.value = true;
        clearError();
        try {
            await productService.deleteProduct(id);
            products.value = products.value.filter(p => p.id !== id);
            if (currentProduct.value?.id === id) {
                currentProduct.value = null;
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete product';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        products,
        currentProduct,
        isLoading,
        error,
        clearError,
        fetchProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
});

// Enable HMR
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}