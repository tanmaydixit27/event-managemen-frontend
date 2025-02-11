import React from "react";
import { HashRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/AuthContext";
import { EventProvider } from "./context/EventContext"; // ✅ Import EventProvider
import CreateEvent from "./pages/CreateEvent";

const App = () => {
  return (
    <AuthProvider>
      <EventProvider> {/* ✅ Wrap Dashboard with EventProvider */}
        <Router>
          <Routes>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
