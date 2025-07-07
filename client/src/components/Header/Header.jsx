import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
    // Placeholder for cart count and user state (to be managed by Zustand later)
    const cartCount = 0; // Replace with Zustand state
    const isLoggedIn = false; // Replace with Zustand state

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
                    {isLoggedIn ? (
                        <Link to="/account" className="nav-link account-link">Account</Link>
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