import { create } from 'zustand';

const API_URL = "http://localhost:3000/api/auth";

const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    role: null,
    error: null,

    // Register user with backend
    registerUser: async (userData, navigate) => {
        set({ error: null });
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...userData, role: "user" }),
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                navigate('/login');
            } else {
                set({ error: data.message || "Registration failed" });
            }
        } catch (err) {
            set({ error: "Registration failed" });
        }
    },

    // Register admin with backend
    registerAdmin: async (userData, navigate) => {
        set({ error: null });
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...userData, role: "admin" }),
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                navigate('/login');
            } else {
                set({ error: data.message || "Registration failed" });
            }
        } catch (err) {
            set({ error: "Registration failed" });
        }
    },

    // Login user with backend
    loginUser: async (email, password) => {
        set({ error: null });
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                set({
                    user: data.data,
                    isAuthenticated: true,
                    role: data.data.role,
                    error: null
                });
                return { success: true, data: data.data };
            } else {
                set({ error: data.message || "Login failed" });
                return { success: false, message: data.message || "Login failed" };
            }
        } catch (err) {
            set({ error: "Login failed" });
            return { success: false, message: "Login failed" };
        }
    },

    // Log out the current user (clear state and cookie)
    logout: async () => {
        await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        set({ user: null, isAuthenticated: false, role: null, error: null });
    },

    // Update profile
    updateProfile: async (profileData) => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(profileData)
            });
            const data = await res.json();
            if (data.success) {
                set({ user: data.user });
                return { success: true };
            } else {
                set({ error: data.message || "Update failed" });
                return { success: false, message: data.message || "Update failed" };
            }
        } catch {
            set({ error: "Update failed" });
            return { success: false, message: "Update failed" };
        }
    },

    // Delete profile
    deleteProfile: async () => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/profile", {
                method: "DELETE",
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                await get().logout();
                return { success: true };
            } else {
                set({ error: data.message || "Delete failed" });
                return { success: false, message: data.message || "Delete failed" };
            }
        } catch {
            set({ error: "Delete failed" });
            return { success: false, message: "Delete failed" };
        }
    },

    // Change password
    changePassword: async (oldPassword, newPassword) => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/profile/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ oldPassword, newPassword })
            });
            const data = await res.json();
            if (data.success) {
                return { success: true };
            } else {
                set({ error: data.message || "Password change failed" });
                return { success: false, message: data.message || "Password change failed" };
            }
        } catch {
            set({ error: "Password change failed" });
            return { success: false, message: "Password change failed" };
        }
    },

    // Check current user from backend (for persistence)
    checkAuth: async () => {
        try {
            const res = await fetch(`${API_URL}/profile`, {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();
            if (data.success && data.user) {
                set({
                    user: data.user,
                    isAuthenticated: true,
                    role: data.user.role,
                    error: null
                });
            } else {
                set({ user: null, isAuthenticated: false, role: null });
            }
        } catch {
            set({ user: null, isAuthenticated: false, role: null });
        }
    },
}));

export default useAuthStore; 