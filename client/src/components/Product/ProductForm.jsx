import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../pages/admin/AdminProducts/adminProducts.css';

const categories = ["Apparels", "T-shirts", "Sunglasses"];

const ProductForm = ({ initialValues, onSubmit, submitLabel, onCancel }) => (
  <Formik
    initialValues={initialValues}
    validate={values => {
      const errors = {};
      if (!values.name) errors.name = 'Product name is required';
      if (!values.image) errors.image = 'Image URL is required';
      if (!values.price) errors.price = 'Price is required';
      else if (isNaN(values.price) || Number(values.price) <= 0) errors.price = 'Enter a valid price';
      if (!values.category) errors.category = 'Category is required';
      return errors;
    }}
    onSubmit={onSubmit}
    enableReinitialize
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
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="admin-add-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : submitLabel}
          </button>
          {onCancel && (
            <button type="button" className="admin-add-btn" style={{ background: 'var(--secondary-color)' }} onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </Form>
    )}
  </Formik>
);

export default ProductForm; 