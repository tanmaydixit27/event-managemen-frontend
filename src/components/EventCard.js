import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Modal, TextField } from "@mui/material";
import "./EventCard.css";

const EventCard = ({ event, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: event.title,
    date: event.date,
    description: event.description,
  });

  const handleChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(event._id, updatedEvent);
    setOpen(false);
  };

  return (
    <Card className="event-card">
      <CardContent>
      <Typography variant="h6" className="event-title">
        {event.title || "Untitled Event"}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {new Date(event.date).toLocaleString()}
        </Typography>
        <Typography variant="body2">{event.description}</Typography>

        {/* Edit and Delete Buttons */}
        <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginTop: "10px", marginRight: "10px" }}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onDelete(event._id)} style={{ marginTop: "10px" }}>
          Delete
        </Button>
      </CardContent>

      {/* Edit Event Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modal-content">
          <Typography variant="h6">Edit Event</Typography>
          <TextField label="Title" name="title" value={updatedEvent.title} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Date" name="date" type="datetime-local" value={updatedEvent.date} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Description" name="description" value={updatedEvent.description} onChange={handleChange} fullWidth margin="normal" />
          
          <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: "10px" }}>
            Save Changes
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default EventCard;