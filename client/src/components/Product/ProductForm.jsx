import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../pages/admin/AdminProducts/adminProducts.css';

// Use backend enum values for categories
const categories = ["Apparels", "T_shirts", "Sunglasses"];
const categoryLabels = {
  Apparels: "Apparels",
  T_shirts: "T-shirts",
  Sunglasses: "Sunglasses"
};

const ProductForm = ({ initialValues, onSubmit, submitLabel, onCancel }) => {
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(initialValues.image ? (initialValues.image.startsWith('/uploads/') ? `http://localhost:3000${initialValues.image}` : initialValues.image) : '');
  const [fileName, setFileName] = useState("");

  // Upload image to backend and set image field
  const handleFileChange = async (e, setFieldValue, setFieldTouched) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('http://localhost:3000/api/upload/product-image', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setFieldValue('image', data.imagePath);
        setFieldTouched('image', true, false);
        setPreview(`http://localhost:3000${data.imagePath}`);
      } else {
        alert(data.message || 'Image upload failed');
      }
    } catch {
      alert('Image upload failed');
    }
    setUploading(false);
  };

  return (
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
      onSubmit={async (values, formikHelpers) => {
        await onSubmit(values, {
          ...formikHelpers,
          resetForm: (...args) => {
            formikHelpers.resetForm(...args);
            setPreview("");
            setFileName("");
          }
        });
      }}
      enableReinitialize
    >
      {({ isSubmitting, setFieldValue, setFieldTouched, values }) => (
        <Form className="admin-add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <Field type="text" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="form-error" />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL or Upload</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Field type="text" name="image" className="form-control" placeholder="Paste image URL or upload below" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={e => handleFileChange(e, setFieldValue, setFieldTouched)}
                disabled={uploading}
              />
              <button
                type="button"
                className="admin-add-btn"
                style={{ width: 'fit-content', padding: '0.5rem 1.2rem', fontSize: '1rem' }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              {fileName && <span style={{ fontSize: '0.98rem', color: '#555' }}>Selected: {fileName}</span>}
              {preview && (
                <img src={preview} alt="Preview" style={{ maxWidth: 120, marginTop: 8, borderRadius: 8 }} />
              )}
            </div>
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
                <option value={cat} key={cat}>{categoryLabels[cat]}</option>
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
};

export default ProductForm; 