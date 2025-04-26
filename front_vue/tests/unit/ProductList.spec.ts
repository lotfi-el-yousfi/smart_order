// tests/unit/components/ProductList.spec.ts
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import {nextTick} from 'vue';
import {ProductDto} from '@/domain/product/model/ProductDto';
import {useProductStore} from "../../src/domain/product/store/productStore";
import ProductList from "../../src/domain/product/components/ProductList.vue";

const mockProducts: ProductDto[] = [
    {id: 1, name: 'Product 1', price: 10.99, stock: 100, category: 'Category 1'},
    {id: 2, name: 'Product 2', price: 20.50, stock: 50, category: 'Category 2'},
];

describe('ProductList', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('renders product list', async () => {
        const store = useProductStore();
        store.products = mockProducts;

        const wrapper = mount(ProductList);

        await nextTick();

        expect(wrapper.findAll('tbody tr')).toHaveLength(2);
        expect(wrapper.text()).toContain('Product 1');
        expect(wrapper.text()).toContain('$10.99');
    });

    it('fetches products on mount', async () => {
        const store = useProductStore();
        const fetchSpy = vi.spyOn(store, 'fetchProducts');

        mount(ProductList);

        expect(fetchSpy).toHaveBeenCalled();
    });

    it('shows loading state', async () => {
        const store = useProductStore();
        store.isLoading = true;

        const wrapper = mount(ProductList);

        expect(wrapper.find('.v-progress-linear').exists()).toBe(true);
    });

    it('shows error message', async () => {
        const store = useProductStore();
        store.error = 'Test error';

        const wrapper = mount(ProductList);

        expect(wrapper.find('.v-alert').text()).toContain('Test error');
    });

    it('opens form when add button clicked', async () => {
        const wrapper = mount(ProductList);

        await wrapper.find('button').trigger('click');

        expect(wrapper.findComponent({name: 'ProductForm'}).exists()).toBe(true);
    });

    it('calls delete when delete button clicked', async () => {
        const store = useProductStore();
        store.products = mockProducts;
        const deleteSpy = vi.spyOn(store, 'deleteProduct').mockResolvedValue();

        const wrapper = mount(ProductList);
        await nextTick();

        window.confirm = vi.fn(() => true);
        await wrapper.findAll('button')[1].trigger('click');

        expect(deleteSpy).toHaveBeenCalledWith(1);
    });

    it('submits form data correctly', async () => {
        const store = useProductStore();
        const createSpy = vi.spyOn(store, 'createProduct').mockResolvedValue(mockProducts[0]);

        const wrapper = mount(ProductList);
        await wrapper.find('button').trigger('click');

        const form = wrapper.findComponent({name: 'ProductForm'});
        form.vm.$emit('submit', mockProducts[0]);

        await flushPromises();

        expect(createSpy).toHaveBeenCalledWith(mockProducts[0]);
        expect(wrapper.findComponent({name: 'ProductForm'}).exists()).toBe(false);
    });
});