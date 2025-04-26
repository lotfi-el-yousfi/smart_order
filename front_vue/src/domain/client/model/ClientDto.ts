import {z} from 'zod';

export interface ClientDto {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    description?: string;
    password?: string;
}

export const ClientSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    email: z.string().email("invalid email"),
    phone: z.string(),
    description: z.string(),
    password: z.string(),
})

