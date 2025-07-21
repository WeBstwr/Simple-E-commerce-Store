import { create } from 'zustand';

const API_URL = 'http://localhost:3000/api/cart';

const useCartStore = create((set, get) => ({
  cart: [], // [{ id, product, quantity }]

  // Fetch cart from backend
  fetchCart: async () => {
    try {
      const res = await fetch(API_URL, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        set({ cart: data.cartItems });
      }
    } catch {}
  },

  // Add to cart via backend
  addToCart: async (product) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      const data = await res.json();
      if (data.success) {
        // Refetch cart to sync
        await get().fetchCart();
      }
    } catch {}
  },

  // Update quantity via backend
  updateQuantity: async (productId, quantity) => {
    const cartItem = get().cart.find(item => item.product.id === productId);
    if (!cartItem) return;
    try {
      const res = await fetch(`${API_URL}/${cartItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ quantity })
      });
      const data = await res.json();
      if (data.success) {
        await get().fetchCart();
      }
    } catch {}
  },

  // Remove from cart via backend
  removeFromCart: async (productId) => {
    const cartItem = get().cart.find(item => item.product.id === productId);
    if (!cartItem) return;
    try {
      const res = await fetch(`${API_URL}/${cartItem.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        await get().fetchCart();
      }
    } catch {}
  },

  // Clear cart via backend
  clearCart: async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        set({ cart: [] });
      }
    } catch {}
  },
}));

export default useCartStore; 