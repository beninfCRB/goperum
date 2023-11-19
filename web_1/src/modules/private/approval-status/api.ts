import { useMutation, useQuery } from "react-query";
import { base_url } from "../../../static/config";
import axiosInstance from "../../../utils/interceptor";

const module = `approval-status`

export const useAddApprovalStatus = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData));
};

export const useApprovalStatusAll = () => {
    return useQuery('ApprovalStatusData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useApprovalStatus = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/${id}`));
};

export const useUpdateApprovalStatus = () => {
    return useMutation((formData: any) =>
        axiosInstance.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteApprovalStatus = () => {
    return useMutation((id: string) =>
        axiosInstance.delete(`${base_url}${module}/${id}`));
};