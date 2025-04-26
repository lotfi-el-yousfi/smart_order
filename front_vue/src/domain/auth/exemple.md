// src/models/User.ts
export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
}

// src/services/authService.ts
import axios from 'axios';
import {User} from '@/models/User';

const API_URL = '/api/auth';

export const login = async (email: string, password: string): Promise<User> => {
    const response = await axios.post(`${API_URL}/login`, {email, password});
    return response.data;
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
    const response = await axios.post(`${API_URL}/register`, {name, email, password});
    return response.data;
};

// src/store/authStore.ts
import {defineStore} from 'pinia';
import {ref} from 'vue';
import {User} from '@/models/User';
import * as authService from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const loginUser = async (email: string, password: string) => {
        loading.value = true;
        error.value = null;
        try {
            user.value = await authService.login(email, password);
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Login failed';
        } finally {
            loading.value = false;
        }
    };

    const registerUser = async (name: string, email: string, password: string) => {
        loading.value = true;
        error.value = null;
        try {
            user.value = await authService.register(name, email, password);
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Register failed';
        } finally {
            loading.value = false;
        }
    };

    return {user, loading, error, loginUser, registerUser};
});

// src/composables/useAuth.ts
import {useAuthStore} from '@/store/authStore';

export function useAuth() {
    const auth = useAuthStore();
    return {
        user: auth.user,
        loading: auth.loading,
        error: auth.error,
        loginUser: auth.loginUser,
        registerUser: auth.registerUser
    };
}

// src/views/LoginView.vue
<template>
    <v-form
@submit.prevent
= "onLogin" >
    <v-text - field
v - model = "email"
label = "Email"
required / >
<v-text - field
v - model = "password"
label = "Password"
type = "password"
required / >
<v-btn
:
loading = "loading"
type = "submit" > Login < /v-btn>
    < p
v -
if= "error" > {{
    error
}
}
</p>
< /v-form>
< /template>

< script
lang = "ts"
setup >
import {ref} from 'vue';
import {useAuth} from '@/composables/useAuth';

const email = ref('');
const password = ref('');
const {loginUser, loading, error} = useAuth();

const onLogin = () => {
    loginUser(email.value, password.value);
};
</script>

// src/views/RegisterView.vue
< template >
<v-form
@submit.prevent
= "onRegister" >
    <v-text - field
v - model = "name"
label = "Name"
required / >
<v-text - field
v - model = "email"
label = "Email"
required / >
<v-text - field
v - model = "password"
label = "Password"
type = "password"
required / >
<v-btn
:
loading = "loading"
type = "submit" > Register < /v-btn>
    < p
v -
if= "error" > {{
    error
}
}
</p>
< /v-form>
< /template>

< script
lang = "ts"
setup >
import {ref} from 'vue';
import {useAuth} from '@/composables/useAuth';

const name = ref('');
const email = ref('');
const password = ref('');
const {registerUser, loading, error} = useAuth();

const onRegister = () => {
    registerUser(name.value, email.value, password.value);
};
</script>

// tests/unit/authService.spec.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as authService from '@/services/authService';

describe('authService', () => {
    const mock = new MockAdapter(axios);

    it('logs in user', async () => {
        const mockData = {id: 1, name: 'John', email: 'john@example.com', token: 'abc123'};
        mock.onPost('/api/auth/login').reply(200, mockData);
        const user = await authService.login('john@example.com', 'password');
        expect(user).toEqual(mockData);
    });

    it('registers user', async () => {
        const mockData = {id: 2, name: 'Jane', email: 'jane@example.com', token: 'xyz456'};
        mock.onPost('/api/auth/register').reply(200, mockData);
        const user = await authService.register('Jane', 'jane@example.com', 'password');
        expect(user).toEqual(mockData);
    });
});
