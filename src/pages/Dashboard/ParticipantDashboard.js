import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ParticipantDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('email')); // Replace with the actual participant's email

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/assesment/assessments/${email}`);
        setAssessments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-100">
       {/* <h1 className="text-3xl font-semibold mb-6">Participant Dashboard</h1> */}
       <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">Student Dashboard</h1>
        </div>
      </nav>

      {/* Display assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 ml-5">
        {assessments.map((assessment) => (
          <div key={assessment._id} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{assessment.name}</h2>
            <p className="text-gray-600 text-sm">Date: {assessment.date}, Time: {assessment.time}</p>
            <Link to={`/takeassessment/${assessment._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">
                Take Assessment
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantDashboard;