import axios from 'axios';
import { create } from 'zustand';
import { base_url } from '../../static/base_url';
import { AuthType } from '.';

const module = `sessions`

interface AuthState {
    users: AuthType,
    login: (params: AuthState) => void
}

const AuthStore = create<AuthState>((set) => ({
    users: [],
    login: async (params: any) => {
        try {
            const { data } = await axios.post(`${base_url}${module}`, params)
            localStorage.setItem('user', JSON.stringify(data.Data))
            set({
                users: data.Data
            })
        } catch (error) {
            return error
        }
    }
}))

export default AuthStore