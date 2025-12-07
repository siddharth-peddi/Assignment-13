import React from 'react';

const ProductTable = ({ products, onEditClick, onDeleteClick }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>Product ID</th>
          <th>Category</th>
          <th>Name</th>
          <th>Price</th>
          <th>In Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 && (
          <tr>
            <td colSpan="7" className="text-center">
              No products yet. Add one on the left.
            </td>
          </tr>
        )}
        {products.map((p, index) => (
          <tr key={p._id || index}>
            <td>{p.id}</td>
            <td>{p.product.productid}</td>
            <td>{p.product.category}</td>
            <td>{p.product.name}</td>
            <td>${p.product.price}</td>
            <td>{p.product.instock ? 'Yes' : 'No'}</td>
            <td>
              <button
                className="btn btn-sm btn-info mr-2"
                onClick={() => onEditClick(p)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDeleteClick(p._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
