import React, { useEffect, useState } from "react";
import "./user-list.css";
import { useNavigate, useSearchParams } from "react-router-dom";


const UserList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; 

  const [dataSource, setDataSource] = useState("nosql"); 

  const handleChange = (event) => {
    setDataSource(event.target.value); // Update the state with the selected value
  };

  // Fetch users from the API
  const fetchUsers = async (page) => {
    setLoading(true);
    try {

      const response = await fetch(
        `https://localhost:7006/api/User?PageNumber=1&ItemsPerPage=10`,
        {
          method: "GET", // Set the method to GET
          headers: {
            "Content-Type": "application/json",
            "Datasource": dataSource, // Added datasource header
          },
        }
      );
      // if (!response.ok) {
      //   throw new Error("Failed to fetch users.");
      // }

      const data = await response.json();


      console.log(data)
      setUsers(data.items || []); // Update user list
      setCurrentPage(data.pageNumber); // Update current page
      setTotalPages(data.totalPages); // Update total pages
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when the component mounts or the page changes
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);


  useEffect(() => {
    fetchUsers()
    // setSearchParams({ currentPage: 1, filter: "active" });
  }, [])

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Delete a user by ID
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7006/api/User/${userId}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "Datasource": dataSource, // Added datasource header
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("User deleted successfully.");
    } catch (err) {
      alert(`Error deleting user: ${err.message}`);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  //   if (error) {
  //     return <p style={{ color: "red" }}>{error}</p>;
  //   }

  return (
    <div className="container">
      <div>
        <label htmlFor="dataSource">Select Data Source: </label>
        <select id="dataSource" value={dataSource} onChange={handleChange}>
          <option value="sql">SQL</option>
          <option value="nosql">NoSQL</option>
        </select>
        <p>Selected Data Source: {dataSource}</p>
        <button onClick={() => fetchUsers()}>Fetch Data</button>
      </div>
      <div className="table-header">
        <h1>User List</h1>
        <button
          className="create-button"
          onClick={() => navigate("/users/create")}
        >
          Create User
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.active ? "Yes" : "No"}</td>
              <td>{user.company}</td>
              <td>
                <button
                  className="action-button view"
                  onClick={() => navigate(`/users/view/${user.id}`)}
                >
                  View
                </button>
                <button
                  className="action-button edit"
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
