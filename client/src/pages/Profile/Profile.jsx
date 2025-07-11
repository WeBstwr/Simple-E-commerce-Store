import React from 'react';
import useAuthStore from '../../store/auth.js';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>You are not logged in.</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <p className="profile-detail"><strong>Full Name:</strong> {user.fullName}</p>
      <p className="profile-detail"><strong>Email:</strong> {user.email}</p>
      <p className="profile-detail"><strong>Phone Number:</strong> {user.phoneNumber || <span>Not provided</span>}</p>
      <button className="profile-logout-btn" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile; 