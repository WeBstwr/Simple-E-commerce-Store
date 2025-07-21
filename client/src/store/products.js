import { create } from 'zustand';

const API_URL = 'http://localhost:3000/api/products';

const useProductStore = create((set, get) => ({
    products: [],

    // Fetch all products from backend
    fetchProducts: async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (data.success) {
                set({ products: data.products });
            }
        } catch (err) {
            // Optionally handle error
        }
    },

    // Add product via backend
    addProduct: async (product) => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(product)
            });
            const data = await res.json();
            if (data.success) {
                set((state) => ({ products: [...state.products, data.product] }));
            }
        } catch (err) {
            // Optionally handle error
        }
    },

    // Edit product via backend
    editProduct: async (id, updatedProduct) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updatedProduct)
            });
            const data = await res.json();
            if (data.success) {
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === data.product.id ? data.product : product
                    )
                }));
            }
        } catch (err) {
            // Optionally handle error
        }
    },

    // Remove product via backend
    removeProduct: async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                set((state) => ({
                    products: state.products.filter((product) => product.id !== id)
                }));
            }
        } catch (err) {
            // Optionally handle error
        }
    },
}));

export default useProductStore; 