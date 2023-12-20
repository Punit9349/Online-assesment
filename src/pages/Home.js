import React from 'react'

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Welcome to the Assessment Platform</h1>
        <p className="text-gray-700 mb-6">
          Streamline your hiring process with our online assessment platform.
        </p>
        <div className="flex space-x-4">
          <a href='/signin'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Sign In
            </button>
          </a>

          <a href='/signup'>
            <button className="bg-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-600">
              Sign Up
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home