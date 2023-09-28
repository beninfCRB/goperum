import { RoleUserType } from "../role-user";

export interface UserType {
    id?: string,
    name?: string
    email?: string;
    password?: string;
    avatar?: string;
    RoleUser?: RoleUserType;
}