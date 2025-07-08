import React from 'react'
import './home.css'

const Home = () => {
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
          <div className="product-card">Product 1</div>
          <div className="product-card">Product 2</div>
          <div className="product-card">Product 3</div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="home-about-preview">
        <h2>About WBT Luxe</h2>
        <p>WBT Luxe is dedicated to making luxury accessible for everyone. Discover our story and what sets us apart.</p>
        <a href="/about" className="about-link">Learn More</a>
      </section>
    </main>
  )
}

export default Home