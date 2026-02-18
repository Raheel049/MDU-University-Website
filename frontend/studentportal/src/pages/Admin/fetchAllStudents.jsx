import axiosInstance from '../../api/axoisInstance';
import React, { useEffect, useState } from 'react';
import styles from './fetchAllStudent.module.css';
import { FaTrashAlt, FaSearch } from 'react-icons/fa';

const FetchAllStudent = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const fetchAllStudents = async () => {
    try {
      const response = await axiosInstance.get(`${API}/api/admin/allStudents`);
      if (response.data.status) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const handleDrop = async (id) => {
    if (window.confirm("Are you sure you want to drop this student?")) {
      try {
        const res = await axiosInstance.delete(`${API}/api/admin/dropStudent/${id}`);
        if (res.data.status) {
          // List update karein bina refresh kiye
          console.log(id)
          setStudents(students.filter(s => s._id !== id));
        }
      } catch (err) {
        alert("Error",err.message);
      }
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  // Filter logic for search bar
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>All Registered Students</h1>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.studentTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td className={styles.idCell}>{student.studentID}</td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>
                    <button 
                      className={styles.dropBtn} 
                      onClick={() => handleDrop(student._id)}
                    >
                      <FaTrashAlt /> Drop Student
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchAllStudent;