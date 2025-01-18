import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure to import the CSS file

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="header-title">Welcome to the Dashboard</h1>
      </header>
      <div className="content">
        <button className="navigate-button" onClick={() => navigate("/users")}>
          Go to User List
        </button>
      </div>
    </div>
  );
};

export default Home;
