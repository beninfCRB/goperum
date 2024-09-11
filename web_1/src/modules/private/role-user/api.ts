import { useMutation, useQuery } from "react-query";
import { base_url } from "../../../static/config";
import axiosInstanceJSON from "../../../utils/interceptor-api";

const module = `role-users`

export const useAddRoleUser = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.post(`${base_url}${module}`, formData));
};

export const useRoleUserAllPrivate = () => {
    return useQuery('RoleUserData', async () => {
        const response = await axiosInstanceJSON.get(`${base_url}${module}`);
        return response.data.Data
    });
};

export const useRoleUserAllPublic = () => {
    return useQuery('RoleUserData', async () => {
        const response = await axiosInstanceJSON.get(`${base_url}public/${module}`);
        return response.data.Data
    });
};

export const useRoleUser = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.get(`${base_url}${module}/${id}`));
};

export const useUpdateRoleUser = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.patch(`${base_url}${module}/${formData?.id}`, formData));
};

export const useDeleteRoleUser = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.delete(`${base_url}${module}/${id}`));
};