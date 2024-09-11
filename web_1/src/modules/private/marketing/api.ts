import { useMutation, useQuery } from "react-query";
import { base_url } from "../../../static/config";
import axiosInstanceJSON from "../../../utils/interceptor-api";

const module = `marketings`

export const useAddMarketing = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.post(`${base_url}${module}`, formData));
};

export const useMarketingAll = () => {
    return useQuery('MarketingData', async () => {
        const response = await axiosInstanceJSON.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useMarketing = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.get(`${base_url}${module}/${id}`));
};

export const useUpdateMarketing = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteMarketing = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.delete(`${base_url}${module}/${id}`));
};

export const useMarketingByUser = () => {
    return useMutation((userid: string) =>
        axiosInstanceJSON.get(`${base_url}${module}/user/${userid}`));
};