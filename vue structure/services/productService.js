import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.example.com/products' })

export const getProducts = () => api.get('/')
export const getProductById = (id) => api.get(`/${id}`)
export const createProduct = (data) => api.post('/', data)
export const updateProduct = (id, data) => api.put(`/${id}`, data)
export const deleteProduct = (id) => api.delete(`/${id}`)
