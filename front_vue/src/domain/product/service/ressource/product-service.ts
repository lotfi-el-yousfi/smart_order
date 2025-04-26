// src/domain/product/service/client-service.ts
import axios from 'axios';
import { ProductDto } from '../model/ProductDto';
import { ProductSchema } from '../model/ProductDto';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;

const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('An unexpected error occurred');
};

export const fetchProducts = async (): Promise<ProductDto[]> => {
    try {
        const response = await axios.get<ProductDto[]>(PRODUCTS_ENDPOINT);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchProductById = async (id: number): Promise<ProductDto> => {
    try {
        const response = await axios.get<ProductDto>(`${PRODUCTS_ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createProduct = async (product: Omit<ProductDto, 'id'>): Promise<ProductDto> => {
    try {
        ProductSchema.parse(product); // Validate before sending
        const response = await axios.post<ProductDto>(PRODUCTS_ENDPOINT, product);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateProduct = async (id: number, product: Partial<ProductDto>): Promise<ProductDto> => {
    try {
        ProductSchema.partial().parse(product); // Validate partial update
        const response = await axios.put<ProductDto>(`${PRODUCTS_ENDPOINT}/${id}`, product);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${PRODUCTS_ENDPOINT}/${id}`);
    } catch (error) {
        handleError(error);
    }
};