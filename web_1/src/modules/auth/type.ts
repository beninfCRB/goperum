export interface AuthType {
    id?: string;
    name?: string
    email?: string;
    password?: string;
    access_token?: string,
    refresh_token?: string
}

export interface PasswordResetType {
    email?: string;
    reset_code?: string;
    expired_at?: Date;
}