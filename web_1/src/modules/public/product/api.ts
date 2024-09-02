import { useMutation, useQuery } from "react-query";
import { base_url } from "../../../static/config";
import axiosInstance from "../../../utils/interceptor";

const module = `public/products`


export const useProductAll = () => {
    return useQuery('ProductData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useProduct = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};
