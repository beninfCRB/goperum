import { RoleUserType } from "../role-user";

export interface ApprovalStatusType {
    id?: string,
    code?: string,
    name?: string,

    RoleUser?: RoleUserType
}