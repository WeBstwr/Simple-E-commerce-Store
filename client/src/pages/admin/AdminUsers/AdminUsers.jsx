import React from 'react';
import useAuthStore from '../../../store/auth.js';
import './adminUsers.css';

const AdminUsers = () => {
    const { user, isAuthenticated, users } = useAuthStore();

    if (!isAuthenticated || user?.role !== 'admin') {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>You are not authorized to view this page.</div>;
    }

    return (
        <div className="admin-users-container">
            <h2 className="admin-users-title">Manage Users</h2>
            <p className="admin-users-desc">(Admin-only) Here you can view all users and delete them from the site.</p>
            {/* User management UI will go here */}
            <div className="admin-users-placeholder">User management coming soon...</div>
        </div>
    );
};

export default AdminUsers; 