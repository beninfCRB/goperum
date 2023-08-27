import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const token = localStorage.getItem('authorize');

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
};