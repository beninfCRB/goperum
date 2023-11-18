import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const token = localStorage.getItem('authorize');
    const location = useLocation()

    if (!token && location.pathname !== '/login') {
        return <Navigate replace={true} to="/login" />;
    }

    if (token && location.pathname === 'login') {
        return <Navigate replace={true} to={'admin/dashboard'} />
    }

    return children;
};