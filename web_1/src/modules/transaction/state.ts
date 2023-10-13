import { create } from 'zustand';
import { TransactionType } from '.';

export interface TransactionState {
    single: TransactionType,
    multiple: Array<TransactionType>,
    getAll: (data: Array<TransactionType>) => void,
    getOne: (data: TransactionType) => void,
    add: (data: TransactionType) => void,
    update: (data: TransactionType) => void,
    delete: () => void
}

const TransactionStore = create<TransactionState>((set) => ({
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

export default TransactionStore