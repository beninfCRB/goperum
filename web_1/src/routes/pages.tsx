import { routerType } from ".";
import MainLayout from "../components/layout/MainLayout";
import { ProtectedRoute } from "./layout/ProtectedRoute";
import PageNotFound from "./layout/PageNotFound";
import ApprovalStatusIndex from "../pages/approval-status";
import ForgotPasswordIndex from "../pages/auth/forgotPassword";
import LoginIndex from "../pages/auth/login";
import NewPasswordIndex from "../pages/auth/newPassword";
import RegisterCustomerIndex from "../pages/auth/registerCustomer";
import RegisterPrivateIndex from "../pages/auth/registerPrivate";
import ResendVerficationEmailIndex from "../pages/auth/resendVerificationEmail";
import VerifyEmailIndex from "../pages/auth/verifyEmail";
import BankIndex from "../pages/bank";
import CustomerIndex from "../pages/customer";
import Dashboard from "../pages/dashboard";
import MarketingIndex from "../pages/marketing";
import PaymentIndex from "../pages/payment";
import PaymentMethodIndex from "../pages/payment-method";
import ProductIndex from "../pages/product";
import ProfileIndex from "../pages/profile";
import PurchaseMethodIndex from "../pages/purchase-method";
import RoleUserIndex from "../pages/role-user";
import TransactionIndex from "../pages/transaction";
import TransactionStatusIndex from "../pages/transaction-status";
import TypeDPIndex from "../pages/type-dp";

const Pages: routerType[] = [
    {
        path: "login",
        element:
            <ProtectedRoute>
                <LoginIndex />
            </ProtectedRoute>,
        title: "Login Akun"
    },
    {
        path: "register",
        element: <RegisterCustomerIndex />,
        title: "Register Akun"
    },
    {
        path: "private/register",
        element: <RegisterPrivateIndex />,
        title: "Register Akun"
    },
    {
        path: "forgot-password",
        element: <ForgotPasswordIndex />,
        title: "Lupa Kata Sandi"
    },
    {
        path: "new-password/:reset_code",
        element: <NewPasswordIndex />,
        title: "Atur Kata Sandi Baru"
    },
    {
        path: "verify-email",
        element: <VerifyEmailIndex />,
        title: "Verifikasi Email"
    },
    {
        path: "re-verify-email",
        element: <ResendVerficationEmailIndex />,
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
                path: "purchase-method",
                element: <PurchaseMethodIndex />,
                title: "Metode Pembelian"
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
            {
                path: "transaction",
                element: <TransactionIndex />,
                title: "Transaksi"
            },
            {
                path: "payment",
                element: <PaymentIndex />,
                title: "Pembayaran"
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