import React, { useEffect } from 'react';
import useCartStore from '../../store/cart.js';
import './cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">Your cart is empty.</div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.product.id}>
                  <td className="cart-product-info">
                    <img src={item.product.image} alt={item.product.name} className="cart-product-image" />
                    <span>{item.product.name}</span>
                  </td>
                  <td>${item.product.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="cart-qty-input"
                      onChange={e => updateQuantity(item.product.id, Math.max(1, Number(e.target.value)))}
                    />
                  </td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <span className="cart-total-label">Total:</span>
            <span className="cart-total-value">${total.toFixed(2)}</span>
            <button className="cart-clear-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 