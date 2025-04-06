import axios from 'axios';
import {ProductDto} from "../../model/ProductDto";


export default class ProductService {
    public static async getProducts(): Promise<ProductDto> {
        //return await axios.get('/api/products');
        return await axios.get(
            'http://localhost:8083/api/product/list');
    }


}