import React, { useEffect, useState } from "react";
import "./user-view.css";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UserView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { dataSource } = location.state || {};

  console.log("Received dataSource:", dataSource);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`https://localhost:7006/api/Role`);
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const fetchUserDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`https://localhost:7006/api/User/${id}`, {
        method: "GET", // Set the method to GET
        headers: {
          "Content-Type": "application/json",
          "Datasource": dataSource, // Added datasource header
        },
      });
      const data = await response.json();
      setFormData(data?.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
    if (id) {
      fetchUserDetails(id);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!formData) {
    return <p>No data available</p>;
  }

  return (
    <div className="form-container">
      <div className="header">
        <h1>{id ? "User Details" : "Create User"}</h1>
        <button
          className="back-button"
          onClick={() => navigate("/users", { state: { dataSource } })}
        >
          Back
        </button>
      </div>

      {id ? (
        <div className="user-details">
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Active:</strong> {formData.active ? "Yes" : "No"}</p>
          <p><strong>Company:</strong> {formData.company}</p>
          <p><strong>Sex:</strong> {formData.sex}</p>
          <p>
            <strong>Role:</strong> {formData.role?.name || "N/A"}
          </p>
          <fieldset>
            <legend><strong>Contact Information</strong></legend>
            <p><strong>Phone:</strong> {formData.contact?.phone || "N/A"}</p>
            <p><strong>Address:</strong> {formData.contact?.address || "N/A"}</p>
            <p><strong>City:</strong> {formData.contact?.city || "N/A"}</p>
            <p><strong>Country:</strong> {formData.contact?.country || "N/A"}</p>
          </fieldset>
        </div>
      ) : (
        <p>Form is only for creating new users.</p>
      )}
    </div>
  );
};

export default UserView;
