// tests/integration/product-crud.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { nextTick } from 'vue';
import ProductListView from '@/domain/product/components/ProductListView.vue';
import { useProductStore } from '@/domain/product/store/product-store';
import * as productService from '@/domain/product/service/product-service';

vi.mock('@/domain/product/service/product-service');

const mockProducts = [
    { id: 1, name: 'Product 1', price: 10.99, stock: 100, category: 'Category 1' },
    { id: 2, name: 'Product 2', price: 20.50, stock: 50, category: 'Category 2' },
];

describe('Product CRUD Integration', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.mocked(productService.fetchProducts).mockResolvedValue(mockProducts);
        vi.mocked(productService.createProduct).mockImplementation(async (p) => ({ ...p, id: 3 }));
        vi.mocked(productService.updateProduct).mockImplementation(async (id, p) => ({ ...mockProducts[0], ...p }));
        vi.mocked(productService.deleteProduct).mockResolvedValue(undefined);
    });

    it('completes full CRUD cycle', async () => {
        const wrapper = mount(ProductListView);
        await flushPromises();

        // Verify initial load
        expect(wrapper.findAll('tbody tr')).toHaveLength(2);

        // Add new product
        await wrapper.find('button').trigger('click');
        const form = wrapper.findComponent({ name: 'ProductForm' });
        await form.vm.$emit('submit', {
            name: 'New Product',
            price: 30.00,
            stock: 75,
            category: 'New Category'
        });
        await flushPromises();

        expect(productService.createProduct).toHaveBeenCalled();
        expect(wrapper.text()).toContain('New Product');

        // Edit product
        await wrapper.findAll('button')[0].trigger('click'); // Edit first product
        await wrapper.findComponent({ name: 'ProductForm' }).vm.$emit('submit', {
            ...mockProducts[0],
            name: 'Updated Product'
        });
        await flushPromises();

        expect(productService.updateProduct).toHaveBeenCalled();
        expect(wrapper.text()).toContain('Updated Product');

        // Delete product
        window.confirm = vi.fn(() => true);
        await wrapper.findAll('button')[1].trigger('click'); // Delete first product
        await flushPromises();

        expect(productService.deleteProduct).toHaveBeenCalledWith(1);
        expect(wrapper.text()).not.toContain('Updated Product');
    });
});