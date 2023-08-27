import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/auth/login'
import CustomerIndex from './pages/customer'
import MainLayout from './components/layout/mainLayout'
import PageNotFound from './components/layout/pageNotFound'
import { ProtectedRoute } from './components/layout/protectedRoute'

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
