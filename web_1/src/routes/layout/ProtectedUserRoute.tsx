import { Navigate, useLocation } from "react-router-dom";

export const ProtectedUserRoute = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const locale = JSON.parse(localStorage.getItem("user") as string);
    const location = useLocation();

    if (location.pathname.includes('/user')) {
        if (locale.role === 'admin' || locale.role === 'mkt') {
            return <Navigate replace={true} to={'admin/dashboard'} />
        }
    }

    if (location.pathname.includes('/admin') && locale.role === 'user') {
        return <Navigate replace={true} to={'user/user-product'} />
    }

    return children;
};