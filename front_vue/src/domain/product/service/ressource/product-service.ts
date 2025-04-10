import axios from 'axios';
import {ProductDto} from "../../model/ProductDto";

export const baseUrl = 'http://localhost:8080/product/api'; // this if gatway is not returning cors error
//export const baseUrl = 'http://localhost:8083/api';

export const getProducts = async () => {
    console.log(`${baseUrl}/list`)
    return axios.get(`${baseUrl}/list`);
}
export const getProductById = (id: number) => {
    return axios.get(`${baseUrl}/${id}`);
}

export function createProduct(product) {
    console.log(product)
    return axios.post(`${baseUrl}/new`, product);
}

export function updateProduct(id: number,
                              product: ProductDto) {
    return axios.put(`${baseUrl}/update/${id}`, product);
}

