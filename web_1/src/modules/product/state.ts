import { create } from 'zustand';
import { ProductType } from '.';

export interface ProductState {
    single: ProductType,
    multiple: Array<ProductType>,
    getAll: (data: Array<ProductType>) => void,
    getOne: (data: ProductType) => void,
    add: (data: ProductType) => void,
    update: (data: ProductType) => void,
    delete: () => void
}

const ProductStore = create<ProductState>((set) => ({
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

export default ProductStore