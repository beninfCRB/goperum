import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/auth/login'
import CustomerIndex from './pages/customer'
import Register from './pages/auth/register'
import VerifyEmail from './pages/auth/verifyEmail'
import WellDone from './components/layout/welldone'
import ForgotPassword from './pages/auth/forgotPassword'
import NewPassword from './pages/auth/newPassword'
import MainLayout from './components/layout/MainLayout'
import PageNotFound from './components/layout/PageNotFound'
import { ProtectedRoute } from './components/layout/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='new-password/:reset_code' element={<NewPassword />} />
        <Route path='verify-email/:verification_code' element={<VerifyEmail />} />
        <Route path='welldone-verify-email' element={<WellDone content="Selamat! 1 langkah lagi untuk menyelesaikan pendaftaran dengan verifikasi email mu. mohon cek email dari sekarang...." />} />
        <Route path='welldone-forgot-password' element={<WellDone content="Selamat! 1 langkah lagi untuk atur ulang kata sandi mu. mohon cek email dari sekarang...." />} />
        <Route path='/admin' element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>}>
          <Route index path='dashboard' element={<Dashboard />}></Route>
          <Route path='customer' element={<CustomerIndex />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
