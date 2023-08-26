import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/auth/login'
import MainLayout from './components/layout/MainLayout'
import CustomerIndex from './pages/customer'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import PageNotFound from './components/layout/PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
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
