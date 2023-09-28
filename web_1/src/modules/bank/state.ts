import { create } from 'zustand';
import { BankType } from '.';

export interface BankState {
    single: BankType,
    multiple: Array<BankType>,
    getAll: (data: Array<BankType>) => void,
    getOne: (data: BankType) => void,
    add: (data: BankType) => void,
    update: (data: BankType) => void,
    delete: () => void
}

const BankStore = create<BankState>((set) => ({
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

export default BankStore