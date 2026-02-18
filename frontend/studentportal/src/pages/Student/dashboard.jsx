import React, { useState } from 'react';
import styles from './dashboard.module.css';
import { 
  FaThLarge, FaFileAlt, FaBook, FaPoll, FaUser, 
  FaSignOutAlt, FaSearch, FaBell, FaGraduationCap, 
  FaCheckCircle, FaClock, FaCalendarAlt, FaBars, FaTimes 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false); // Mobile pe click ke baad sidebar band ho jaye
  };

  return (
    <div className={styles.container}>
      
      {/* OVERLAY: Sirf mobile pe dikhega jab sidebar khula ho */}
      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarActive : ''}`}>
        <div className={styles.logoSection}>
          <div className={styles.logoInfo}>
            <FaGraduationCap size={35} />
            <h2>University CMS</h2>
          </div>
          {/* Close Icon for Mobile */}
          <div className={styles.closeBtn} onClick={toggleSidebar}>
            <FaTimes size={24} />
          </div>
        </div>

        <nav className={styles.nav}>
          <button className={`${styles.navButton} ${styles.navButtonActive}`}>
            <FaThLarge /> Dashboard
          </button>
          <button className={styles.navButton} onClick={() => handleNavigation("/admission")}>
            <FaFileAlt /> Admission Form
          </button>
          <button className={styles.navButton}><FaBook /> My Courses</button>
          <button className={styles.navButton}><FaPoll /> Results</button>
          <button className={styles.navButton}><FaUser /> Profile</button>
        </nav>

        <button className={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Hamburger Menu for Mobile */}
            <div className={styles.menuToggle} onClick={toggleSidebar}>
              <FaBars size={24} />
            </div>
            <h1 className={styles.welcomeText}>Welcome, Ali!</h1>
          </div>

          <div className={styles.headerActions}>
            <FaSearch color="#94a3b8" cursor="pointer" />
            <FaBell color="#94a3b8" cursor="pointer" />
            <div className={styles.profileInfo}>
              <div style={{textAlign: 'right'}}>
                <p style={{fontSize: '14px', fontWeight: 'bold', color: '#334155'}}>Ali Ahmed</p>
                <span style={{fontSize: '11px', color: '#94a3b8', fontWeight: 'bold'}}>STUDENT</span>
              </div>
              {/* <img src="https://via.placeholder.com/40" alt="avatar" className={styles.avatar} /> */}
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {/* PROGRESS TRACKER */}
          <div className={styles.card}>
            <h2 style={{fontSize: '20px', fontWeight: 'bold', textAlign: "center", marginBottom: '15px'}}>Progress Tracker</h2>
            <div className={styles.trackerContainer}>
              <div className={styles.line}></div>
              <div className={styles.activeLine}></div>
              <div className={styles.step}>
                <div className={`${styles.iconCircle} ${styles.completed}`}><FaCheckCircle size={24} /></div>
                <span className={styles.stepText}>Form Submitted</span>
              </div>
              <div className={styles.step}>
                <div className={`${styles.iconCircle} ${styles.pending}`}><FaClock size={24} /></div>
                <span className={styles.stepText}>Test Pending</span>
              </div>
              <div className={styles.step}>
                <div className={styles.iconCircle}><FaCalendarAlt size={24} color="#94a3b8" /></div>
                <span className={styles.stepText}>Interview</span>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {/* ENTRANCE TEST */}
            <div className={styles.testCard}>
              <div className={styles.testIcon}><FaGraduationCap size={48} /></div>
              <h2 style={{fontSize: '28px', fontWeight: '800', marginBottom: '10px'}}>Start Your Entrance Test</h2>
              <p style={{color: '#94a3b8', marginBottom: '32px'}}>50 Questions | 60 Minutes</p>
              <button className={styles.startBtn}>START TEST NOW</button>
            </div>

            {/* DEADLINES */}
            <div className={styles.deadlinesCard}>
              <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '24px'}}>Upcoming Deadlines</h3>
              <ul className={styles.deadlineList}>
                <li className={styles.deadlineItem}>
                  <div className={styles.dot}></div>
                  <div>
                    <p style={{fontSize: '14px', fontWeight: 'bold'}}>Apply for Scholarships</p>
                    <span style={{fontSize: '11px', color: '#94a3b8', fontWeight: 'bold'}}>DEC 31</span>
                  </div>
                </li>
                <li className={styles.deadlineItem}>
                  <div className={styles.dot}></div>
                  <div>
                    <p style={{fontSize: '14px', fontWeight: 'bold'}}>Course Registration</p>
                    <span style={{fontSize: '11px', color: '#94a3b8', fontWeight: 'bold'}}>JAN 15</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;