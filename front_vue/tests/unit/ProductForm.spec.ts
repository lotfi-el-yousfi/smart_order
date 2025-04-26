// tests/unit/components/ProductForm.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductForm from '@/domain/product/components/ProductForm.vue';
import { ProductDto } from '@/domain/product/model/ProductDto';

const mockProduct: ProductDto = {
    id: 1,
    name: 'Test Product',
    price: 10.99,
    stock: 100,
    category: 'Test Category',
    description: 'Test Description',
};

describe('ProductForm', () => {
    it('renders properly in create mode', () => {
        const wrapper = mount(ProductForm, {
            props: {
                product: null,
                isEditing: false,
            },
        });

        expect(wrapper.find('form').exists()).toBe(true);
        expect(wrapper.find('.v-card-title').text()).toBe('Create Product');
    });

    it('renders properly in edit mode', () => {
        const wrapper = mount(ProductForm, {
            props: {
                product: mockProduct,
                isEditing: true,
            },
        });

        expect(wrapper.find('.v-card-title').text()).toBe('Edit Product');
        expect(wrapper.find('input[name="name"]').element.value).toBe(mockProduct.name);
    });

    it('emits submit event with form data', async () => {
        const wrapper = mount(ProductForm, {
            props: {
                product: mockProduct,
                isEditing: true,
            },
        });

        await wrapper.find('input[name="name"]').setValue('Updated Name');
        await wrapper.find('form').trigger('submit.prevent');

        const submitEvents = wrapper.emitted('submit');
        expect(submitEvents).toHaveLength(1);
        expect(submitEvents![0][0]).toEqual({
            ...mockProduct,
            name: 'Updated Name',
        });
    });

    it('emits cancel event', async () => {
        const wrapper = mount(ProductForm, {
            props: {
                product: mockProduct,
                isEditing: true,
            },
        });

        await wrapper.find('button[type="button"]').trigger('click');
        expect(wrapper.emitted('cancel')).toHaveLength(1);
    });

    it('validates required fields', async () => {
        const wrapper = mount(ProductForm, {
            props: {
                product: null,
                isEditing: false,
            },
        });

        await wrapper.find('form').trigger('submit.prevent');

        const nameError = wrapper.find('.v-messages__message');
        expect(nameError.exists()).toBe(true);
        expect(nameError.text()).toContain('Name is required');
    });

    it('resets form when product prop changes', async () => {
        const wrapper = mount(ProductForm, {
            props: {
                product: mockProduct,
                isEditing: true,
            },
        });

        await wrapper.setProps({ product: null });

        expect(wrapper.vm.form.name).toBe('');
        expect(wrapper.vm.form.price).toBe(0);
    });
});