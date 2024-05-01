import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Shop.css';
import shopImage from '../assets/ShopHeaderBackground.jpg';
import { Grid, Typography, Select, MenuItem, Button } from '@mui/material';
import ProductCard from './ProductCard';
import axios from 'axios';

const Shop = () => {
    const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4);
    const [category, setCategory] = useState('');

    useEffect(() => {
        // Fetch the list of products from the backend
        axios.get(`${domain}products`)
        .then((response) => {
            setProducts(response.data.products);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
    }, []);

    useEffect(() => {
        if (category) { // Only run if category is not null
            // Fetch the list of products of specific category
            let url = category === 'All' ? `${domain}products` : `${domain}products/category/${category}`;
            axios.get(url)
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
        }
    }, [category]);
    

    return (
        <>
        <div className="shop">
            <img src={shopImage} alt="Shop" />
            <div className="shop-text">
                <p><span>Home</span> {'>'} <span className="active">Shop</span></p>
                <h1>Shop Page</h1>
                <p>Let’s design the place you always imagined.</p>
            </div>
        </div>
        <div className="products">
            <div className="toolbar">
                <Typography variant="subtitle1" style={{ height: 26, width: 102, fontWeight: '600', fontSize: 16, lineHeight: '26px', textAlign: 'left' }}>CATEGORIES</Typography>
                <Select
                    variant="outlined"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    style={{ height: 48, width: 262 }}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Men's Clothing">Men</MenuItem>
                    <MenuItem value="Women's Clothing">Women</MenuItem>
                    <MenuItem value="Children's Clothing">Children</MenuItem>
                    <MenuItem value="Unisex Clothing">Unisex</MenuItem>
                </Select>
            </div>
            <Grid container spacing={4}>
                {products.slice(0, visibleCount).map((product, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            {visibleCount < products.length ? (
                <Button variant="contained" className="show-more-button" onClick={() => setVisibleCount(visibleCount + 4)}>
                    Show More
                </Button>
            ) : null}
            <Link to="/products/add-product"><Button variant="contained">Add Product</Button></Link>
        </div>
    </>
    );
}

export default Shop;
