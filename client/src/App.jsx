import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/global.css'
import Home from './pages/Home/Home.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import About from './pages/About/About.jsx'
import Shop from './pages/Shop/Shop.jsx'
import Register from './components/Authentication/Register/Register.jsx'
import RegisterAdmin from './components/Authentication/RegisterAdmin/RegisterAdmin.jsx'
import Login from './components/Authentication/Login/Login.jsx';
import "react-simple-toasts/dist/theme/dark.css";
import React from 'react';
import Profile from './pages/Profile/Profile.jsx';
import AdminProducts from './pages/admin/AdminProducts/AdminProducts.jsx';
import AdminUsers from './pages/admin/AdminUsers/AdminUsers.jsx';
import AdminLayout from './pages/admin/AdminLayout/AdminLayout.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="main-content-with-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
