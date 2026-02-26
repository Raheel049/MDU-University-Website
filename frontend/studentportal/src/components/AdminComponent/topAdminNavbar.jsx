import React from "react";
import styles from "./topAdminNavbar.module.css";
import { FaSearch, FaBell } from "react-icons/fa";

const TopAdminNavbar = ({pageTitle}) => {
  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        
        <h1>{pageTitle}</h1>
        <div className={styles.side}>
        <div className={styles.headerActions}>
          <FaSearch color="#64748b" cursor="pointer" />
          <FaBell color="#64748b" cursor="pointer" />
          </div>
          <div className={styles.adminProfile}>
            <span>Admin</span>
          </div>

            <div className={styles.avatar}></div>
        </div>
       
      </header>
    </div>
  );
};

export default TopAdminNavbar;
