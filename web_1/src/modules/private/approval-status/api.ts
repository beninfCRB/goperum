import { useMutation, useQuery } from "react-query";
import { base_url } from "../../../static/config";
import axiosInstanceJSON from "../../../utils/interceptor-api";

const module = `approval-status`

export const useAddApprovalStatus = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.post(`${base_url}${module}`, formData));
};

export const useApprovalStatusAll = () => {
    return useQuery('ApprovalStatusData', async () => {
        const response = await axiosInstanceJSON.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useApprovalStatus = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.get(`${base_url}${module}/${id}`));
};

export const useUpdateApprovalStatus = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteApprovalStatus = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.delete(`${base_url}${module}/${id}`));
};