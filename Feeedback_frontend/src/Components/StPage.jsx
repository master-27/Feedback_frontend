import React, { useState, useEffect } from "react";
import "../Css/StudentSubjects.css"; // Import the CSS for styling
import { useLocation, useNavigate } from "react-router-dom";
import API_URLS from "../Apiconfig";

function StudentSubjects(props) {
  const [studentId, setStudentId] = useState(null);
  const [subjects, setSubjects] = useState([]); // Manage subjects with useState
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(location.state && location.state.id)
    setStudentId(location.state.id);
    else{
      console.log("No student id found");
    }
  }, [props.id]); // Update the student ID when props.id changes

  useEffect(() => {
    if (studentId) {
      getSubjects(); // Fetch subjects when studentId is available
    }
  }, [studentId]);

  console.log("StudentId: "+ studentId);
  const subjectDetails = () => {
    return fetch(API_URLS.BASE_URL + API_URLS.STUDENT + "getSubjects", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "studentId": studentId
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching subjects');
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      alert("An exception occurred");
    });
  };

  async function getSubjects() {
    
    const data = await subjectDetails();
    console.log("after await get subjects" + data.length)
    const formattedSubjects = data.map(subject => ({
      id: subject.id,
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      teacherName: subject.teacher.name,
      teacherId: subject.teacher.id,
      className: `${subject.clas.program} - ${subject.clas.semester} - Section: ${subject.clas.section}`
    }));
    setSubjects(formattedSubjects); // Update state with formatted subjects
  }

  console.log("subjects: "+ subjects);
  // Handle feedback submission for a subject
  const handleFeedbackClick = (subjectId) => {
    alert(`Provide feedback for Subject ID: ${subjectId}`);
  
    // Find the specific subject based on the subjectId
    const selectedSubject = subjects.find(subject => subject.id === subjectId);
  
    if (selectedSubject) {
      // Navigate to the feedback form, passing the required details via state
      navigate("/feedback", {
        state: {
          studentId: studentId,
          subjectId: selectedSubject.subjectCode, // Assuming subjectCode is needed
          teacherId: selectedSubject.teacherId, // Assuming teacherName or teacherId is needed
        }
      });
    } else {
      console.error("Subject not found");
    }
  };
  

  return (
    <>
   
    <div className="student-subjects-container">
      <h1>Your Subjects and Teachers</h1>
      <div className="subjects-list">
        {subjects.map((subject) => (
          <div className="subject-card" key={subject.id}>
            <div className="subject-info">
              <h2>{subject.subjectName}</h2>
              <p>Teacher: {subject.teacherName}</p>
              <p>Class: {subject.className}</p>
            </div>
            <button
              className="feedback-btn"
              onClick={() => handleFeedbackClick(subject.id)}
            >
              Give Feedback
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default StudentSubjects;
