import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/auth.js';
import './adminUsers.css';
import Modal from '../../../components/Modal/Modal.jsx';

const AdminUsers = () => {
    const { user, isAuthenticated, users = [], fetchAllUsers, addUser, updateUser, deleteUser, error } = useAuthStore();
    const [showAddModal, setShowAddModal] = useState(false);
    const [addError, setAddError] = useState("");
    const [editUserId, setEditUserId] = useState(null);
    const [editError, setEditError] = useState("");

    useEffect(() => {
        if (isAuthenticated && user?.role === 'admin') {
            fetchAllUsers();
        }
    }, [isAuthenticated, user, fetchAllUsers]);

    const editingUser = users.find(u => u.id === editUserId);

    const handleAddUser = async (values, { setSubmitting, resetForm }) => {
        await addUser(values);
        if (error) {
            setAddError(error);
        } else {
            setShowAddModal(false);
            setAddError("");
            resetForm();
        }
        setSubmitting(false);
    };

    const handleEditUser = async (values, { setSubmitting, resetForm }) => {
        // Prevent changing email to an existing one (other than self)
        if (users.some(u => u.email === values.email && u.id !== editingUser.id)) {
            setEditError('Email already exists');
            setSubmitting(false);
            return;
        }
        await updateUser(editingUser.id, values);
        setEditUserId(null);
        setEditError("");
        resetForm();
        setSubmitting(false);
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUser(id);
        }
    };

    if (!isAuthenticated || user?.role !== 'admin') {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>You are not authorized to view this page.</div>;
    }

    return (
        <div className="admin-users-container">
            <h2 className="admin-users-title">Manage Users</h2>
            <p className="admin-users-desc">(Admin-only) Here you can view all users and delete them from the site.</p>
            <button
                style={{
                    background: 'var(--primary-color)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.4rem',
                    fontWeight: 600,
                    fontSize: '1.08rem',
                    cursor: 'pointer',
                    marginBottom: '1.2rem',
                    transition: 'background 0.18s',
                }}
                onClick={() => setShowAddModal(true)}
            >
                Add User
            </button>
            {users.length === 0 ? (
                <div className="admin-users-placeholder">No users found.</div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
                    <thead>
                        <tr style={{ background: 'var(--tertiary-color)' }}>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Full Name</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Email</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Role</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                <td style={{ padding: '0.5rem' }}>{u.fullName}</td>
                                <td style={{ padding: '0.5rem' }}>{u.email}</td>
                                <td style={{ padding: '0.5rem' }}>{u.role}</td>
                                <td style={{ padding: '0.5rem' }}>
                                    {user.id !== u.id && (
                                        <>
                                            <button
                                                style={{
                                                    background: 'var(--primary-color)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '0.4rem 1.1rem',
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.18s',
                                                    marginRight: '0.5rem',
                                                }}
                                                onClick={() => setEditUserId(u.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                style={{
                                                    background: 'var(--secondary-color)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '0.4rem 1.1rem',
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.18s',
                                                }}
                                                onClick={() => handleDeleteUser(u.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                    {user.id === u.id && (
                                        <span style={{ color: '#888', fontSize: '0.98rem' }}>(You)</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setAddError(""); }}>
                <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary-color)' }}>Add New User</h3>
                <form
                    className="admin-add-product-form"
                    onSubmit={e => { e.preventDefault(); }}
                >
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" name="fullName" className="form-control" id="fullName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="tel" name="phoneNumber" className="form-control" id="phoneNumber" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" id="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select name="role" className="form-control" id="role" defaultValue="user" required>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {addError && <div className="form-error" style={{ marginTop: '0.5rem' }}>{addError}</div>}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            className="admin-add-btn"
                            onClick={async e => {
                                e.preventDefault();
                                const form = e.target.form;
                                const values = {
                                    fullName: form.fullName.value,
                                    phoneNumber: form.phoneNumber.value,
                                    email: form.email.value,
                                    password: form.password.value,
                                    role: form.role.value,
                                };
                                await handleAddUser({ ...values }, { setSubmitting: () => {}, resetForm: () => { form.reset(); } });
                            }}
                        >
                            Add User
                        </button>
                        <button
                            type="button"
                            className="admin-add-btn"
                            style={{ background: 'var(--secondary-color)' }}
                            onClick={() => { setShowAddModal(false); setAddError(""); }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal isOpen={!!editUserId} onClose={() => { setEditUserId(null); setEditError(""); }}>
                <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary-color)' }}>Edit User</h3>
                {editingUser && (
                    <form
                        className="admin-add-product-form"
                        onSubmit={e => { e.preventDefault(); }}
                    >
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" name="fullName" className="form-control" id="editFullName" defaultValue={editingUser.fullName} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="tel" name="phoneNumber" className="form-control" id="editPhoneNumber" defaultValue={editingUser.phoneNumber} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" className="form-control" id="editEmail" defaultValue={editingUser.email} required readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" id="editPassword" defaultValue={editingUser.password} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select name="role" className="form-control" id="editRole" defaultValue={editingUser.role} required>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        {editError && <div className="form-error" style={{ marginTop: '0.5rem' }}>{editError}</div>}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                type="submit"
                                className="admin-add-btn"
                                onClick={async e => {
                                    e.preventDefault();
                                    const form = e.target.form;
                                    const values = {
                                        fullName: form.editFullName.value,
                                        phoneNumber: form.editPhoneNumber.value,
                                        email: form.editEmail.value,
                                        password: form.editPassword.value,
                                        role: form.editRole.value,
                                    };
                                    await handleEditUser(values, { setSubmitting: () => {}, resetForm: () => { form.reset(); } });
                                }}
                            >
                                Update User
                            </button>
                            <button
                                type="button"
                                className="admin-add-btn"
                                style={{ background: 'var(--secondary-color)' }}
                                onClick={() => { setEditUserId(null); setEditError(""); }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default AdminUsers; 