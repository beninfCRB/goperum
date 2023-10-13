import { create } from 'zustand';
import { PurchaseMethodType } from '.';

export interface PurchaseMethodState {
    single: PurchaseMethodType,
    multiple: Array<PurchaseMethodType>,
    getAll: (data: Array<PurchaseMethodType>) => void,
    getOne: (data: PurchaseMethodType) => void,
    add: (data: PurchaseMethodType) => void,
    update: (data: PurchaseMethodType) => void,
    delete: () => void
}

const PurchaseMethodStore = create<PurchaseMethodState>((set) => ({
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

export default PurchaseMethodStore