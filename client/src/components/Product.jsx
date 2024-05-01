import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

function Product() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${domain}products/${id}`)
      .then((response) => {
        setProduct(response.data.productDetails);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
      <Card sx={{ boxShadow: 'none', display: 'flex', flexDirection: 'row', width: '100%', height: '80%' }}>
        <CardMedia
          component="img"
          image={product.imgUrl}
          alt={product.name}
        />
        <CardContent sx={{ flexBasis: '70%' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1.5rem' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
            {product.description}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Quantity:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton size="small" onClick={handleDecrease} sx={{ color: '#1976d2' }}><RemoveIcon /></IconButton>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {quantity}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton size="small" onClick={handleIncrease} sx={{ color: '#1976d2' }}><AddIcon /></IconButton>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <Button variant="contained" size="small">Add to Cart</Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <Link to={`/products/update-product/${id}`}><Button variant="contained" >Update Product</Button></Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </div>
  );
}

export default Product;
