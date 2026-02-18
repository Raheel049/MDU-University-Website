import React, { useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBookOpen,
  FaFileInvoice,
  FaGraduationCap,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { useState } from "react";
import axiosInstance from "../../api/axoisInstance";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

  const fetchteacherCount = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/teacherCount")
      if(response.data.status){
        setTeacherCount(response.data.count);
      }
    } catch (error) {
      alert("error",error.message)
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/getCourseCount");
      if(response.data.status){
        setCourseCount(response.data.count)

      }
    } catch (error) {
      alert("error", error.message)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/getStudentStats");
      if (response.data.success) {
        setStudentCount(response.data.count);
      }
    } catch (error) {
      alert("error", error.message);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/getStudentsData");
      if (response.data.status) {
        setStudents(response.data.data);
      }
    } catch (error) {
      alert("error", error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchStats();
    fetchCourses();
    fetchteacherCount();
  }, []);



  const handleRegisterNavigation = () => {
    navigate("/registerManager");
  };

  const handleCourseNavigation = () => {
    navigate("/addCourse");
  }

  const handleTeacherNavigation = () => {
    navigate("/addTeacher");
  }

  const handleAllStuNavigation = () => {
    navigate("/fetchAllStudents");
  }

  const handleAllCourseNavigaton = () => {
    navigate("/fetchAllCourses");
  }
 
  const stats = [
    {
      title: "Registered Students",
      count: `${studentCount}`,
      icon: <FaGraduationCap />,
      color: "#dcfce7",
      textColor: "#15803d",
    },
    {
      title: "Available Courses",
      count: `${courseCount}`,
      icon: <FaBookOpen />,
      color: "#e0f2fe",
      textColor: "#0369a1",
    },
    {
      title: "Total Teachers",
      count: `${teacherCount}`,
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
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.logoSection}>
          <FaGraduationCap size={30} />
          <h2 style={{ fontSize: "18px", fontWeight: "800" }}>
            UNIVERSITY CMS
          </h2>
        </div>

        <button className={styles.sidebarBtn}>
          <FaUserGraduate /> Dashboard
        </button>
        <button
          className={styles.sidebarBtnSecondary}
          onClick={handleRegisterNavigation}
        >
          <FaUserPlus /> Register Student
        </button>
        <button className={styles.sidebarBtnSecondary}
          onClick={handleCourseNavigation}
        >
          <FaBookOpen /> Add new Courses
        </button>
        <button className={styles.sidebarBtnSecondary}
          onClick={handleTeacherNavigation}
        >
          <FaChalkboardTeacher /> Register Teacher
        </button>
        <button className={styles.sidebarBtnSecondary}>
          <FaFileInvoice /> Reports
        </button>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button
            className={styles.sidebarBtnSecondary}
            style={{ background: "#0d9488" }}
            onClick={handleAllStuNavigation}
          >
            All Students
          </button>
          <button
            className={styles.sidebarBtnSecondary}
            style={{ background: "#0d9488" }}
            onClick={handleAllCourseNavigaton}
          >
            All Courses
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b" }}>
            Admin Dashboard
          </h1>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <FaSearch color="#64748b" />
            <FaBell color="#64748b" />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontWeight: "600" }}>Admin</span>
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  background: "#e2e8f0",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          </div>
        </header>

        {/* STATS */}
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
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                  {s.title}
                </p>
                <h3 style={{ fontSize: "24px", margin: 0 }}>{s.count}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className={styles.tableContainer}>
          <h3 style={{ margin: 0, fontSize: "18px" }}>
            Recent Student Registrations
          </h3>
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
                    <td>{student.semester}</td>
                    <td>
                      <span
                        className={styles.statusBadge}
                        style={{ background: "#dcfce7", color: "#15803d" }}
                      >
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No students registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
