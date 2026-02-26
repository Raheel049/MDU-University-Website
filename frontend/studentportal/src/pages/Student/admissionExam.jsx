import React, { useEffect, useState } from "react";
import styles from "./admissionExam.module.css";
import axiosInstance from "../../api/axoisInstance";

const AdmissionExam = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Student choices store karne ke liye
  const [loading, setLoading] = useState(true);



  // 1. Sawal Load karna
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get("/api/student/exam-questions");
        setQuestions(response.data.data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // 2. Answer Select karna
  const handleSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
   
  };


  // 3. Test Submit karna
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/student/submit-exam", {
        answers : answers,
      });

      if (response.data.status) {
      
        alert(`Wait for shortlist. Your result is ${response.data.data.percentage} `);
        
      }
    } catch (error) {
      alert("Not Submit successFully: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Entrance Exam</h1>
      
      {questions.map((q, index) => (
        <div key={q._id} className={styles.questionCard}>
          <h3>Q{index + 1}: {q.questionText}</h3>
          <div className={styles.options}>
            {q.options.map((opt, i) => (
              <label key={i} className={styles.optionLabel}>
                <input 
                  type="radio" 
                  name={q._id} 
                  onChange={() => handleSelect(q._id, opt)} 
                />
                {opt}
              </label>
            ))}

            
          </div>
        </div>
      ))}
      
      <button className={styles.submitBtn} onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default AdmissionExam;