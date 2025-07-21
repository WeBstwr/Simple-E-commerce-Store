import React, { useEffect } from 'react';
import useProductStore from '../../store/products.js';
import './home.css';

const Home = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Use the first product as the featured product
  const featured = products.length > 0 ? [products[0]] : [];

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <h1>Welcome to WBT Luxe</h1>
        <p>Luxury Within Reach.</p>
        <a href="/shop" className="hero-cta">Shop Now</a>
      </section>

      {/* Featured Products Section */}
      <section className="home-featured-products">
        <h2>Featured Products</h2>
        <div className="featured-products-list">
          {featured.map((product) => product && (
            <div className="featured-product-card" key={product.id}>
              <img
                src={product.image.startsWith('/uploads/')
                  ? `http://localhost:3000${product.image}`
                  : product.image}
                alt={product.name}
                className="featured-product-image"
              />
              <div className="featured-product-info">
                <h3 className="featured-product-name">{product.name}</h3>
                <p className="featured-product-price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Preview Section */}
      <section className="home-about-preview">
        <h2>About WBT Luxe</h2>
        <p>WBT Luxe is dedicated to making luxury accessible for everyone. Discover our story and what sets us apart.</p>
        <a href="/about" className="about-link">Learn More</a>
      </section>
    </main>
  );
};

export default Home;