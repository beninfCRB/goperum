import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { base_url } from "../../static/base_url";
import AuthStore from "./state";

const module = `sessions`

export const useLogin = () => {
    return useMutation((formData: any) =>
        axios.post(`${base_url}${module}`, formData), {
        onSuccess: (res: any) => {
            return res.data.Data
        }
    });
};

// export const useLogoutMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation(() => {

//     }, {
//         onSuccess: () => {
//             AuthStore.getState().logout()
//             localStorage.removeItem('user');
//             queryClient.invalidateQueries('userData');
//         },
//     });
// };

export const useUserData = () => {
    return useQuery('userData', async () => {
        const response = await axios.get(`${base_url}${'users'}`);
        return response.data.Data;
    }, {
        enabled: AuthStore.getState().isAuthenticated,
    });
};