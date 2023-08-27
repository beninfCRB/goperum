import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `users`

export const useUser = (id?: string) => {
    return useQuery('UserData', async () => {
        const response = await axiosInstance.get(`${base_url}${module}/${id}`);
        return response.data.Data;
    });
};

export const useUpdateUser = () => {
    return useMutation((props: { id: string, formData: any }) =>
        axiosInstance.post(`${base_url}${module}/${props.id}`, props.formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};

export const useUploadAvatar = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};