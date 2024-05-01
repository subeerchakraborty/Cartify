import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import image from "../assets/LogIn.jpg";

const SignUp = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    axios
      .post(`${domain}signup`, { username, password })
      .then((response) => {
        if (response.data.success) {
          onLogin(response.data.token);
        } else {
          // Handle signup failure...
        }
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Box sx={{ position: "relative", height: "100vh" }}>
            <img
              src={image}
              alt="Logo"
              style={{ width: "100%", height: "100%" }}
            />
            <Typography
              variant="h4"
              component="div"
              align="center"
              gutterBottom
              sx={{
                position: "absolute",
                top: "10%",
                color: "white",
                width: "100%",
              }}
            >
              Cartify
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              align="center"
              gutterBottom
            >
              Sign Up
            </Typography>
            <Typography
              variant="body1"
              component="div"
              align="center"
              gutterBottom
            >
              Already have an account?{" "}
              <Link href="/login" color="secondary">
                Log in
              </Link>
            </Typography>
            <TextField
              label="Your name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              onClick={navigate("/login")}
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                bgcolor: "black",
                color: "white",
                "&:hover": { backgroundColor: "black" },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUp;
