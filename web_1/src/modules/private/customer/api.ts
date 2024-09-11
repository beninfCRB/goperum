import { useMutation, useQuery } from "react-query";
import { base_url } from "../../../static/config";
import axiosInstanceJSON from "../../../utils/interceptor-api";

const module = `customers`

export const useAddCustomer = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.post(`${base_url}${module}`, formData));
};

export const useCustomerAll = () => {
    return useQuery('customerData', async () => {
        const response = await axiosInstanceJSON.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useCustomer = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.get(`${base_url}${module}/${id}`));
};

export const useUpdateCustomer = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteCustomer = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.delete(`${base_url}${module}/${id}`));
};

export const useCustomerByUser = () => {
    return useMutation((userid: string) =>
        axiosInstanceJSON.get(`${base_url}${module}/user/${userid}`));
};