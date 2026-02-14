import React, { useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import HeroSlider from "../components/imageSlider";
import ResponsiveAppBar from "../components/navbar";
import PersonIcon from "@mui/icons-material/Person";

const Home = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate");
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("show");
      }, i * 200);
    });
  }, []);

  const newsList = [
    {
      id: 1,
      day: "19",
      month: "December",
      year: "2024",
      title: "MDU University Achieves Remarkable Position in UI GreenMetric 2024 Ranking",
      img: "/images/homePageImg1.jpg",
    },
    {
      id: 2,
      day: "10",
      month: "December",
      year: "2024",
      title: "MDU’s Academic Council meeting held",
      img: "/images/homePageImg2.jpg",
    }
  ];

  return (
    <div className="home">
      {/* 🔹 Section 1 – Slider */}
      <ResponsiveAppBar />

      <section className="slider-section animate">
        <HeroSlider />
      </section>

      {/* 🔹 Section 2 – About */}
      <section className="about-section animate">
        <div className="about-text">
          <h2>
            Welcome to National Vision University of Science and Technology
          </h2>
          <p>
            National Vision University is a leading institution dedicated to
            excellence in education, research, and innovation. We empower
            students with practical knowledge, critical thinking skills, and
            leadership values to succeed in a rapidly changing global world.
          </p>
          <button>Explore More</button>
        </div>

        <div className="about-logo">
          <img src="/images/uniLogo.jpg" alt="University Logo" />
        </div>
      </section>

      {/* 🔹 Section 3 – Departments */}
      <div className="section3">
        <h1>OUR DEPARTMENTS</h1>
        <h1>____</h1>
        <section className="departments-section animate">
          {[
            "Computer Science",
            "Software Engineering",
            "Artificial Intelligence",
            "Data Science",
            "Cyber Security",
            "Business Administration",
            "Economics",
            "Psychology",
            "Education",
            "Physics",
          ].map((dept, i) => (
            <div className="dept-box" key={i}>
              <img src={`/images/depart${i + 1}.jpeg`} />
              <Link
                to={`/department/${dept.toLowerCase().replaceAll(" ", "-")}`}
              >
                {dept}
              </Link>
            </div>
          ))}
        </section>
      </div>


      <div className="section-container">
      <h1 className="heading">Latest News</h1>
      <div className="underline"></div>

      <div className="box-container">
        {newsList.map((news) => (
          <div key={news.id} className="news-card">
            
            {/* Top Image */}
            <div className="image-div">
              <img src={news.img} alt="University News" />
            </div>

            {/* Bottom Info Section */}
            <div className="content-wrapper">
              <div className="date-box">
                <span className="date-text">{news.day}</span>
                <span className="month-text">{news.month}</span>
                <span className="year-text">{news.year}</span>
              </div>

              <div className="text-container">
                <a href="#" className="title-link">
                  {news.title}
                </a>
                <div className="author-info">
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
