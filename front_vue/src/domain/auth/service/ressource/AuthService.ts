import axios from "axios";
import {IUser} from "../../model/IUser";


export const login = async (email, password) => {
    const response =
        await axios.post<IUser>("/auth/login",
            login);
    return response.data;
}
export const register = async (firstname, lastname, phone, email, password) => {
    const response =
        await axios.post<IUser>("/auth/register", register);
    return response.data;
}
export const logout = async (email) => {
    const response =
        await axios.post<void>("/auth/logout", email);

}