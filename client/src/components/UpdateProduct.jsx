import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Typography } from '@mui/material';

function UpdateProduct() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${domain}products/${productId}`)
      .then((response) => {
        setProduct(response.data.productDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [productId]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'inStock') {
      value = value.toLowerCase() === 'yes' ? true : false;
    }
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${domain}products/update-product/${productId}`, product)
      .then(() => {
        navigate('/shop');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Update Product</Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField fullWidth label="ImageUrl" name="imgUrl" value={product.imgUrl} onChange={handleChange} />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Name" name="name" value={product.name} onChange={handleChange} required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Price" name="price" value={product.price} onChange={handleChange} required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Description" name="description" value={product.description} onChange={handleChange} required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Category" name="category" value={product.category} onChange={handleChange} required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="InStock" name="inStock" value={product.inStock} onChange={handleChange} required />
        </Box>
        <Button variant="contained" color="primary" type="submit">Update Product</Button>
      </form>
    </Container>
  );
}

export default UpdateProduct;
