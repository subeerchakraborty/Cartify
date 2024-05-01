import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import '../css/CategoryProductCard.css';

export default function HomeProductsCard({ product }) {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none', margin: '10px' }}>
      <CardMedia
        component="img"
        sx={{ objectFit: 'cover' }}
        height="459"
        image={product.imgUrl}
      />
      <CardHeader title={product.name} />
      <CardContent>
        <p>{product.description}</p>
      </CardContent>
    </Card>
  );
}
