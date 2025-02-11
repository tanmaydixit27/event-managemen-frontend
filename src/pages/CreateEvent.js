import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./CreateEvent.css";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "", // ✅ Using `name` instead of `title`
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // ✅ Ensure date is properly formatted
    const formattedDate = eventData.date ? new Date(eventData.date).toISOString() : "";

    const formattedEventData = {
      name: eventData.name.trim(), // ✅ Trim spaces
      description: eventData.description.trim(),
      date: formattedDate,
    };

    // ✅ Debugging: Log event data before sending
    console.log("📤 Sending Event Data:", formattedEventData);

    // ✅ Check if required fields are missing before sending the request
    if (!formattedEventData.name || !formattedEventData.date) {
      alert("❌ Name and Date are required!");
      return;
    }

    try {
      const response = await axios.post("https://event-management-backend-it09.onrender.com/api/events", formattedEventData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Event Created:", response.data);
      alert("🎉 Event Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error creating event:", error.response?.data || error.message);
      alert("❌ Failed to create event!");
    }
  };

  if (!user) {
    return <Typography variant="h6">Please log in to create events.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">Create Event</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          name="name"
          fullWidth
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
          required
        />
        <TextField
          type="datetime-local"
          name="date"
          fullWidth
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
          Create Event
        </Button>
      </form>
    </Container>
  );
};

export default CreateEvent;
