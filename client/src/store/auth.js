import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    role: null,
    error: null,

    // Simulate user registration
    registerUser: async (userData, navigate) => {
        // Simulate API call delay
        set({ error: null });
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
        set({ error: null });
        setTimeout(() => {
            set({
                user: { ...userData, role: 'admin' },
                isAuthenticated: false,
                role: 'admin',
            });
            navigate('/login');
        }, 800);
    },

    // For future: login, logout, etc.
}));

export default useAuthStore; 