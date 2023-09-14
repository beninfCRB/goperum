import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/auth/login'
import CustomerIndex from './pages/customer'
import Register from './pages/auth/register'
import VerifyEmail from './pages/auth/verifyEmail'
import ForgotPassword from './pages/auth/forgotPassword'
import NewPassword from './pages/auth/newPassword'
import MainLayout from './components/layout/MainLayout'
import PageNotFound from './components/layout/pageNotFound'
import AreaIndex from './pages/area'
import ResendVerficationEmail from './pages/auth/resendVerificationEmail'
import Switcher from './components/layout/switcher'
import { ProtectedRoute } from './components/layout/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Switcher>
        <Route path='/' element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        } />
        <Route path='*' element={<PageNotFound />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='new-password/:reset_code' element={<NewPassword />} />
        <Route path='verify-email' element={<VerifyEmail />} />
        <Route path='re-verify-email' element={<ResendVerficationEmail />} />
        <Route path='/admin' element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>}>
          <Route index path='dashboard' element={<Dashboard />}></Route>
          <Route path='customer' element={<CustomerIndex />}></Route>
          <Route path='area' element={<AreaIndex />}></Route>
        </Route>
      </Switcher>
    </BrowserRouter>
  )
}

export default App
