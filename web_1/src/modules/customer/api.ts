import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `customers`

export const useAddCustomer = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};

export const useCustomerAll = () => {
    return useQuery('customerData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useCustomer = (id?: string) => {
    return useQuery('customerData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}/${id}`);
        return response.data.Data;
    });
};

export const useUpdateCustomer = () => {
    return useMutation((props: { id: string, formData: any }) =>
        axiosInstance.post(`${base_url}${module}/${props.id}`, props.formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};

export const useDeleteCustomer = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module}/${id}`), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};