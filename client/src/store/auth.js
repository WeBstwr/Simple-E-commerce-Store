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
        const user = users.find(
            (u) => u.email === email && u.password === password
        );
        if (user) {
            set({ user, isAuthenticated: true, role: user.role, error: null });
            return { success: true, data: user };
        } else {
            set({ error: "Invalid email or password" });
            return { success: false, message: "Invalid email or password" };
        }
    },

    // For future: login, logout, etc.
}));

export default useAuthStore; 