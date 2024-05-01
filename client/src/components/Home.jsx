import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/Hero-image.jpg';
import Button from '@mui/material/Button';
import CategoriesCard from './CategoriesCard'
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MoneyRoundedIcon from '@mui/icons-material/MoneyRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import BannerImage from '../assets/Banner-image.jpeg'
import GridCard1 from '../assets/GridCard1.jpg';
import GridCard2 from '../assets/GridCard2.jpg';
import GridCard3 from '../assets/GridCard3.jpg';
import GridCard4 from '../assets/GridCard4.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import '../css/Home.css';
import '../css/CategoryProductCard.css';
import HomeProductsCard from './HomeProductsCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Home() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { name: 'Men', image: 'https://i.pinimg.com/originals/b1/a2/a0/b1a2a01103554b4d7a008ce7299dccfa.jpg' },
    { name: 'Women', image: 'https://i.pinimg.com/564x/94/da/38/94da38c644d6568b9e075a5e97763c12.jpg' },
    { name: 'Children', image: 'https://i.pinimg.com/564x/e1/29/a3/e129a3cc46172fd762d2f895dc997d65.jpg' },
    { name: 'Unisex', image: 'https://i.pinimg.com/564x/ae/83/b0/ae83b01d7a0bf94513728b53f5bb2884.jpg' },
  ];  

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };
  
  // Define your custom arrow components
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      />
    );
  }
  
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      />
    );
  }  

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

  return (
    <>
    <div className='hero-section'>
      <img src={HeroImage} className="hero-image" />
      <div className='hero-start'>
        <div className='hero-text'>
          <h1 className='bring-heading'>Bring the</h1>
          <h1 className='bring-heading'>warmth</h1>
          <p>Everyone needs a good winter jacket.</p>
          <p>Find yours with our collection and more.</p>
        </div>
    
      </div>
    </div>
    <div className="trending-brands">
      <div className="trending-brands-title">
        <h4>Trending Brands</h4>
      </div>
      <div className="trending-brands-names">
        <div className="trending-brands-logos">
          <img src="https://t1.gstatic.com/images?q=tbn:ANd9GcSjeyT4_WqSO8d04PhY9u5OxBSWyyw5-jLF3TWwBoC1z5z5FGAG" alt="" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </div>
        <div className="trending-brands-logos"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/CK_Calvin_Klein_logo.svg/821px-CK_Calvin_Klein_logo.svg.png" alt="" style={{ maxWidth: '200px', maxHeight: '200px' }} /></div>
        <div className="trending-brands-logos"><img src="https://i.pinimg.com/originals/9f/6f/08/9f6f08d9ca171e43ea8412ea4d67fa69.png" alt="" style={{ maxWidth: '200px', maxHeight: '200px' }}/></div>
        <div className="trending-brands-logos"><img src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/news/fi/aurelia1000x562-ae3d99a8bf.gif" alt="" style={{ maxWidth: '200px', maxHeight: '200px' }}/></div>
      </div>

    </div>
    <div className="Product-Carousel">
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index} className="Product-Carousel-products">
              <HomeProductsCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    <div className="Categories">
      <div className="Categories-title">
        <h2>Shop By Categories</h2>
      </div>
      <div className="Categories-names">
        {categories.map((category) => (
          <div className="Category" key={category.name}>
            <CategoriesCard category={category} />
          </div>
        ))}
      </div>
    </div>
    <div className="Grid-Container">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item><img src={GridCard1} alt="" /></Item>
        </Grid>
        <Grid xs={6}>
          <Item><img src={GridCard2} alt="" /></Item>
        </Grid>
        <Grid xs={6}>
          <Item><img src={GridCard3} alt="" /></Item>
        </Grid>
        <Grid xs={6}>
          <Item><img src={GridCard4} alt="" /></Item>
        </Grid>
      </Grid>
    </div>
    <div className="Banner">
      <div className='Banner-img'><img src={BannerImage} alt="" /></div>
      <div className="Banner-Content">
        <div className="Banner-title">
          <h4 style={{ color: '#377DFF', fontWeight: 'bold' }}>SALE UP TO 35% OFF</h4>
          <div className="Banner-title-header">
            <h1>HUNDREDS of</h1>
            <h1>New lower prices!</h1>
          </div>
          <p style={{ fontSize: '1.3vw' }}>Hurry up!!! Winter is coming!</p>
        </div>
        <div className="Banner-Button">
          <Button>Shop Now<ArrowForwardOutlinedIcon/></Button>
        </div>
      </div>
    </div>
    <div className="Values">
      <div className="Values-cards">
        <div className="Values-cards-icon"><LocalShippingOutlinedIcon style={{ fontSize: 48 }} /></div>
        <div className="Values-cards-text">
          <h2>Free Shipping</h2>
          <p>Order above $200</p>
        </div>
      </div>
      <div className="Values-cards">
        <div className="Values-cards-icon"><MoneyRoundedIcon style={{ fontSize: 48 }} /></div>
        <div className="Values-cards-text">
          <h2>Money Back</h2>
          <p>30 Days gurantee</p>
        </div>
      </div>
      <div className="Values-cards">
        <div className="Values-cards-icon"><LockOutlinedIcon style={{ fontSize: 48 }} /></div>
        <div className="Values-cards-text">
          <h2>Secure Payments</h2>
          <p>Secured by Stripe</p>
        </div>
      </div>
      <div className="Values-cards">
        <div className="Values-cards-icon"><CallOutlinedIcon style={{ fontSize: 48 }} /></div>
        <div className="Values-cards-text">
          <h2>24/7 Support</h2>
          <p>Phone and Email support</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
