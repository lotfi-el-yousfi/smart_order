import axios from 'axios';
import {orderDto} from "../../model/OrderDto";

export const baseUrl = 'http://localhost:8085/order/api'; // this if gatway is not returning cors error
//export const baseUrl = 'http://localhost:8083/api';

export const getorders = async () => {
    console.log(`${baseUrl}/list`)
    return axios.get(`${baseUrl}/list`);
}
export const getorderById = (id: number) => {
    return axios.get(`${baseUrl}/${id}`);
}

export function createorder(order) {
    console.log(order)
    return axios.post(`${baseUrl}/new`, order);
}

export function updateorder(id: number,
                            order: orderDto) {
    return axios.put(`${baseUrl}/update/${id}`, order);
}

