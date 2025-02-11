import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const API_BASE_URL = "https://event-management-backend-it09.onrender.com/api/events";

  //  Fetch only events for the logged-in user
  const getEvents = useCallback(async () => {
    if (!token || !user) return;

    try {
      const res = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("🚨 Error fetching events:", err.message);
    }
  }, [token, user]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  // ✅ Create Event
  const createEvent = async (eventData) => {
    try {
      const res = await axios.post(API_BASE_URL, eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prevEvents) => [...prevEvents, res.data]); //  Update events locally
      return res.data;
    } catch (error) {
      console.error("🚨 Error creating event:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  // ✅ Update Event
  const updateEvent = async (eventId, updatedEventData) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/${eventId}`,
        updatedEventData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === eventId ? res.data : event))
      ); // ✅ Update state

      console.log("Event Updated:", res.data);
    } catch (error) {
      console.error("Error updating event:", error.response?.data || error.message);
    }
  };

  // ✅ Delete Event
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId)); //  Remove event from state
    } catch (error) {
      console.error("Error deleting event:", error.response?.data || error.message);
    }
  };

  return (
    <EventContext.Provider value={{ events, setEvents, createEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
