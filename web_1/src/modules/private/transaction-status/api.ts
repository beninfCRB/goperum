import { useMutation, useQuery } from "react-query";
import { base_url } from "../../../static/config";
import axiosInstanceJSON from "../../../utils/interceptor-api";

const module = `transaction-status`

export const useAddTransactionStatus = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.post(`${base_url}${module}`, formData));
};

export const useTransactionStatusAll = () => {
    return useQuery('TransactionStatusData', async () => {
        const response = await axiosInstanceJSON.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useTransactionStatus = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.get(`${base_url}${module}/${id}`));
};

export const useUpdateTransactionStatus = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteTransactionStatus = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.delete(`${base_url}${module}/${id}`));
};