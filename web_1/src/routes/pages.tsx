import { routerType } from ".";
import MainLayout from "../components/layout/MainLayout";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import PageNotFound from "../components/layout/pageNotFound";
import ApprovalStatusIndex from "../pages/approval-status";
import ForgotPassword from "../pages/auth/forgotPassword";
import Login from "../pages/auth/login";
import NewPassword from "../pages/auth/newPassword";
import Register from "../pages/auth/registerCustomer";
import ResendVerficationEmail from "../pages/auth/resendVerificationEmail";
import VerifyEmail from "../pages/auth/verifyEmail";
import BankIndex from "../pages/bank";
import CustomerIndex from "../pages/customer";
import Dashboard from "../pages/dashboard";
import MarketingIndex from "../pages/marketing";
import PaymentMethodIndex from "../pages/payment-method";
import ProductIndex from "../pages/product";
import ProfileIndex from "../pages/profile";
import RoleUserIndex from "../pages/role-user";
import TransactionStatusIndex from "../pages/transaction-status";
import TypeDPIndex from "../pages/type-dp";

const Pages: routerType[] = [
    {
        path: "login",
        element:
            <ProtectedRoute>
                <Login />
            </ProtectedRoute>,
        title: "Login Akun"
    },
    {
        path: "register",
        element: <Register />,
        title: "Register Akun"
    },
    {
        path: "forgot-password",
        element: <ForgotPassword />,
        title: "Lupa Kata Sandi"
    },
    {
        path: "new-password/:reset_code",
        element: <NewPassword />,
        title: "Atur Kata Sandi Baru"
    },
    {
        path: "verify-email",
        element: <VerifyEmail />,
        title: "Verifikasi Email"
    },
    {
        path: "re-verify-email",
        element: <ResendVerficationEmail />,
        title: "Verifikasi Email Ulang"
    },
    {
        path: "admin",
        element:
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>,
        children: [
            {
                path: "profile",
                element: <ProfileIndex />,
                title: "Profile Akun"
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                title: "Dashboard"
            },
            {
                path: "type-dp",
                element: <TypeDPIndex />,
                title: "Tipe DP"
            },
            {
                path: "bank",
                element: <BankIndex />,
                title: "Bank"
            },
            {
                path: "payment-method",
                element: <PaymentMethodIndex />,
                title: "Metode Pembayaran"
            },
            {
                path: "transaction-status",
                element: <TransactionStatusIndex />,
                title: "Status Transaksi"
            },
            {
                path: "approval-status",
                element: <ApprovalStatusIndex />,
                title: "Status Persetujuan"
            },
            {
                path: "role-user",
                element: <RoleUserIndex />,
                title: "Status Transaksi"
            },
            {
                path: "customer",
                element: <CustomerIndex />,
                title: "Pelanggan"
            },
            {
                path: "marketing",
                element: <MarketingIndex />,
                title: "Marketing"
            },
            {
                path: "product",
                element: <ProductIndex />,
                title: "Produk"
            },
        ],
        title: "Verifikasi Email Ulang"
    },
    {
        path: "*",
        element: <PageNotFound />,
        title: "Halaman Tidak Diketahui"
    },
];

export default Pages;