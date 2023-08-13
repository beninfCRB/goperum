import { create } from 'zustand';

export interface AuthState {
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void
}


const AuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: async () => set({
        isAuthenticated: true
    }),
    logout: () => set({
        isAuthenticated: false
    })
}))

export default AuthStore;