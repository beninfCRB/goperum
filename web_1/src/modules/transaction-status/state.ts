import { create } from 'zustand';
import { TransactionStatusType } from '.';

export interface TransactionStatusState {
    single: TransactionStatusType,
    multiple: Array<TransactionStatusType>,
    getAll: (data: Array<TransactionStatusType>) => void,
    getOne: (data: TransactionStatusType) => void,
    add: (data: TransactionStatusType) => void,
    update: (data: TransactionStatusType) => void,
    delete: () => void
}

const TransactionStatusStore = create<TransactionStatusState>((set) => ({
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

export default TransactionStatusStore