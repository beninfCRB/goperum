import { create } from 'zustand';
import { TypeDPType } from '.';

export interface TypeDPState {
    single: TypeDPType,
    multiple: Array<TypeDPType>,
    getAll: (data: Array<TypeDPType>) => void,
    getOne: (data: TypeDPType) => void,
    add: (data: TypeDPType) => void,
    update: (data: TypeDPType) => void,
    delete: () => void
}

const TypeDPStore = create<TypeDPState>((set) => ({
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

export default TypeDPStore