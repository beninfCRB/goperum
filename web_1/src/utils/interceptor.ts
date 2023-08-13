import axios from 'axios';
import AuthStore from '../modules/auth/state';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_API_KEY,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('tk_a');
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
        const refreshToken = getCookie('tk_r');

        if (
            error.response.status === 401 && // Unauthorized
            refreshToken &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const response = await axiosInstance.post('/refresh-token', {
                    refreshToken,
                });

                const { accessToken } = response.data;

                setCookie('tk_a', accessToken);
                setCookie('tk_r', refreshToken)

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {

                removeCookie('tk_a')
                removeCookie('tk_r')
                AuthStore.getState().isAuthenticated = false
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;