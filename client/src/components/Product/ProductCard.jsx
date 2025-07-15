import React from "react";

const ProductCard = ({ product, isAdmin = false, adminActions }) => {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <div className="product-actions">
        {isAdmin && adminActions ? (
          adminActions(product)
        ) : (
          <>
            <button className="buy-btn">Buy</button>
            <button className="cart-btn">Add to Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 