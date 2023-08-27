import { create } from 'zustand';
import { UserType } from '.';

export interface UserState {
    single: UserType,
    getOne: (data: UserType) => void,
    update: (data: UserType) => void,
}

const UserStore = create<UserState>((set) => ({
    single: {},
    getOne: (data) => set({
        single: data
    }),
    update: (values) => set({
        single: values
    }),
}))

export default UserStore