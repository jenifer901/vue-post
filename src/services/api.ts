import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

// interceptor añadir token a las llamadas
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Errores globales
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // 401 (no autorizado)
        if (error.response?.status === 401) {
            localStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
        }

        return Promise.reject(error);
    }
);