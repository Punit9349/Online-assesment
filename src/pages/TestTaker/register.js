import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const RegistrationPage = () => {
  let navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: '',
    collegeName: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if the user is already registered when the component mounts
    const checkRegistration = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/check-registration/${formData.email}`);
        setIsRegistered(response.data.isRegistered);
      } catch (error) {
        console.error('Error checking registration status:', error);
      }
    };

    checkRegistration();
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a registration API endpoint on your backend
      const response = await axios.post(`http://localhost:5000/api/auth/register`, formData);

      // Handle success, e.g., redirect to login page
      localStorage.setItem('email', formData.email);
      alert('Registration successful.');
      navigate('/studentdashboard');
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle registration failure, display an error message, etc.
      alert('Not Registered');
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Test Giver Registration</h1>

      {isRegistered ? (
        <div className="max-w-md mx-auto bg-white p-8 border rounded shadow-md text-center">
          <p className="text-gray-700 mb-4">You are already registered. Please log in instead.</p>
          {/* Add a link or button to redirect to the login page */}
          <a href="/studentlogin" className="text-blue-500 hover:underline">Log In</a>
        </div>
      ) : (
        <form className="max-w-md mx-auto bg-white p-8 border rounded shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded mt-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded mt-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded mt-2"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rollNo" className="text-gray-700 block">
              Roll No
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              className="w-full p-2 border rounded mt-2"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="collegeName" className="text-gray-700 block">
              College Name
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              className="w-full p-2 border rounded mt-2"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrationPage;



// import React, { useState } from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom'

// const RegistrationPage = () => {
//   let navigate=useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     rollNo: '',
//     collegeName: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Assuming you have a registration API endpoint on your backend
//       const response = await axios.post(`http://localhost:5000/api/auth/register`, formData);

//       // Handle success, e.g., redirect to login page
//       localStorage.setItem('email', formData.email);
//       alert('Registration successful.');
//       navigate('/participantdashboard');
//       console.log('Registration successful:', response.data);
//     } catch (error) {
//       // Handle registration failure, display an error message, etc.
//       alert('Not Registered');
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-3xl font-semibold mb-6 text-center">Student Registration</h1>
//       <form className="max-w-md mx-auto bg-white p-8 border rounded shadow-md" onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="text-gray-700 block">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="w-full p-2 border rounded mt-2 focus:outline-none focus:border-blue-500"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="text-gray-700 block">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="w-full p-2 border rounded mt-2 focus:outline-none focus:border-blue-500"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="text-gray-700 block">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="w-full p-2 border rounded mt-2 focus:outline-none focus:border-blue-500"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="rollNo" className="text-gray-700 block">
//             Roll No
//           </label>
//           <input
//             type="text"
//             id="rollNo"
//             name="rollNo"
//             className="w-full p-2 border rounded mt-2 focus:outline-none focus:border-blue-500"
//             value={formData.rollNo}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="collegeName" className="text-gray-700 block">
//             College Name
//           </label>
//           <input
//             type="text"
//             id="collegeName"
//             name="collegeName"
//             className="w-full p-2 border rounded mt-2 focus:outline-none focus:border-blue-500"
//             value={formData.collegeName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationPage;


// import React, { useState } from 'react';
// import axios from 'axios';

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     rollNo: '',
//     collegeName: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Assuming you have a registration API endpoint on your backend
//       const response = await axios.post(`http://localhost:5000/api/auth/register`, formData);

//       // Handle success, e.g., redirect to login page
//       localStorage.setItem('email',formData.email);
//       alert('Registration successful.');
      
//       console.log('Registration successful:', response.data);
//     } catch (error) {
//       // Handle registration failure, display an error message, etc.
//       alert('Not Registered');
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-semibold mb-4">Test Giver Registration</h1>
//       <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="text-gray-700 block">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="w-full p-2 border rounded mt-2"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="text-gray-700 block">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="w-full p-2 border rounded mt-2"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="text-gray-700 block">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="w-full p-2 border rounded mt-2"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="rollNo" className="text-gray-700 block">
//             Roll No
//           </label>
//           <input
//             type="text"
//             id="rollNo"
//             name="rollNo"
//             className="w-full p-2 border rounded mt-2"
//             value={formData.rollNo}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="collegeName" className="text-gray-700 block">
//             College Name
//           </label>
//           <input
//             type="text"
//             id="collegeName"
//             name="collegeName"
//             className="w-full p-2 border rounded mt-2"
//             value={formData.collegeName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationPage;
