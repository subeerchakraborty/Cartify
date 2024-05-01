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

const LogIn = ({ onLogin }) => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${domain}login`, {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.data.success) {
          onLogin(response.data.token);
        } else {
          // Handle login failure...
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        sx={{ display: "flex", flexDirection: "row", height: "100vh" }}
      >
        <Grid item xs={6} sx={{ overflow: "hidden" }}>
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
        <Grid item xs={6} sx={{ overflowY: "auto" }}>
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
              Log In
            </Typography>
            <Typography
              variant="body1"
              component="div"
              align="center"
              gutterBottom
            >
              Don't have an account yet?{" "}
              <Link href="/signup" color="secondary">
                Sign Up
              </Link>
            </Typography>
            <TextField
              label="Your name or email address"
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
            <Typography
              variant="body2"
              component="div"
              align="right"
              gutterBottom
            >
              <Link href="/forgot-password" color="secondary">
                Forgot Password?
              </Link>
            </Typography>
            <Button
              type="submit"
              onClick={navigate("/home")}
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
              Log In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default LogIn;
