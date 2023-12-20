import React from 'react';

const ParticipantDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-green-500 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">Participant Dashboard</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        {/* Upcoming Assessments */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Assessments</h2>
          {/* Display upcoming assessments for participants */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow-md mb-4">
              <p className="text-gray-700">Assessment 1</p>
              <p className="text-gray-500 text-sm">Date: 2023-11-15, Time: 10:00 AM</p>
              <button className="bg-green-500 text-white mt-2 px-4 py-2 rounded hover:bg-green-600">
                Start Assessment
              </button>
            </div>
            {/* Repeat the above block for other upcoming assessments */}
          </div>
        </div>

        {/* Feedback and Analytics Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
          {/* Display recent results for participants */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow-md mb-4">
              <p className="text-gray-700">Assessment 1</p>
              <p className="text-gray-500 text-sm">Score: 85%</p>
              <button className="bg-green-500 text-white mt-2 px-4 py-2 rounded hover:bg-green-600">
                View Details
              </button>
            </div>
            {/* Repeat the above block for other recent results */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
