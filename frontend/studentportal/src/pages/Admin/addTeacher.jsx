import React, { useState } from "react";
import styles from "./addTeacher.module.css";
import axiosInstance from "../../api/axoisInstance";

const AddTeacher = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    designation: "",
    department: "",
    qualification: "",
    experience: "",
    joiningDate: "",
    salary: "",
    password: "Teacher123", // Default password
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/admin/addTeacher", formData);
      if (res.data.status) {
        alert("Teacher Registered Successfully!");
        // Reset form logic...
      }

      setFormData({
        name : "",
        email: "",
        phoneNumber: "",
        designation: "",
        department: "",
        qualification: "",
        experience: "",
        joiningDate: "",
        salary: "",
      })
    } catch (err) {
      alert(err.response?.data?.message || "Error adding teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <header className={styles.header}>
          <h2>Teacher Registration</h2>
          <p>Fill in the details to create a new faculty profile.</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* SECTION 1: Personal Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>1. Personal Details</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Dr. Ali Ahmed"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Official Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ali@university.edu"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="03XXXXXXXXX"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Academic & Professional */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>2. Academic & Professional</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Designation</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Rank</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Assistant Professor">
                    Assistant Professor
                  </option>
                  <option value="Associate Professor">
                    Associate Professor
                  </option>
                  <option value="Professor">Professor</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Dept</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="BBA">BBA</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Highest Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                  placeholder="PhD in AI / MSCS"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Administrative Details */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>3. Employment Details</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Monthly Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          <div className={styles.submitArea}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Registering..." : "Register Faculty Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
