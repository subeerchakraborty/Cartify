import React from 'react';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MoneyRoundedIcon from '@mui/icons-material/MoneyRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

const ContactUs = () => {
  return (
    <>
    <Box sx={{ flexGrow: 1, m: 4 }}>
      <Typography variant="h4" component="div" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <IconButton color="primary">
              <HomeIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" gutterBottom>Address</Typography>
            <Typography variant="body1">MS, Opposite to check post no. 2 Ordinance Factory Jawaharnagar Bhandara-441906, 441906</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <IconButton color="primary">
              <PhoneIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Typography variant="body1">7020343561</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <IconButton color="primary">
              <EmailIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" gutterBottom>Email</Typography>
            <Typography variant="body1">devk28061994@gmail.com</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', height: '400px', marginTop: '2rem' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.8899582839977!2d79.539449075034!3d21.116952880554496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2b4982f4e7e9f5%3A0x2a0bd68598e88ed4!2sJai%20kaali%20cloth%20store!5e0!3m2!1sen!2sin!4v1707538058438!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          allowFullScreen 
          loading="lazy" 
          title="Location"
          style={{ border: 0 }}
        />
      </Box>
    </Box>
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
  );
};

export default ContactUs;
