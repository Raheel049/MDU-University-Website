import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllCourses = () => {

  const API = import.meta.env.VITE_API_URL;
  const [courses, setCourses] = useState([]);

  const allCourses = async () => {
    try {
      const response  = await axios.get(`${API}/api/admin/allCourses`);
      if(response.data.status){
        setCourses(response.data.data);
      }
    } catch (error) {
      alert("error", error.message);
    }
  }

  useEffect(() => {
    allCourses();
  },[]);
 
  return (
    <>
    <div>
    <table>
      <thead>
        <tr>
        <th>#</th>
        <th>CourseName</th>
        <th>CourseCode</th>
        </tr>  
      </thead>
      <tbody>
        {
          courses.map((courses,index) => (
            <tr key={courses._id}>
              <td>{index+1}</td>
              <td>{courses.courseName}</td>
              <td>{courses.courseCode}</td>
            </tr>
          ))
        }
        
      </tbody>
    </table>
    </div>
    </>
  )
}

export default AllCourses