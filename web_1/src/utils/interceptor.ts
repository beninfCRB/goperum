import axios from 'axios';
import AuthStore from '../modules/auth/state';
import { base_url } from '../static/config';

const axiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('authorize');
        config.withCredentials = true;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const response = await axiosInstance.post('/refresh-token');

                const accessToken = response.data.Data;

                localStorage.setItem('authorize', accessToken);

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('authorize')
                localStorage.removeItem('user')
                AuthStore.getState().isAuthenticated = false
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;