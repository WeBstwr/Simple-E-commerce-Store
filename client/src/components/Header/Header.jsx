import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/auth.js'
import useCartStore from '../../store/cart.js';
import './header.css'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const cartCount = useCartStore(state => state.cart.reduce((sum, item) => sum + item.quantity, 0));

  // Not logged in: minimal header
  if (!isAuthenticated) {
    return (
      <header className="header-container">
        <nav className="header-nav">
          <div className="nav-left">
            <Link to="/" className="nav-link">Home</Link>
          </div>
          <div className="nav-right">
            <Link to="/login" className="nav-link account-link">Login</Link>
            <Link to="/register" className="nav-link account-link">Register</Link>
          </div>
        </nav>
      </header>
    );
  }

  // Admin header
  if (user?.role === 'admin') {
    return (
      <header className="header-container">
        <nav className="header-nav">
          <div className="nav-left">
            <Link to="/admin/home" className="nav-link">Home</Link>
            <Link to="/admin/shop" className="nav-link">Shop</Link>
            <Link to="/admin/about" className="nav-link">About</Link>
            <Link to="/admin/products" className="nav-link">Manage Products</Link>
            <Link to="/admin/users" className="nav-link">Manage Users</Link>
            <Link to="/cart" className="nav-link cart-link">
              <span role="img" aria-label="cart">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
          <div className="nav-right">
            <button
              className="nav-link account-link"
              onClick={() => navigate('/profile')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {user?.fullName?.split(' ')[0]}
            </button>
            <button
              className="nav-link account-link"
              onClick={() => { logout(); navigate('/login'); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#fff' }}
            >
              Log Out
            </button>
          </div>
        </nav>
      </header>
    );
  }

  // Regular user header
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
          <button
            className="nav-link account-link"
            onClick={() => navigate('/profile')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {user?.fullName?.split(' ')[0]}
          </button>
          <button
            className="nav-link account-link"
            onClick={() => { logout(); navigate('/login'); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#fff' }}
          >
            Log Out
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header