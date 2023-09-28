import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const login = `sessions`
const logout = `logout`
const user = `users`
const verifyEmail = `verify-email`
const forgotPassword = `forgot-password`
const newPassword = `new-password`

export const useLogin = () => {
    return useMutation((values: any) =>
        axiosInstance.post(`${base_url}${login}`, values), {
        onSuccess: (res: any) => {
            localStorage.setItem('authorize', res.data.Data.access_token)
            localStorage.setItem('user', JSON.stringify(res.data.Data))
            return res.data.Data
        }
    });
};

export const useRegisterPublic = () => {
    return useMutation((values: any) =>
        axiosInstance.post(`${base_url}${user}`, values));
};

export const useVerifyEmail = () => {
    return useMutation((values: any) =>
        axiosInstance.post(`${base_url}${verifyEmail}`, values));
};

export const useReVerifyEmail = () => {
    return useMutation((values: any) =>
        axiosInstance.post(`${base_url}re-${verifyEmail}`, values));
};

export const useForgotPassword = () => {
    return useMutation((values: any) =>
        axiosInstance.post(`${base_url}${forgotPassword}`, values));
}


export const useNewPassword = () => {
    return useMutation(({ reset_code, ...values }: any) =>
        axiosInstance.post(`${base_url}${newPassword}/${reset_code}`, values));
}

export const useLogout = () => {
    axiosInstance.post(`${base_url}${logout}`)
    localStorage.removeItem('authorize')
    localStorage.removeItem('user')
};