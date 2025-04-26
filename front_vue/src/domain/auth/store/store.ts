import {defineStore} from "pinia";
import {ref} from "vue";
import {login, register} from "@/domain/auth/service/ressource/AuthService";
import {IUser} from "../model/IUser";
import {logout} from "../service/ressource/AuthService";


export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const loginUser = async (email, password) => {
        loading.value = true;
        error.value = null;
        try {
            user.value = await login(email, password);
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Login failed';
        } finally {
            loading.value = false;
        }
    };

    const registerUser = async (firstname, lastname, phone, email, password) => {
        loading.value = true;
        error.value = null;
        try {
            user.value = await register(firstname, lastname, phone, email, password);
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Register failed';
        } finally {
            loading.value = false;
        }
    };
    const logoutUser = async (email) => {
        loading.value = true;
        error.value = null;
        try {
            await logout(email);
        } catch (err: any) {
            error.value = err.response?.data?.message || 'logout failed';
        } finally {
            loading.value = false;
        }
    };

    return {user, loading, error, loginUser, registerUser};
});