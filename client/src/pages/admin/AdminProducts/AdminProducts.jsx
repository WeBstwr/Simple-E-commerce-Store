import React, { useState } from 'react';
import useAuthStore from '../../../store/auth.js';
import useProductStore from '../../../store/products.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

    return (
        <div className="admin-products-container">
            <h2 className="admin-products-title">Manage Products</h2>
            <p className="admin-products-desc">(Admin-only) Here you can add new products (clothes) to be sold.</p>
            <Formik
                initialValues={{ name: '', image: '', price: '', category: categories[0] }}
                validate={values => {
                    const errors = {};
                    if (!values.name) errors.name = 'Product name is required';
                    if (!values.image) errors.image = 'Image URL is required';
                    if (!values.price) errors.price = 'Price is required';
                    else if (isNaN(values.price) || Number(values.price) <= 0) errors.price = 'Enter a valid price';
                    if (!values.category) errors.category = 'Category is required';
                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    addProduct({
                        name: values.name,
                        image: values.image,
                        price: parseFloat(values.price),
                        category: values.category
                    });
                    setSuccess('Product added successfully!');
                    resetForm();
                    setTimeout(() => setSuccess(''), 2000);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="admin-add-product-form">
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image URL</label>
                            <Field type="text" name="image" className="form-control" />
                            <ErrorMessage name="image" component="div" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <Field type="number" name="price" className="form-control" min="0" step="0.01" />
                            <ErrorMessage name="price" component="div" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <Field as="select" name="category" className="form-control">
                                {categories.map(cat => (
                                    <option value={cat} key={cat}>{cat}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="form-error" />
                        </div>
                        <button type="submit" className="admin-add-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Product'}
                        </button>
                        {success && <div className="form-success">{success}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdminProducts; 