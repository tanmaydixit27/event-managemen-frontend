import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials.email, credentials.password);
    navigate("/dashboard");
  };

  return (
    <Container className="login-container">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>

      {/* Registration Link */}
      <Typography variant="body2" className="register-link">
        Don't have an account?{" "}
        <Link href="/#/register" underline="hover">
          Register here
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
