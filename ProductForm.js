import React from 'react';

const ProductForm = ({ formValues, onChange, onSubmit, onCancel, isEditing }) => {
  return (
    <div className="card">
      <div className="card-header">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Inventory ID (id)</label>
            <input
              type="number"
              className="form-control"
              name="id"
              value={formValues.id}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Product ID</label>
            <input
              type="number"
              className="form-control"
              name="productid"
              value={formValues.productid}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={formValues.category}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formValues.price}
              onChange={onChange}
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formValues.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="instock"
              name="instock"
              checked={formValues.instock}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="instock">
              In Stock
            </label>
          </div>

          <button type="submit" className="btn btn-primary mr-2">
            {isEditing ? 'Save Changes' : 'Add Product'}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
