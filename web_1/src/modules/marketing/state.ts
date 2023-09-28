import { create } from 'zustand';
import { MarketingType } from '.';

export interface MarketingState {
    single: MarketingType,
    multiple: Array<MarketingType>,
    getAll: (data: Array<MarketingType>) => void,
    getOne: (data: MarketingType) => void,
    add: (data: MarketingType) => void,
    update: (data: MarketingType) => void,
    delete: () => void
}

const MarketingStore = create<MarketingState>((set) => ({
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

export default MarketingStore