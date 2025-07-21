import React, { useState } from 'react';
import useAuthStore from '../../../store/auth.js';
import useProductStore from '../../../store/products.js';
import './adminProducts.css';
import ProductForm from '../../../components/Product/ProductForm.jsx';

const categories = ["Apparels", "T-shirts", "Sunglasses"];

const AdminProducts = () => {
    const { user, isAuthenticated } = useAuthStore();
    const { addProduct } = useProductStore();
    const [success, setSuccess] = useState("");

    if (!isAuthenticated || user?.role !== 'admin') {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>You are not authorized to view this page.</div>;
    }

    // Handler for adding a product
    const handleAddProduct = (values, { resetForm }) => {
        addProduct({
            name: values.name,
            image: values.image,
            price: parseFloat(values.price),
            category: values.category
        });
        setSuccess('Product added successfully!');
        resetForm();
        setTimeout(() => setSuccess(''), 2000);
    };

    return (
        <div className="admin-products-container">
            <h2 className="admin-products-title">Add Product</h2>
            <p className="admin-products-desc">(Admin-only) Use this form to add new products to the store.</p>
            <ProductForm
                initialValues={{ name: '', image: '', price: '', category: categories[0] }}
                onSubmit={handleAddProduct}
                submitLabel="Add Product"
            />
            {success && <div className="form-success">{success}</div>}
        </div>
    );
};

export default AdminProducts; 