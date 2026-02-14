import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./registerStudent.module.css";

const RegisterStudent = ({ admissionData }) => {
  const API = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  
  // Initial State
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    studentID: "",
    department: "",
    batch: new Date().getFullYear().toString(),
    semester: "1",
    password: "Student123" // Default password
  });

  // useEffect se data map karna
  useEffect(() => {
    if (admissionData) {
      setFormData((prev) => ({
        ...prev,
        name: admissionData.name || "",
        fatherName: admissionData.fatherName || "",
        email: admissionData.email || "",
        phone: admissionData.phone || "",
        // Agar student ne admission mein 1st choice di ho to wo set kar dain
        department: admissionData.departments?.[0] || "" 
      }));
    }
  }, [admissionData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const URL = `${API}/api/admin/addStudent`;
      const res = await axios.post(URL, formData);
      alert(res.data.message || "Student Registered Successfully!");
      
      // Reset logic ya success redirection yahan kar sakte hain

      setFormData({
        name: "",
    fatherName: "",
    email: "",
    phone: "",
    studentID: "",
    department: "",
    batch: "",
    semester: "",
    password: "" // Default password
      })
    } catch (err) {
      alert(err.response?.data?.message || "Error registering student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h2>Final Student Registration</h2>
          <p>Review admission details and assign university credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formBody}>
          <h3 className={styles.sectionTitle}>Personal Information (From Admission)</h3>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} readOnly className={`${styles.inputField} bg-gray-100 cursor-not-allowed`} />
            </div>
            <div className={styles.inputGroup}>
              <label>Father's Name</label>
              <input type="text" name="fatherName" value={formData.fatherName} readOnly className={`${styles.inputField} bg-gray-100 cursor-not-allowed`} />
            </div>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} readOnly className={`${styles.inputField} bg-gray-100 cursor-not-allowed`} />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className={styles.inputField} />
            </div>
          </div>

          <h3 className={styles.sectionTitle}>University Academic Records</h3>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Student ID (New)</label>
              <input type="text" name="studentID" value={formData.studentID} onChange={handleChange} required className={styles.inputField} placeholder="e.g. CSC-26-001" />
            </div>
            <div className={styles.inputGroup}>
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange} required className={styles.inputField}>
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="BBA">BBA</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Batch</label>
              <input type="text" name="batch" value={formData.batch} onChange={handleChange} required className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
              <label>Semester</label>
              <select name="semester" value={formData.semester} onChange={handleChange} required className={styles.inputField}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>{s}st Semester</option>)}
              </select>
            </div>
          </div>

          <div className={styles.submitArea}>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? "Registering..." : "Finalize Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;