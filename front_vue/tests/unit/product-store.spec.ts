// tests/unit/stores/product-store.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from '@/domain/product/store/product-store';
import { ProductDto } from '@/domain/product/model/ProductDto';
import * as productService from '@/domain/product/service/product-service';

vi.mock('@/domain/product/service/product-service');

const mockProducts: ProductDto[] = [
    { id: 1, name: 'Product 1', price: 10.99, stock: 100, category: 'Category 1', description: 'Desc 1' },
    { id: 2, name: 'Product 2', price: 20.50, stock: 50, category: 'Category 2', description: 'Desc 2' },
];

describe('ProductStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.mocked(productService.fetchProducts).mockResolvedValue(mockProducts);
        vi.mocked(productService.fetchProductById).mockResolvedValue(mockProducts[0]);
        vi.mocked(productService.createProduct).mockResolvedValue(mockProducts[0]);
        vi.mocked(productService.updateProduct).mockResolvedValue({ ...mockProducts[0], name: 'Updated' });
        vi.mocked(productService.deleteProduct).mockResolvedValue(undefined);
    });

    it('should initialize with empty state', () => {
        const store = useProductStore();
        expect(store.products).toEqual([]);
        expect(store.currentProduct).toBeNull();
        expect(store.isLoading).toBe(false);
        expect(store.error).toBeNull();
    });

    describe('fetchProducts', () => {
        it('should fetch products and update state', async () => {
            const store = useProductStore();
            await store.fetchProducts();

            expect(store.isLoading).toBe(false);
            expect(store.products).toEqual(mockProducts);
            expect(store.error).toBeNull();
        });

        it('should handle fetch error', async () => {
            vi.mocked(productService.fetchProducts).mockRejectedValue(new Error('Failed'));
            const store = useProductStore();

            await store.fetchProducts();

            expect(store.isLoading).toBe(false);
            expect(store.products).toEqual([]);
            expect(store.error).toBe('Failed to fetch products');
        });
    });

    describe('fetchProductById', () => {
        it('should fetch single product and update state', async () => {
            const store = useProductStore();
            await store.fetchProductById(1);

            expect(store.isLoading).toBe(false);
            expect(store.currentProduct).toEqual(mockProducts[0]);
            expect(store.error).toBeNull();
        });
    });

    describe('createProduct', () => {
        it('should create product and add to list', async () => {
            const store = useProductStore();
            store.products = [...mockProducts];
            const newProduct = { ...mockProducts[0], id: 3 };

            vi.mocked(productService.createProduct).mockResolvedValue(newProduct);
            const result = await store.createProduct(newProduct);

            expect(result).toEqual(newProduct);
            expect(store.products).toContainEqual(newProduct);
            expect(store.error).toBeNull();
        });
    });

    describe('updateProduct', () => {
        it('should update product in list', async () => {
            const store = useProductStore();
            store.products = [...mockProducts];
            const updatedProduct = { ...mockProducts[0], name: 'Updated' };

            const result = await store.updateProduct(1, { name: 'Updated' });

            expect(result).toEqual(updatedProduct);
            expect(store.products.find(p => p.id === 1)?.name).toBe('Updated');
            expect(store.error).toBeNull();
        });

        it('should update currentProduct if it matches', async () => {
            const store = useProductStore();
            store.currentProduct = mockProducts[0];

            await store.updateProduct(1, { name: 'Updated' });

            expect(store.currentProduct?.name).toBe('Updated');
        });
    });

    describe('deleteProduct', () => {
        it('should remove product from list', async () => {
            const store = useProductStore();
            store.products = [...mockProducts];

            await store.deleteProduct(1);

            expect(store.products.some(p => p.id === 1)).toBe(false);
        });

        it('should clear currentProduct if it matches', async () => {
            const store = useProductStore();
            store.currentProduct = mockProducts[0];

            await store.deleteProduct(1);

            expect(store.currentProduct).toBeNull();
        });
    });

    describe('clearError', () => {
        it('should clear error state', () => {
            const store = useProductStore();
            store.error = 'Some error';

            store.clearError();

            expect(store.error).toBeNull();
        });
    });
});