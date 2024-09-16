import { useMutation, useQuery } from "react-query";
import { base_url, url_file } from "../../../static/config";
import axiosInstanceFormData from "../../../utils/interceptor-formdata";

const module = `products`

export const useAddProduct = () => {
    return useMutation((formData: any) =>
        axiosInstanceFormData.post(`${base_url}${module}`, formData));
};

export const useProductAll = () => {
    return useQuery('ProductData', async () => {
        const response = await axiosInstanceFormData.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useProduct = () => {
    return useMutation((id: string) =>
        axiosInstanceFormData.get(`${base_url}${module}/${id}`));
};

export const useUpdateProduct = () => {
    return useMutation((value: { id: string, formData: any }) =>
        axiosInstanceFormData.patch(`${base_url}${module}/${value?.id}`, value.formData));
};

export const useDeleteProduct = () => {
    return useMutation((id: string) =>
        axiosInstanceFormData.delete(`${base_url}${module}/${id}`));
};

export const useProductImage = () => {
    return useMutation((id: string) =>
        axiosInstanceFormData.get(`${base_url}${module}/stream/${id}`));
};
