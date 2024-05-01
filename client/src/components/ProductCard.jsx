import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: 200 }} // Adjusted size
                    image={product.imgUrl} // Use product image URL
                    alt={product.name} // Use product name as alt text
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <CardHeader title={product.name} subheader={product.category} />
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default ProductCard;
