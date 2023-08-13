import { Navigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";

export const ProtectedRoute = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const token = getCookie('tk_a');

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
};