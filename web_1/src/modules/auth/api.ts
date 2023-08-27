import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import AuthStore from "./state";
import axiosInstance from "../../utils/interceptor";

const login = `sessions`
const logout = `logout`
const user = `users`

export const useLogin = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${login}`, formData), {
        onSuccess: (res: any) => {
            localStorage.setItem('authorize', res.data.Data.access_token)
            return res.data.Data
        }
    });
};

export const useLogout = () => {
    axiosInstance.post(`${base_url}${logout}`)
    localStorage.removeItem('authorize')
};

export const useUserData = () => {
    return useQuery('userData', async () => {
        await axiosInstance.get(`${base_url}${user}`);
    }, {
        onSuccess: (res: any) => {
            return res.data.Data
        },
        enabled: AuthStore.getState().isAuthenticated,
    });
};