import React, { useState } from "react";
import styles from "./addCourse.module.css"; // CSS module use karein
import axiosInstance from "../../api/axoisInstance.js";

const AddCourse = () => {
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    creditHours: "",
    department: "",
    semester: "",
    courseType: "", // State mein sirf selected value rakhen
    assignedTeacher: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/admin/addCourse", formData);
      if (response.data.status) {
        alert("Course Added Successfully!");
        setFormData({
          courseName: "", courseCode: "", creditHours: "",
          department: "", semester: "", courseType: "", assignedTeacher: ""
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Course add karne mein masla hua");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Add New Course</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            {/* Course Name */}
            <div className={styles.inputGroup}>
              <label>Course Name</label>
              <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required placeholder="e.g. Data Structures" />
            </div>

            {/* Course Code */}
            <div className={styles.inputGroup}>
              <label>Course Code</label>
              <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} required placeholder="e.g. CS-201" />
            </div>

            {/* Credit Hours */}
            <div className={styles.inputGroup}>
              <label>Credit Hours</label>
              <select name="creditHours" value={formData.creditHours} onChange={handleChange} required>
                <option value="">Select Credits</option>
                {[1, 2, 3, 4].map(h => <option key={h} value={h}>{h} Cr. Hr</option>)}
              </select>
            </div>

            {/* Course Type */}
            <div className={styles.inputGroup}>
              <label>Course Type</label>
              <select name="courseType" value={formData.courseType} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Core Subject">Core Subject</option>
                <option value="Elective">Elective</option>
                <option value="Lab">Lab</option>
              </select>
            </div>

            {/* Department */}
            <div className={styles.inputGroup}>
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Dept</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="BBA">BBA</option>
              </select>
            </div>

            {/* Semester */}
            <div className={styles.inputGroup}>
              <label>Semester</label>
              <select name="semester" value={formData.semester} onChange={handleChange} required>
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>{s}st Semester</option>)}
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
              <label>Teacher Name</label>
              <input type="text" name="assignedTeacher" value={formData.assignedTeacher} onChange={handleChange} required placeholder="e.g. Raheel" />
            </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;