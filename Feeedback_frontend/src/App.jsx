import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import AdminLogin from "./Components/AdminLogin";
import StudentLogin from "./Components/StudentLogin";
import StudentSubjects from "./Components/StPage.jsx";
import FeedbackForm from "./Components/Feedback.jsx";
import AdminDashboard from './Components/AdminDashboard.jsx'
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<AdminDashboard />} />
      <Route path="admin-login/" element={<AdminLogin /> }/>
       <Route path="student-login/" element={<StudentLogin />} /> 
       <Route path="subjects/" element={<StudentSubjects/>}/>
       <Route path="feedback/" element = {<FeedbackForm/>}/>
       <Route path="aDashboard/" element={<AdminDashboard/>}/>
    </Routes>
  );
}

export default App;
