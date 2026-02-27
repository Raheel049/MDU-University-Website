import React, { useEffect } from "react";
import styles from "./Home.module.css"; // 👈 Module Import
import { Link } from "react-router-dom";
import HeroSlider from "../components/imageSlider";
import ResponsiveAppBar from "../components/navbar";
import PersonIcon from "@mui/icons-material/Person";

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show); // 👈 Style from Module
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.animate}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const newsList = [
    {
      id: 1,
      day: "19", month: "December", year: "2024",
      title: "MDU University Achieves Remarkable Position in UI GreenMetric 2024",
      img: "/images/homePageImg1.jpg",
    },
    {
      id: 2,
      day: "10", month: "December", year: "2024",
      title: "MDU’s Academic Council meeting held",
      img: "/images/homePageImg2.jpg",
    }
  ];

  return (
    <div className={styles.homeWrapper}>
      <ResponsiveAppBar />

      <section className={`${styles.sliderSection} ${styles.animate}`}>
        <HeroSlider />
      </section>

      <section className={`${styles.aboutSection} ${styles.animate}`}>
        <div className={styles.aboutText}>
          <h2>Welcome to National Vision University</h2>
          <p>Excellence in education, research, and innovation.</p>
          <button>Explore More</button>
        </div>
        <div className={styles.aboutLogo}>
          <img src="/images/uniLogo.jpg" alt="Logo" />
        </div>
      </section>

      <div className={styles.section3}>
        <h1>OUR DEPARTMENTS</h1>
        <section className={`${styles.departmentsSection} ${styles.animate}`}>
          {["Computer Science", "Software Engineering", "Data Science", "Data Science",
            "Cyber Security",
            "Business Administration",
            "Economics",
            "Psychology",
            "Education",
            "Physics",].map((dept, i) => (
            <div className={styles.deptBox} key={i}>
              <img src={`/images/depart${i + 1}.jpeg`} alt={dept} />
              <Link to={`/department/${dept.toLowerCase().replace(/\s+/g, '-')}`}>{dept}</Link>
            </div>
          ))}
        </section>
      </div>

      <div className={`${styles.sectionContainer} ${styles.animate}`}>
        <h1 className={styles.heading}>Latest News</h1>
        <div className={styles.underline}></div>

        <div className={styles.boxContainer}>
          {newsList.map((news) => (
            <div key={news.id} className={styles.newsCard}>
              <div className={styles.imageDiv}>
                <img src={news.img} alt="News" />
              </div>
              <div className={styles.contentWrapper}>
                <div className={styles.dateBox}>
                  <span className={styles.dateText}>{news.day}</span>
                  <span className={styles.monthText}>{news.month}</span>
                </div>
                <div className={styles.textContainer}>
                  <a href="#" className={styles.titleLink}>{news.title}</a>
                  <div className={styles.authorInfo}>
                    <PersonIcon sx={{ fontSize: 16, mr: 1, color: "#b22222" }} />
                    <span>MDU</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;