import { RoleUserType } from "../role-user";

export interface TransactionStatusType {
    id?: string,
    code?: string,
    name?: string,

    RoleUser?: RoleUserType
}