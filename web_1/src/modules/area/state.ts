import { create } from 'zustand';
import { AreaType } from '.';

export interface AreaState {
    single: AreaType,
    multiple: Array<AreaType>,
    getAll: (data: Array<AreaType>) => void,
    getOne: (data: AreaType) => void,
    add: (data: AreaType) => void,
    update: (data: AreaType) => void,
    delete: () => void
}

const AreaStore = create<AreaState>((set) => ({
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

export default AreaStore