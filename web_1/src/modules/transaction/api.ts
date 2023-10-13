import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `transactions`

export const useAddTransaction = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData));
};

export const useTransactionAll = () => {
    return useQuery('TransactionData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useTransaction = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};

export const useUpdateTransaction = () => {
    return useMutation((formData: any) =>
        axiosInstance.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteTransaction = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module}/${id}`));
};