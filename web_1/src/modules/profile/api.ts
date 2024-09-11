import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/config";
import axiosInstanceJSON from "../../utils/interceptor-api";

const module = `users`

export const useUser = () => {
    return useMutation((id: string) =>
        axiosInstanceJSON.get(`${base_url}${module}/private/${id}`));
};

export const useUpdateUser = () => {
    return useMutation((props: { id: string, formData: any }) =>
        axiosInstanceJSON.post(`${base_url}${module}/private/${props.id}`, props.formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};

export const useDownloadAvatar = () => {
    return useQuery('avatar', async (dir: any) => {
        const response = await axiosInstanceJSON.get(`${base_url}${dir}`)
        return response
    })
}

export const useUploadAvatar = () => {
    return useMutation((formData: any) =>
        axiosInstanceJSON.post(`${base_url}${module}`, formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};