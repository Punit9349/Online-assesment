import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AssessmentsList = () => {
  const [assessments, setAssessments] = useState([]);
  const host= "http://localhost:5000"
  const headers = {
    'Content-Type': 'application/json',
    'auth-token': localStorage.getItem('token'), 
  };

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(`${host}/api/assesment/assessments`, {headers});
        console.log(response);
        setAssessments(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <div>
      <h1>Assessments List</h1>
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment._id}>
            <Link to={`/takeassessment/${assessment._id}`}>
              {assessment.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssessmentsList;
