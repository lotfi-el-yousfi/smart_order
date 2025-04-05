import axios from 'axios';
import {ProductDto} from "../../model/ProductDto";


export default class ProductService {
    public async getProducts(): Promise<ProductDto> {
        return await axios.get('/api/products');
    }
}