import React, { useEffect, useState } from 'react';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';

const API_BASE = process.env.REACT_APP_API_BASE || '';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const emptyForm = {
    id: '',
    productid: '',
    category: '',
    price: '',
    name: '',
    instock: true
  };

  const [formValues, setFormValues] = useState(emptyForm);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/product/get`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: Number(formValues.id),
      product: {
        productid: Number(formValues.productid),
        category: formValues.category,
        price: Number(formValues.price),
        name: formValues.name,
        instock: formValues.instock
      }
    };

    try {
      if (editingProduct) {
        await fetch(`${API_BASE}/product/update/${editingProduct._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${API_BASE}/product/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      setFormValues(emptyForm);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleEditClick = (productDoc) => {
    setEditingProduct(productDoc);
    setFormValues({
      id: productDoc.id,
      productid: productDoc.product.productid,
      category: productDoc.product.category,
      price: productDoc.product.price,
      name: productDoc.product.name,
      instock: productDoc.product.instock
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`${API_BASE}/product/delete/${id}`, {
        method: 'DELETE'
      });
      loadProducts();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormValues(emptyForm);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Assignment 13 - My Inventory</h1>
      <div className="row">
        <div className="col-md-4">
          <ProductForm
            formValues={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            isEditing={!!editingProduct}
          />
        </div>
        <div className="col-md-8">
          <ProductTable
            products={products}
            onEditClick={handleEditClick}
            onDeleteClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
