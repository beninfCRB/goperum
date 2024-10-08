import { RoleUserType } from "../private/role-user";

export interface UserType {
    id?: string,
    name?: string
    email?: string;
    password?: string;
    avatar?: string;
    RoleUser?: RoleUserType;
}