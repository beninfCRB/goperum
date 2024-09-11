import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const token = localStorage.getItem('authorize');
    const locale = JSON.parse(localStorage.getItem("user") as string);
    const location = useLocation();

    if (!token && location.pathname !== '/login') {
        return <Navigate replace={true} to="/login" />;
    }

    if (token && location.pathname === 'login') {
        if (locale.role === 'admin') {
            return <Navigate replace={true} to={'admin/dashboard'} />
        }
        if (locale.role === 'user') {
            return <Navigate replace={true} to={'user/user-product'} />
        }
    }

    return children;
};