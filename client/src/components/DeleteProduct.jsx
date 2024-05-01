import React from 'react';
import axios from 'axios';

function DeleteProduct({ productId, onProductDeleted }) {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

  const handleDeleteClick = () => {
    // Send a DELETE request to the backend to delete the specific product
    axios.delete(`${domain}/products/${productId}`)
      .then((response) => {
        // Call the onProductDeleted callback to remove the deleted product from the state in the parent component
        onProductDeleted(productId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button onClick={handleDeleteClick}>
      Delete
    </button>
  );
}

export default DeleteProduct;
