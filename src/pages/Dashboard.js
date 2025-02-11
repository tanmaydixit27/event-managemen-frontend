import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import EventCard from "../components/EventCard";
import { EventContext } from "../context/EventContext";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { events, setEvents } = useContext(EventContext);
  const token = localStorage.getItem("token");

  // ✅ Fetch Events
  const fetchEvents = useCallback(async () => {
    try {
      const res = await axios.get("https://event-management-backend-it09.onrender.com/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Events:", res.data);

      setEvents(
        res.data.map(event => ({
          ...event,
          title: event.title || event.name || "Untitled Event",
        }))
      );
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  }, [token, setEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ✅ Delete Event
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`https://event-management-backend-it09.onrender.com/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("🚨 Error deleting event:", error.response?.data?.message || error.message);
      alert("Failed to delete event!");
    }
  };


  const handleUpdate = async (eventId, updatedData) => {
    try {
      const updatedEvent = {
        ...updatedData,
        name: updatedData.title || updatedData.name, 
      };

      const res = await axios.put(
        `https://event-management-backend-it09.onrender.com/api/events/${eventId}`,
        updatedEvent,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Updated Event Response:", res.data);

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, ...updatedData, title: updatedData.title || updatedData.name }
            : event
        )
      );
    } catch (error) {
      console.error("❌ Error updating event:", error.response?.data || error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Container>
          <Typography variant="h4" gutterBottom>
            Event Dashboard
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/create-event")}
            style={{ marginBottom: "20px" }}
          >
            Create Event
          </Button>

         
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <EventCard event={event} onDelete={handleDelete} onUpdate={handleUpdate} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
