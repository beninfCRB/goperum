import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `purchase-methods`

export const useAddPurchaseMethod = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData));
};

export const usePurchaseMethodAll = () => {
    return useQuery('PurchaseMethodData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const usePurchaseMethod = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};

export const useUpdatePurchaseMethod = () => {
    return useMutation((formData: any) =>
        axiosInstance.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeletePurchaseMethod = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module}/${id}`));
};