import React, { useState } from "react";
import Masonry from "react-masonry-css";
import products from "../../data/products";
import "./shop.css";

const categories = ["Apparels", "T-shirts", "Sunglasses"];

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="shop-container">
      <h1 className="shop-title">Shop</h1>
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn${selectedCategory === cat ? " active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
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
              <button className="buy-btn">Buy</button>
              <button className="cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Shop;