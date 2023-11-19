import { create } from 'zustand';
import { CustomerType } from '.';

export interface CustomerState {
    single: CustomerType,
    multiple: Array<CustomerType>,
    getAll: (data: Array<CustomerType>) => void,
    getOne: (data: CustomerType) => void,
    add: (data: CustomerType) => void,
    update: (data: CustomerType) => void,
    delete: () => void
}

const CustomerStore = create<CustomerState>((set) => ({
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

export default CustomerStore