import { useMutation, useQuery } from "react-query";
import { base_url } from "../../../static/config";
import axiosInstance from "../../../utils/interceptor";

const module = `type-down-payments`

export const useAddTypeDP = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData));
};

export const useTypeDPAll = () => {
    return useQuery('TypeDPData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useTypeDP = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};

export const useUpdateTypeDP = () => {
    return useMutation((formData: any) =>
        axiosInstance.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteTypeDP = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module}/${id}`));
};