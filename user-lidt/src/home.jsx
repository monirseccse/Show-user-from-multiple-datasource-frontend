import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure this file exists with proper styles

const Home = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState("nosql"); // Ensure dataSource is properly initialized

  const handleChange = (event) => {
    setDataSource(event.target.value); // Update dataSource correctly
  };

  const handleNavigate = () => {
    navigate("/users", { state: { dataSource } }); // Correctly pass dataSource in state
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="header-title">Welcome to the Dashboard</h1>
      </header>
      <div>
        <label htmlFor="dataSource">Select Data Source: </label>
        <select id="dataSource" value={dataSource} onChange={handleChange}>
          <option value="sql">SQL</option>
          <option value="nosql">NoSQL</option>
        </select>
        <p>Selected Data Source: {dataSource}</p>
      </div>
      <div className="content">
        <button className="navigate-button" onClick={handleNavigate}>
          Go to User List
        </button>
      </div>
    </div>
  );
};

export default Home;
