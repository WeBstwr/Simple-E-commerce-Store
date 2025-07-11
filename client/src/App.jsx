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
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import React from 'react';
import Profile from './pages/Profile/Profile.jsx';

function App() {
  // To use a toast anywhere in your app:
  // import toast from "react-simple-toasts";
  // toast("Your message", { theme: "green" | "dark", type: "success" | "error" | "info", duration: 4000 });

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
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
