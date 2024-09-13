import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Landing.css'
import Header from "../header";

const LandingPage = () => {
  const navigate = useNavigate();
  
  
  return (
    <>
  
    
    
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Feedback System</h1>
      <p className="landing-subtitle">Choose your role to login</p>

      <div className="button-container">
        <Link to="/admin-login">
          <button className="login-btn admin-btn">Login as Admin</button>
        </Link>
        <Link to="/student-login">
          <button className="login-btn student-btn">Login as Student</button>
        </Link>
      </div>
    </div>
   
    </>
  );
  
};

export default LandingPage;
