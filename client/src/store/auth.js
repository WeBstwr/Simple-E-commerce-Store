import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    role: null,
    error: null,
    users: [
        {
            email: "user@example.com",
            password: "password123",
            fullName: "Demo User",
            role: "user"
        },
        {
            email: "admin@example.com",
            password: "adminpass",
            fullName: "Admin User",
            role: "admin"
        }
    ],

    // Simulate user registration
    registerUser: async (userData, navigate) => {
        set((state) => ({
            error: null,
            users: [
                ...state.users,
                { ...userData, role: 'user' }
            ]
        }));
        setTimeout(() => {
            set({
                user: { ...userData, role: 'user' },
                isAuthenticated: false,
                role: 'user',
            });
            navigate('/login');
        }, 800);
    },

    // Simulate admin registration
    registerAdmin: async (userData, navigate) => {
        set((state) => ({
            error: null,
            users: [
                ...state.users,
                { ...userData, role: 'admin' }
            ]
        }));
        setTimeout(() => {
            set({
                user: { ...userData, role: 'admin' },
                isAuthenticated: false,
                role: 'admin',
            });
            navigate('/login');
        }, 800);
    },

    // Simulate user login
    loginUser: async (email, password) => {
        const users = get().users;
        let user = users.find(
            (u) => u.email === email && u.password === password
        );
        if (user) {
            // Force role to admin if email ends with @wbt.com
            if (email.endsWith("@wbt.com")) {
                user = { ...user, role: "admin" };
            }
            set({ user, isAuthenticated: true, role: user.role, error: null });
            return { success: true, data: user };
        } else {
            set({ error: "Invalid email or password" });
            return { success: false, message: "Invalid email or password" };
        }
    },

    // Log out the current user
    logout: () => {
        set({ user: null, isAuthenticated: false, role: null, error: null });
    },

    // Remove a user by email (except current user)
    removeUser: (email) => {
        const currentUser = get().user;
        if (currentUser && currentUser.email === email) return; // Prevent self-delete
        set((state) => ({
            users: state.users.filter((u) => u.email !== email)
        }));
    },

    // Add a user (admin only, no navigation)
    addUser: (userData) => {
        set((state) => {
            // Prevent duplicate emails
            if (state.users.some(u => u.email === userData.email)) {
                return { error: 'Email already exists' };
            }
            return {
                error: null,
                users: [
                    ...state.users,
                    { ...userData }
                ]
            };
        });
    },

    // For future: login, logout, etc.
}));

export default useAuthStore; 