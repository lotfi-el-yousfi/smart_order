import { Status } from "./status";

export interface OrderDto {
    id: number;
    name?: string;
    price?: number;
    status?: Status;
    user?: string;
    product?: string;
}