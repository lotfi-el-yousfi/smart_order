export interface ProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;
}

import {z} from 'zod';
export const ProductSchema = z.object({
    id: z.number().positive().optional(),
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    category: z.string().min(2).max(50),
});