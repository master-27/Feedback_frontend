import React, {useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../Css/AdminLogin.css'; 
import API_URLS from '../apiConfig'


function AdminLogin() {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch(API_URLS.BASE_URL + API_URLS.AUTH_URL + "adminLogin/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "adminId": adminId,
                "password": password
            })
        })
        .then(response => {
            if (response.ok) { // Check if the response status is OK
                return response.json(); // Parse the JSON data
            } else {
                throw new Error('Network response was not ok.'); // Handle errors
            }
        })
        .then(data => {
           // console.log(data); // Use the parsed JSON data
            // Handle successful login
            navigate("aDashboard/")
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("An error occurred while logging in.");
        });
    };
    

    return (
        <div className="admin-login-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Admin ID"
                    value={adminId}
                    onChange={(event) => setAdminId(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
