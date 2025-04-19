import axios from 'axios';
import {IProduct} from "../../model/IProduct";

export const baseUrl = 'http://localhost:8085/product/api'; // this if gatway is not returning cors error
//export const baseUrl = 'http://localhost:8083/api';

export const getProducts = async () => {
    return axios.get(`${baseUrl}/list`);
}
export const getProductById = (id: number) => {
    return axios.get(`${baseUrl}/${id}`);
}

export function createProduct(product) {

    return axios.post(`${baseUrl}/new`, product);
}

export function updateProduct(id: number,
                              product: IProduct) {
    return axios.put(`${baseUrl}/update/${id}`, product);
}

export function deleteProduct(id: number,
) {

    return axios.delete(`${baseUrl}/delete/${id}`);
}

