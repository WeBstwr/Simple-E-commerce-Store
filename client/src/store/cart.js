import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [], // [{ product, quantity }]

  addToCart: (product) => {
    set((state) => {
      const existing = state.cart.find(item => item.product.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          cart: [...state.cart, { product, quantity: 1 }]
        };
      }
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter(item => item.product.id !== productId)
    }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      cart: state.cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    }));
  },

  clearCart: () => set({ cart: [] }),
}));

export default useCartStore; 