import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const AdminDashboard = () => {
  const host= "http://localhost:5000"
  let navigate=useNavigate();
  const [assessments, setAssessments] = useState([]);
  const headers = {
    'Content-Type': 'application/json',
    'auth-token': localStorage.getItem('token'), 
  };

  useEffect(() => {

    const authToken = localStorage.getItem('token');
    if (!authToken) {
      // Redirect the user to the login page or handle the unauthorized access appropriately
      navigate('/signin');
      return;
    }

    const fetchAssessments = async () => {
      try {
        const response = await axios.get(`${host}/api/assesment/assessments`, {headers}); // Update the endpoint based on your server
        console.log(response);
        setAssessments(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        {/* Upcoming Assessments */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Assessments</h2>
          {/* Display all assessments for admin */}
          <div className="grid grid-cols-3 gap-4">
            {assessments.map((assessment) => (
              <div key={assessment._id} className="bg-white p-4 rounded shadow-md mb-4">
                <p className="text-gray-700">{assessment.name}</p>
                <p className="text-gray-500 text-sm">Date: {assessment.date}, Time: {assessment.time}</p>
                <button
                  className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => navigate("/manageassesment")}
                >
                  Manage Assessment
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Create Assessment Button */}
        <div className="mt-8">
          <a href="/createassesment">
            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
              Create Assessment
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
