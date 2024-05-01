import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';
import Product from './components/Product';
import ContactUs from './components/ContactUs';
import Cart from './components/Cart';
import MyAccount from './components/MyAccount';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import AddProduct from './components/AddProduct.jsx';
import UpdateProduct from './components/UpdateProduct.jsx';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setIsAuthenticated(!!token);
  // }, []);

  // const handleLogin = (token) => {
  //   localStorage.setItem('token', token);
  //   setIsAuthenticated(true);
  // };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/update-product/:productId" element={<UpdateProduct />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account-details" element={<MyAccount />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<Home/>} />
      </Routes>
      <Footer />
        {/* <Routes>
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/*" element={<LogIn />} />
        </Routes> */}
    </BrowserRouter>
  );
}
export default App;