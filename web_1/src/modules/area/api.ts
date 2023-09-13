import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `areas`

export const useAddArea = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData));
};

export const useAreaAll = () => {
    return useQuery('AreaData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useArea = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};

export const useUpdateArea = () => {
    return useMutation((formData: any) =>
        axiosInstance.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteArea = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module}/${id}`));
};