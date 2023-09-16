export const base_url: string = import.meta.env.VITE_APP_API_KEY;
export const title: string = import.meta.env.VITE_APP_TITTLE;
export const port: number = Number(import.meta.env.VITE_PORT);

export enum StorageName {
    ForgotPassword = "fp",
    VerificationEmail = "ve"
}