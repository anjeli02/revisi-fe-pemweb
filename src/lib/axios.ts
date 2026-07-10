import axios, {AxiosError} from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
    },
})

// menambahkan token di header
api.interceptors.request.use(
    (config) => {
        const  token  = useAuthStore.getState().token;

        // jika ada token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// default error
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // panggil fungsi logout
            useAuthStore.getState().logout();

            window.dispatchEvent(new Event('auth:unauthorization'));
        }
        return Promise.reject(error);
    }
);