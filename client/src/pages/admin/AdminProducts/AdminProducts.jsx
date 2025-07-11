import React from 'react';
import useAuthStore from '../../../store/auth.js';
import './adminProducts.css';

const AdminProducts = () => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || user?.role !== 'admin') {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>You are not authorized to view this page.</div>;
    }

    return (
        <div className="admin-products-container">
            <h2 className="admin-products-title">Manage Products</h2>
            <p className="admin-products-desc">(Admin-only) Here you can add or remove products (clothes) being sold.</p>
            {/* Product management UI will go here */}
            <div className="admin-products-placeholder">Product management coming soon...</div>
        </div>
    );
};

export default AdminProducts; 