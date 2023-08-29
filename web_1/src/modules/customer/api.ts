import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `customers`

export const useAddCustomer = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData));
};

export const useCustomerAll = () => {
    return useQuery('customerData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useCustomer = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};

export const useUpdateCustomer = () => {
    return useMutation((formData: any) =>
        axiosInstance.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteCustomer = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module} /${id}`), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};