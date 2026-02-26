import React, { useState } from "react";
import styles from "./addExamQuestion.module.css";
import axiosInstance from "../../api/axoisInstance";
import AdminNavbar from "../../components/adminNavbar";

const AddExamQuestion = () => {
  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""], // 4 khali options
    correctAns: "",
    marks: 1,
  });

  const [loading,setLoading] = useState(false);

  // Options update karne ka function
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
    const response = await axiosInstance.post("/api/admin/add-question",formData);

      if(response.data.status){
        console.log(response);
      }
    } catch (error) {
      alert(error.message);
    }
    finally{
      setLoading(false);
    }
    
    setFormData({...formData, 
      questionText: "",
      options: ["", "", "", ""], // 4 khali options
      correctAns: "",
      marks: 1,})

  };

  return (
    <div className={styles.mainContainer}>
      <AdminNavbar />

      <div className={styles.container}>
      <h2>Add New Exam Question</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Question Text</label>
        <textarea
          name=""
          id=""
          placeholder="Enter your Question"
          value={formData.questionText}
          onChange={(e) => {
            setFormData({ ...formData, questionText: e.target.value });
          }}
        />

        <label>Answer Options</label>
        <div className={styles.optionsGrid}>
          {formData.options.map((opt, index) => (
            <input
              key={index}
              type= "text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>

        <label>Select Correct Answer</label>
        <select
          value={formData.correctAns}
          onChange={(e) =>
            setFormData({ ...formData, correctAns: e.target.value })
          }
          required
        >
          <option value="">-- Choose which one is correct --</option>
          {/* Ye raha magic! Jo oper likha wahi yahan dikhega */}
          {formData.options.map(
            (opt, index) =>
              opt && (
                <option key={index} value={opt}>
                  {opt}
                </option>
              )
          )}
        </select>

        <button type="submit" className={styles.saveBtn} disabled={loading}>
          {loading ? "Adding Ques..." : "Save Ques"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddExamQuestion;
