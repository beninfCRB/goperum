import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `payments`

export const useAddPayment = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData));
};

export const usePaymentAll = () => {
    return useQuery('PaymentData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const usePayment = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};

export const useUpdatePayment = () => {
    return useMutation((formData: any) =>
        axiosInstance.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeletePayment = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module}/${id}`));
};