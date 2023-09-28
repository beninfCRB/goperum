import { create } from 'zustand';
import { ApprovalStatusType } from '.';

export interface ApprovalStatusState {
    single: ApprovalStatusType,
    multiple: Array<ApprovalStatusType>,
    getAll: (data: Array<ApprovalStatusType>) => void,
    getOne: (data: ApprovalStatusType) => void,
    add: (data: ApprovalStatusType) => void,
    update: (data: ApprovalStatusType) => void,
    delete: () => void
}

const ApprovalStatusStore = create<ApprovalStatusState>((set) => ({
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

export default ApprovalStatusStore