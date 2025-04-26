// tests/unit/services/product-service.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { ProductDto } from '@/domain/product/model/ProductDto';
import * as productService from '@/domain/product/service/product-service';

vi.mock('axios');

const mockProducts: ProductDto[] = [
    { id: 1, name: 'Product 1', price: 10.99, stock: 100, category: 'Category 1', description: 'Desc 1' },
    { id: 2, name: 'Product 2', price: 20.50, stock: 50, category: 'Category 2', description: 'Desc 2' },
];

describe('ProductService', () => {
    beforeEach(() => {
        vi.mocked(axios.get).mockReset();
        vi.mocked(axios.post).mockReset();
        vi.mocked(axios.put).mockReset();
        vi.mocked(axios.delete).mockReset();
    });

    describe('fetchProducts', () => {
        it('should fetch products successfully', async () => {
            vi.mocked(axios.get).mockResolvedValue({ data: mockProducts });

            const result = await productService.fetchProducts();
            expect(result).toEqual(mockProducts);
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/products'));
        });

        it('should handle fetch error', async () => {
            vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));

            await expect(productService.fetchProducts()).rejects.toThrow('Network error');
        });
    });

    describe('fetchProductById', () => {
        it('should fetch a single product', async () => {
            vi.mocked(axios.get).mockResolvedValue({ data: mockProducts[0] });

            const result = await productService.fetchProductById(1);
            expect(result).toEqual(mockProducts[0]);
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/products/1'));
        });
    });

    describe('createProduct', () => {
        it('should create a new product', async () => {
            const newProduct = { ...mockProducts[0], id: undefined };
            vi.mocked(axios.post).mockResolvedValue({ data: mockProducts[0] });

            const result = await productService.createProduct(newProduct);
            expect(result).toEqual(mockProducts[0]);
            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/products'), newProduct);
        });

        it('should validate product before creation', async () => {
            const invalidProduct = { name: '', price: -10 } as any;

            await expect(productService.createProduct(invalidProduct)).rejects.toThrow();
            expect(axios.post).not.toHaveBeenCalled();
        });
    });

    describe('updateProduct', () => {
        it('should update an existing product', async () => {
            const updatedProduct = { ...mockProducts[0], name: 'Updated Name' };
            vi.mocked(axios.put).mockResolvedValue({ data: updatedProduct });

            const result = await productService.updateProduct(1, { name: 'Updated Name' });
            expect(result).toEqual(updatedProduct);
            expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('/products/1'), { name: 'Updated Name' });
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product', async () => {
            vi.mocked(axios.delete).mockResolvedValue({});

            await productService.deleteProduct(1);
            expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/products/1'));
        });
    });
});