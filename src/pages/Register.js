import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Register.css";

const Register = () => {
  const { register } = useContext(AuthContext); // ✅ Make sure this is imported correctly
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(credentials.name, credentials.email, credentials.password);
      navigate("/dashboard"); // ✅ Redirect after successful registration
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Container className="register-container">
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" fullWidth onChange={handleChange} required />
        <TextField label="Email" name="email" fullWidth onChange={handleChange} required />
        <TextField label="Password" name="password" type="password" fullWidth onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
