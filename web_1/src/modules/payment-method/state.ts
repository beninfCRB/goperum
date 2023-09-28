import { create } from 'zustand';
import { PaymentMethodType } from '.';

export interface PaymentMethodState {
    single: PaymentMethodType,
    multiple: Array<PaymentMethodType>,
    getAll: (data: Array<PaymentMethodType>) => void,
    getOne: (data: PaymentMethodType) => void,
    add: (data: PaymentMethodType) => void,
    update: (data: PaymentMethodType) => void,
    delete: () => void
}

const PaymentMethodStore = create<PaymentMethodState>((set) => ({
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

export default PaymentMethodStore