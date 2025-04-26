import {ClientDto, ClientSchema} from "../../model/ClientDto";
import axios from "axios";

const base_url = "localhost:8080/api/client/"

const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('An unexpected error occurred');
};

export const fetchClients = async () => {
    try {
        const response = await axios.get<ClientDto[ ]>(base_url);
        return response.data;
    } catch (err) {
        handleError(err)
    }
}
export const fetchClientById = async (id: number) => {
    try {
        const response = await axios.get<ClientDto>(`${base_url}/${id}`)
        return response.data;
    } catch (err) {
        throw new Error(err)
    }
}
export const createClient = async (client: Omit<ClientDto, "id">): Promise<ClientDto> => {
    try {
        ClientSchema.parse(client)
        const response = await axios.post<ClientDto>(base_url, client);
        return response.data;
    } catch (err) {
        handleError(err)
    }
}
export const updateClient = async (id: number, client: Partial<ClientDto>): Promise<ClientDto> => {
    try {
        ClientSchema.partial().parse(client)
        const response = await axios.put<ClientDto>(`${base_url}/${id}`, client);
        return response.data;
    } catch (err) {
        handleError(err)
    }
}
export const deleteClient = async (id: number): Promise<void> => {
    try {
        const response = await axios.delete<void>(base_url);
        return response.data;
    } catch (err) {
        handleError(err)
    }
}



