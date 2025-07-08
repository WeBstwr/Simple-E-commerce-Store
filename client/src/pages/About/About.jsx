import React from 'react'
import './about.css'

const About = () => {
    return (
        <main className="about-container">
            <section className="about-section mission">
                <h2>Our Mission</h2>
                <p>To make luxury accessible to everyone, offering premium products at exceptional value.</p>
            </section>
            <section className="about-section story">
                <h2>Our Story</h2>
                <p>Founded in 2025, WBT Luxe began with a vision to redefine affordable luxury for all.</p>
            </section>
            <section className="about-section why">
                <h2>Why WBT Luxe</h2>
                <p>We blend quality, style, and affordability, ensuring every customer feels special.</p>
            </section>
            <section className="about-section team">
                <h2>Meet the Founder / Team</h2>
                <p>Our passionate team is dedicated to curating the best in luxury. (Team bios coming soon!)</p>
            </section>
            <section className="about-section promise">
                <h2>Our Promise</h2>
                <p>We promise transparency, quality, and outstanding customer service at every step.</p>
            </section>
            <section className="about-section values">
                <h2>Core Values</h2>
                <ul>
                    <li>Integrity</li>
                    <li>Quality</li>
                    <li>Customer-Centricity</li>
                    <li>Innovation</li>
                    <li>Sustainability</li>
                </ul>
            </section>
            <section className="about-section brand-name">
                <h2>Behind the Brand Name</h2>
                <p>"WBT Luxe" stands for our commitment to bringing luxury (Luxe) to all walks of life.</p>
            </section>
            <section className="about-section sustainability">
                <h2>Sustainability or Ethical Commitment</h2>
                <p>We are committed to ethical sourcing and sustainable practices in all we do.</p>
            </section>
            <section className="about-section testimonials">
                <h2>Customer Testimonials</h2>
                <blockquote>"WBT Luxe exceeded my expectations!" – Happy Customer</blockquote>
                <blockquote>"Affordable luxury, finally!" – Satisfied Shopper</blockquote>
            </section>
            <section className="about-section contact">
                <h2>Contact Info / Quick Links</h2>
                <p>Email: support@wbtluxe.com | Phone: (123) 456-7890</p>
                <nav className="about-quick-links">
                    <a href="/shop">Shop</a> | <a href="/register">Register</a> | <a href="/login">Login</a>
                </nav>
            </section>
        </main>
    )
}

export default About