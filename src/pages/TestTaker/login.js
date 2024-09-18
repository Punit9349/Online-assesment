import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const StudentLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate=useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/studentlogin', { email, password });
      console.log('Login successful! Token:', response.data.token);
      localStorage.setItem('email',email);
      Navigate('/studentdashboard');
      // You can save the token in the local storage and navigate to the student dashboard or any other page
    } catch (error) {
      alert('Invalid email or password');  
      console.error('Error logging in:', error);
      // Handle login error (show message, redirect, etc.)
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-semibold mb-8 text-center text-blue-500 border-b-2 pb-5">
        Student Login
      </h1>

      <div className="max-w-md mx-auto bg-white p-8 border rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700 block">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700 block">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default StudentLoginPage;
