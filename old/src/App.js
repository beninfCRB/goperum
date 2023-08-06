import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from './components/MainLayout';
import Dashboard from './pages/dashboard';
import Login from 'pages/auth/login';
import CustomerIndex from 'pages/customer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path='customer' element={<CustomerIndex />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
