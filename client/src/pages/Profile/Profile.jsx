import React, { useState } from 'react';
import useAuthStore from '../../store/auth.js';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  const { user, isAuthenticated, logout, updateProfile, deleteProfile, changePassword } = useAuthStore();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [changePwMode, setChangePwMode] = useState(false);
  const [form, setForm] = useState({ fullName: user?.fullName || '', phoneNumber: user?.phoneNumber || '' });
  const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");

  if (!isAuthenticated || !user) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>You are not logged in.</div>;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleEdit = () => {
    setForm({ fullName: user.fullName, phoneNumber: user.phoneNumber || '' });
    setEditMode(true);
    setError("");
  };

  const handleCancel = () => {
    setEditMode(false);
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await updateProfile(form);
    setLoading(false);
    if (result.success) {
      setEditMode(false);
    } else {
      setError(result.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setLoading(true);
      const result = await deleteProfile();
      setLoading(false);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || "Delete failed");
      }
    }
  };

  // Change password handlers
  const handleChangePw = (e) => {
    setPwForm({ ...pwForm, [e.target.name]: e.target.value });
  };

  const handleChangePwSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPwSuccess("");
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    setLoading(true);
    const result = await changePassword(pwForm.oldPassword, pwForm.newPassword);
    setLoading(false);
    if (result.success) {
      setPwSuccess("Password changed successfully.");
      setPwForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setChangePwMode(false);
    } else {
      setError(result.message || "Password change failed");
    }
  };

  const handleCancelPw = () => {
    setChangePwMode(false);
    setError("");
    setPwForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      {editMode ? (
        <form className="profile-edit-form" onSubmit={handleUpdate}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </label>
          {error && <div className="profile-error">{error}</div>}
          <div className="profile-edit-actions">
            <button type="submit" className="profile-edit-btn" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            <button type="button" className="profile-cancel-btn" onClick={handleCancel} disabled={loading}>Cancel</button>
          </div>
        </form>
      ) : changePwMode ? (
        <form className="profile-edit-form" onSubmit={handleChangePwSubmit}>
          <label>
            Old Password:
            <input
              type="password"
              name="oldPassword"
              value={pwForm.oldPassword}
              onChange={handleChangePw}
              required
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              value={pwForm.newPassword}
              onChange={handleChangePw}
              required
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              name="confirmPassword"
              value={pwForm.confirmPassword}
              onChange={handleChangePw}
              required
            />
          </label>
          {error && <div className="profile-error">{error}</div>}
          {pwSuccess && <div className="profile-success">{pwSuccess}</div>}
          <div className="profile-edit-actions">
            <button type="submit" className="profile-edit-btn" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            <button type="button" className="profile-cancel-btn" onClick={handleCancelPw} disabled={loading}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <p className="profile-detail"><strong>Full Name:</strong> {user.fullName}</p>
          <p className="profile-detail"><strong>Email:</strong> {user.email}</p>
          <p className="profile-detail"><strong>Phone Number:</strong> {user.phoneNumber || <span>Not provided</span>}</p>
          {error && <div className="profile-error">{error}</div>}
          {pwSuccess && <div className="profile-success">{pwSuccess}</div>}
          <div className="profile-actions">
            <button className="profile-edit-btn" onClick={handleEdit}>Edit Profile</button>
            <button className="profile-edit-btn" onClick={() => { setChangePwMode(true); setError(""); setPwSuccess(""); }}>Change Password</button>
            <button className="profile-delete-btn" onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete Account"}</button>
            <button className="profile-logout-btn" onClick={handleLogout}>Log Out</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile; 