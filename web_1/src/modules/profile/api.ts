import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstance from "../../utils/interceptor";

const module = `users`

export const useUser = () => {
    return useMutation((id: string) =>
        axiosInstance.get(`${base_url}${module}/private/${id}`));
};

export const useUpdateUser = () => {
    return useMutation((props: { id: string, formData: any }) =>
        axiosInstance.post(`${base_url}${module}/private/${props.id}`, props.formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};

export const useDownloadAvatar = () => {
    return useQuery('avatar', async (dir: any) => {
        const response = await axiosInstance.get(`${base_url}${dir}`)
        return response
    })
}

export const useUploadAvatar = () => {
    return useMutation((formData: any) =>
        axiosInstance.post(`${base_url}${module}`, formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};