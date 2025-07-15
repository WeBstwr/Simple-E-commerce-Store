import React, { useState } from "react";
import Masonry from "react-masonry-css";
import products from "../../data/products";
import "./shop.css";
import ProductCard from "../../components/Product/ProductCard.jsx";
import useAuthStore from "../../store/auth.js";
import useProductStore from "../../store/products.js";
import Modal from "../../components/Modal/Modal.jsx";
import ProductForm from "../../components/Product/ProductForm.jsx";
import useCartStore from "../../store/cart.js";
import { useNavigate } from "react-router-dom";

const categories = ["Apparels", "T-shirts", "Sunglasses"];

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [editProductId, setEditProductId] = useState(null);
  const { user, isAuthenticated } = useAuthStore();
  const { products, removeProduct, editProduct } = useProductStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  const editingProduct = products.find(p => p.id === editProductId);

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
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={isAuthenticated && user?.role === 'admin'}
            adminActions={() => (
              <>
                <button
                  style={{
                    background: 'var(--primary-color)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1.2rem',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background 0.18s',
                    marginRight: '0.5rem',
                  }}
                  onClick={() => setEditProductId(product.id)}
                >
                  Edit
                </button>
                <button
                  style={{
                    background: 'var(--secondary-color)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1.2rem',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background 0.18s',
                  }}
                  onClick={() => removeProduct(product.id)}
                >
                  Delete
                </button>
              </>
            )}
            onAddToCart={() => addToCart(product)}
            onBuy={() => { addToCart(product); navigate('/cart'); }}
          />
        ))}
      </Masonry>
      <Modal isOpen={!!editProductId} onClose={() => setEditProductId(null)}>
        {editingProduct && (
          <ProductForm
            initialValues={{
              name: editingProduct.name,
              image: editingProduct.image,
              price: editingProduct.price,
              category: editingProduct.category,
            }}
            submitLabel="Update Product"
            onSubmit={(values, { setSubmitting }) => {
              editProduct(editProductId, {
                name: values.name,
                image: values.image,
                price: parseFloat(values.price),
                category: values.category,
              });
              setSubmitting(false);
              setEditProductId(null);
            }}
            onCancel={() => setEditProductId(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Shop;