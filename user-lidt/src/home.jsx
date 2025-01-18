import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Dashbaord</h1>
      <ul className="nav-list">
        <li className="nav-item" onClick={() => navigate("/users")}>
          User List
        </li>
      </ul>
    </div>
  );
};

export default Home;
