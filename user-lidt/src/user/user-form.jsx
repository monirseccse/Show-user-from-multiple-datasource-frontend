import React, { useEffect, useState } from "react";
import "./user-form.css";
import { useNavigate, useParams,useLocation } from "react-router-dom";



const UserForm = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  const location = useLocation();
  const { dataSource } = location.state || {};

  console.log("Received dataSource:", dataSource);
  console.log(id)

  const [roles, setRoles] = useState([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    active: false,
    company: "",
    sex: "",
    role: { id: "", name: "" },
    contact: {
      phone: "",
      address: "",
      city: "",
      country: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchRoles = async () => {
    try {

      const response = await fetch(
        `https://localhost:7006/api/Role`, {
          method: "GET", // Set the method to GET
          headers: {
            "Content-Type": "application/json",
            "Datasource": dataSource, // Added datasource header
          },
        }
      );

      const data = await response.json();
      setRoles(data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoles()
  }, [])


  const fetchUserDetails = async (id) => {
    try {

      const response = await fetch(
        `https://localhost:7006/api/User/${id}`, {
          method: "GET", // Set the method to GET
          headers: {
            "Content-Type": "application/json",
            "Datasource": dataSource, // Added datasource header
          },
        }
      );

      const data = await response.json();
      setFormData(data?.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails(id)
    }
  }, [id])


  // Basic validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.sex) newErrors.sex = "Sex is required";
    if (!formData.role.id) newErrors.role = "Role is required";
    if (!formData.contact.phone) newErrors.phone = "Phone number is required";
    if (!formData.contact.address) newErrors.address = "Address is required";
    if (!formData.contact.city) newErrors.city = "City is required";
    if (!formData.contact.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const apiUrl = id 
  ? `https://localhost:7006/api/User/${id}` 
  : `https://localhost:7006/api/User`;

  const method = id ? "PUT" : "POST";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    
    try {
      const response = await fetch(`${apiUrl}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Datasource": dataSource
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Server Response:", result);

      //console.log("Form Data:", formData);

      alert("Form submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        active: false,
        company: "",
        sex: "",
        role: { id: "", name: "" },
        contact: {
          phone: "",
          address: "",
          city: "",
          country: "",
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [contactField]: value },
      }));
    } else if (name === "role") {
      const selectedRole = roles.find((role) => role.id === parseInt(value));
      setFormData((prev) => ({
        ...prev,
        role: selectedRole || { id: "", name: "" },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  return (
    <div className="form-container">
      <div className="header">
        <h1>{id ? "Edit User" : "Create User"}</h1>
        <button
          className="back-button"
          onClick={() => navigate("/users", { state: { dataSource } })}
        >Back</button>

      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field-container">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>

        <div className="field-container">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="field-container">
          <label htmlFor="active">Active</label>
          <input
            type="checkbox"
            name="active"
            id="active"
            checked={formData.active}
            onChange={handleChange}
          />
        </div>

        <div className="field-container">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            id="company"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && <span className="error">{errors.company}</span>}
        </div>

        <div className="field-container">
          <label htmlFor="sex">Sex</label>
          <input
            type="text"
            name="sex"
            id="sex"
            value={formData.sex}
            onChange={handleChange}
            placeholder="Enter Male or Female"
          />
          {errors.sex && <span className="error">{errors.sex}</span>}
        </div>

        <div className="field-container">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={formData.role?.id}
            onChange={handleChange}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role && <span className="error">{errors.role}</span>}
        </div>

        <fieldset className="field-container">
          <legend>Contact</legend>
          <div>
            <label htmlFor="contact.phone">Phone</label>
            <input
              type="text"
              name="contact.phone"
              id="contact.phone"
              value={formData.contact?.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div>
            <label htmlFor="contact.address">Address</label>
            <input
              type="text"
              name="contact.address"
              id="contact.address"
              value={formData.contact?.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div>
            <label htmlFor="contact.city">City</label>
            <input
              type="text"
              name="contact.city"
              id="contact.city"
              value={formData.contact?.city}
              onChange={handleChange}
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>
          <div>
            <label htmlFor="contact.country">Country</label>
            <input
              type="text"
              name="contact.country"
              id="contact.country"
              value={formData.contact?.country}
              onChange={handleChange}
            />
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
        </fieldset>

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
