// components/Signin.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';
import { authenticateUser } from "../Redux/authreducer";

const Signin = ({authenticateUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate=useNavigate();

  const handleSignIn = async() => {
    try {
      const host= "http://localhost:5000"
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const json = await response.json();
      // Handle the response data as needed
      // console.log(json);
      if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        authenticateUser(json.authToken);
        alert("Logged in successfully", "success")
        navigate("/admindashboard");
      }else{
        alert("Invalid Details", "danger")
      }

    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  authenticateUser,
};

export default connect(null, mapDispatchToProps)(Signin);
