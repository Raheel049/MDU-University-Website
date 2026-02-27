import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./adminNavbar.module.css";
import {
  FaUserPlus,
  FaUserGraduate,
  FaTimes,
  FaPlusCircle,
  FaBars,
  FaGraduationCap,
  FaBookOpen,
  FaChalkboardTeacher,
  FaSearch,
  FaBell,
} from "react-icons/fa";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Sidebar Toggle Function

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div>
      
      <div className={styles.menuTrigger} onClick={toggleSidebar}>
        <FaBars size={25} />
      </div>

     

      {/* 1. Overlay for Mobile */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

      {/* 2. SIDEBAR */}
      <div
        className={`${styles.sideBarWrapper} ${isOpen ? styles.showMenu : ""}`}
      >
        <aside className={styles.sidebar}>
          <div className={styles.logoSection}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FaGraduationCap size={30} />
              <h2 style={{ fontSize: "18px", margin : "auto 0"}}>
                UNIVERSITY CMS
              </h2>
            </div>
            <FaTimes className={styles.closeIcon} onClick={toggleSidebar} />
          </div>

          <button
            className={styles.sidebarBtn}
            style={{fontWeight : "500"}}
            onClick={() => navTo("/adminDashboard")}
          >
            <FaUserGraduate /> Dashboard
          </button>
          <button
            style={{fontWeight : "500"}}
            className={styles.sidebarBtnSecondary}
            onClick={() => navTo("/registerManager")}
          >
            <FaUserPlus /> Register Student
          </button>
          <button
            style={{fontWeight : "500"}}
            className={styles.sidebarBtnSecondary}
            onClick={() => navTo("/addCourse")}
          >
            <FaBookOpen /> Add new Courses
          </button>
          <button
            style={{fontWeight : "500"}}
            className={styles.sidebarBtnSecondary}
            onClick={() => navTo("/addTeacher")}
          >
            <FaChalkboardTeacher /> Register Teacher
          </button>
          <button
            style={{fontWeight : "500"}}
            className={styles.sidebarBtnSecondary}
            onClick={() => navTo("/addExamQuestion")}
          >
            <FaPlusCircle /> Add Exam Ques
          </button>

          <div className={styles.bottomNav}>
            <button
            style={{fontWeight : "500"}}

              className={styles.sidebarBtnSecondary}
              onClick={() => navTo("/fetchAllStudents")}
            >
              All Students
            </button>
            <button
            style={{fontWeight : "500"  }}

              className={styles.sidebarBtnSecondary}
              onClick={() => navTo("/fetchAllCourses")}
            >
              All Courses
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminNavbar;
