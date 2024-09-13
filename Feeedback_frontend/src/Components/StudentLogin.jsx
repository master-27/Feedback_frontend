import { useState } from 'react';
import '../Css/StudentLogin.css'; // Ensure you import the CSS file
import Header from '../header';
import axios, { AxiosHeaders } from 'axios';
import API_URLS from '../Apiconfig';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
    const [studentId, setStudentId] = useState("");
    const [otp, setOtp] = useState("");
    const [contactMethod,setContactMethod] = useState("");
   const navigate = useNavigate();
    const Login = (event) => {
        event.preventDefault();
    
        if (otp.length !== 6) {
            alert("OTP must be 6 digits long");
            return;
        }
    
        fetch(API_URLS.BASE_URL + API_URLS.AUTH_URL + "verifyOtp/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "studentId": studentId,
                "contactMethod": contactMethod,
                "otp": otp
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the boolean response as JSON
            } else {
                throw new Error('Failed to verify OTP');
            }
        })
        .then(isVerified => {
            console.log(isVerified)
            if (isVerified) {  // true if OTP matched
                //alert("OTP Verified! You will be logged in.");
                console.log("stId: from loginPage: " + studentId)
                navigate("/subjects",{ state: { id: studentId } });
            } else {  // false if OTP did not match
                alert("OTP does not match");
            }
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while verifying OTP");
        });
    }
    
        
       

        //verify otp here.

        
    
    
        function generateOtp() {
            setOtp("")
            fetch(API_URLS.BASE_URL + API_URLS.AUTH_URL + "generateOtp/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "studentId": studentId,
                    "contactMethod": contactMethod
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse response as JSON
                } else {
                    throw new Error('Failed to generate OTP');
                }
            })
            .then(data => {
                if (data) {
                    alert("OTP generated");
                } else {
                    alert("User does not exist");
                }
            })
            .catch(error => {
                console.error(error);
                alert("An error occurred while generating OTP");
            });
        }
        

    

    return (
        <>
     
      
        <div className="student-login-container">
            <h1>Student Login</h1>
            <form onSubmit={Login}>
                <input 
                    type="text" 
                    placeholder="Student ID" 
                    value={studentId}
                    onChange={(event) => setStudentId(event.target.value)} 
                />
                <div className='Contact-div'>
               <label>
                <input type='radio' value="email" onChange={(event)=>{setContactMethod("email")}}name='contact' />Email
                </label>
                <label>           
                <input type='radio' value ="sms" name='contact' onChange={(event)=>{setContactMethod("sms")}} />Sms
                </label>  
                </div>
                <button type="button" onClick={generateOtp}>Generate Otp</button>
                <input  
                    type="text" 
                    placeholder="Enter Otp" 
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    );
}


export default StudentLogin;
