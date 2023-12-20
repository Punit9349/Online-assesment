import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ParticipantDashboard from './pages/Dashboard/ParticipantDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ManageAssesment from './pages/Assesment/ManageAssesment'
import CreateAssesment from './pages/Assesment/CreateAssesment'


function App() {
  return (
    <>
     <Router>
          <div className="container">
          <Routes> 
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/participantdashboard" element={<ParticipantDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/manageassesment" element={<ManageAssesment />} />
            <Route path="/createassesment" element={<CreateAssesment />} />
          </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
