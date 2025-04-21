import axios from 'axios';
import {OrderDto} from "../../model/OrderDto";


export const baseUrl = 'http://localhost:8085/order/api/orders';


export const getOrders = async () => {
    const response =
        await axios.get<OrderDto[]>(`${baseUrl}`);
    return response.data;
}
export const getOrderById = async (id: number) => {
    const response =
        await axios.get<OrderDto>(`${baseUrl}/${id}`);
    return response.data;
}
export const createOrder = async (order: OrderDto) => {
    const response =
        await axios.post<OrderDto>(`${baseUrl}`, order);
    return response.data;
}
export const updateOrder = async (id: number, order: OrderDto) => {
    const response =
        await axios.put<OrderDto>(`${baseUrl}/${id}`, order);
    return response.data;
}
export const deleteOrder = async (id: number) => {
    const response =
        await axios.delete<OrderDto>(`${baseUrl}/${id}`);
    return response.data;
}

