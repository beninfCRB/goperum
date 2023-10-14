import { create } from 'zustand';
import { PaymentType } from '.';

export interface PaymentState {
    single: PaymentType,
    multiple: Array<PaymentType>,
    getAll: (data: Array<PaymentType>) => void,
    getOne: (data: PaymentType) => void,
    add: (data: PaymentType) => void,
    update: (data: PaymentType) => void,
    delete: () => void
}

const PaymentStore = create<PaymentState>((set) => ({
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

export default PaymentStore