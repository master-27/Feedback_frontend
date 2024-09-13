import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import API_URLS from '../Apiconfig';
import '../Css/AdminDashboard.css'; // Custom CSS for styling

function AdminDashboard() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [teachers, setTeachersData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    // Fetch feedback data for overview
    // fetch(API_URLS.BASE_URL+API_URLS.GET_USER+"feeds/" , {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //   .then(response => response.json())
    //   .then(data => setFeedbackData(data))
    //   .catch(error => console.error('Error fetching feedback data:', error));
    
    //Fetch teachers list
    fetch(API_URLS.BASE_URL+API_URLS.GET_USER+"allTeachers/" , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => setTeachersData(data))
      .catch(error => console.error('Error fetching teachers data:', error));
  }, []);

  const handleTeacherClick = (teacherId) => {
    // Fetch and set feedback for the selected teacher
    fetch(API_URLS.BASE_URL)
      .then(response => response.json())
      .then(data => {setSelectedTeacher(data)
        console.log(data);
  })
      .catch(error => console.error('Error fetching teacher feedback:', error));
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        {/* Add navigation or profile options here */}
      </header>
      <main className="dashboard-content">
        <section className="overview">
          <h2>Feedback Overview</h2>
        
        </section>
        <section className="teacher-list">
          <h2>List of Teachers</h2>
          <table>
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Subject</th>
                <th>Average Rating</th>
                <th>Total Feedbacks</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>
                    <Link to="#" onClick={() => handleTeacherClick(teacher.id)}>
                      {teacher.name}
                    </Link>
                  </td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.averageRating}</td>
                  <td>{teacher.totalFeedbacks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {selectedTeacher && (
          <section className="teacher-feedback">
            <h2>Feedback for Teacher {selectedTeacher.name}</h2>
            {/* Render feedback details for the selected teacher */}
            {/* You can add charts or detailed parameters here */}
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
