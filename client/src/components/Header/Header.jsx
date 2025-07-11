import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/auth.js'
import './header.css'

const Header = () => {
    const { user, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    // Placeholder for cart count (to be managed by Zustand later)
    const cartCount = 0;

    return (
        <header className="header-container">
            <nav className="header-nav">
                <div className="nav-left">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/shop" className="nav-link">Shop</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </div>
                <div className="nav-right">
                    <Link to="/cart" className="nav-link cart-link">
                        <span role="img" aria-label="cart">🛒</span>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    {isAuthenticated ? (
                        <button
                            className="nav-link account-link"
                            onClick={() => navigate('/profile')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            {user?.fullName?.split(' ')[0]}
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link account-link">Login</Link>
                            <Link to="/register" className="nav-link account-link">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header