import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const token = localStorage.getItem('authorize');
    const location = useLocation()

    if (!token && location.pathname !== '/') {
        return <Navigate to="/" />;
    }

    if (token && location.pathname === '/') {
        return <Navigate to={'admin/dashboard'} />
    }

    return children;
};