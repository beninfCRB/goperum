import { create } from 'zustand';
import { RoleUserType } from '.';

export interface RoleUserState {
    single: RoleUserType,
    multiple: Array<RoleUserType>,
    getAll: (data: Array<RoleUserType>) => void,
    getOne: (data: RoleUserType) => void,
    add: (data: RoleUserType) => void,
    update: (data: RoleUserType) => void,
    delete: () => void
}

const RoleUserStore = create<RoleUserState>((set) => ({
    single: {},
    multiple: [],
    getAll: (data) => set({
        multiple: data
    }),
    getOne: (data) => set({
        single: data
    }),
    add: (values) => set({
        multiple: [
            values
        ]
    }),
    update: (values) => set({
        single: values
    }),
    delete: () => set({
        single: {}
    })
}))

export default RoleUserStore