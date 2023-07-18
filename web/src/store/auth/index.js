import axios from 'axios';
import { config } from 'utils/axios_config';
import { base_url } from 'utils/base_url';
import { create } from 'zustand';
import { AuthType } from '../../components/modules/auth/type';

const module = `sessions`

interface AuthState {
    users: Array<AuthType>,
}

const AuthStore = create < AuthState > ((set) => ({
    users: [],
    login: async (email: string, password: string) => {
        const { data } = await axios.get(`${base_url}${module}`, StateAuth, config)
        set({
            users: data.Data
        })
    }
}))

export default AuthStore