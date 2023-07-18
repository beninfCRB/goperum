import axios from 'axios';
import { config } from 'utils/axios_config';
import { base_url } from 'utils/base_url';
import { create } from 'zustand';

const module = `sessions`

const StateAuth = {
    username, password
}

const AuthStore = create((set) => ({
    users: [],
    login: async (StateAuth) => {
        const { data } = await axios.get(`${base_url}${module}`, StateAuth, config)
        set({
            users:data.Data
        })
    }
}))

export default AuthStore