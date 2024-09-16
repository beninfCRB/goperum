import axios from 'axios';
import AuthStore from '../modules/auth/state';
import { base_url } from '../static/config';

const axiosInstanceFormData = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
});

axiosInstanceFormData.interceptors.request.use(
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

axiosInstanceFormData.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const response = await axiosInstanceFormData.post('/refresh-token');

                const accessToken = response.data.Data;

                localStorage.setItem('authorize', accessToken);

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return axiosInstanceFormData(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('authorize')
                AuthStore.getState().isAuthenticated = false
                window.location.replace('/login')
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstanceFormData