import React from "react";
import Navbar from "../components/Navbar";
import "./Home.css"

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h2> Welcome to the Event Managemnet Platform</h2>
            </div>
        </div>
    );
};

export default Home;