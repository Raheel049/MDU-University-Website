import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaFileInvoice,
  FaGraduationCap,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import axiosInstance from "../../api/axoisInstance";
import AdminNavbar from "../../components/adminNavbar";
import TopAdminNavbar from "../../components/AdminComponent/topAdminNavbar";

const AdminDashboard = () => {
  // States
  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

  // API Fetch Functions
  const fetchteacherCount = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/teacher-count");
      if (response.data.status) setTeacherCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/get-course-count");
      if (response.data.status) setCourseCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/get-student-stats");
      if (response.data.success) setStudentCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/get-students-data");
      if (response.data.status) setStudents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchStats();
    fetchCourses();
    fetchteacherCount();
  }, []);

  // Navigation Handlers (Side Effect: Close sidebar on mobile)

  const stats = [
    {
      title: "Registered Students",
      count: studentCount,
      icon: <FaGraduationCap />,
      color: "#dcfce7",
      textColor: "#15803d",
    },
    {
      title: "Available Courses",
      count: courseCount,
      icon: <FaBookOpen />,
      color: "#e0f2fe",
      textColor: "#0369a1",
    },
    {
      title: "Total Teachers",
      count: teacherCount,
      icon: <FaChalkboardTeacher />,
      color: "#ffedd5",
      textColor: "#c2410c",
    },
    {
      title: "Pending Enrollments",
      count: "15",
      icon: <FaFileInvoice />,
      color: "#fee2e2",
      textColor: "#b91c1c",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <AdminNavbar/>

      {/* 3. MAIN CONTENT */}
      <main className={styles.mainContent}>
        <TopAdminNavbar pageTitle={"Admin Dashboard"} />

        {/* STATS GRID */}
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statCard}>
              <div
                className={styles.iconBox}
                style={{ backgroundColor: s.color, color: s.textColor }}
              >
                {s.icon}
              </div>
              <div>
                <p className={styles.statTitle}>{s.title}</p>
                <h3 className={styles.statCount}>{s.count}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* TABLE SECTION */}
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Recent Student Registrations</h3>
          <div className={styles.tableResponsive}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.studentID}</td>
                      <td>{student.name}</td>
                      <td>{student.department}</td>
                      <td>
                        <span className={styles.statusBadge}>Active</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
