import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `transaction-status`

export const useAddTransactionStatus = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData));
};

export const useTransactionStatusAll = () => {
    return useQuery('TransactionStatusData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useTransactionStatus = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};

export const useUpdateTransactionStatus = () => {
    return useMutation((formData: any) =>
        axiosInstance.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteTransactionStatus = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module}/${id}`));
};