import { create } from 'zustand';
import productsData from '../data/products.js';

const useProductStore = create((set) => ({
    products: [...productsData],

    addProduct: (product) =>
        set((state) => ({
            products: [
                ...state.products,
                { ...product, id: Date.now() }, // simple unique id
            ],
        })),

    editProduct: (id, updatedProduct) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === id ? { ...product, ...updatedProduct } : product
            ),
        })),

    removeProduct: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        })),
}));

export default useProductStore; 