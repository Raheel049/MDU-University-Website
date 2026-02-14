import React, { useState } from "react";
import axios from "axios";
import styles from "./verifyAdmission.module.css";


const VerifyAdmission = ({ onVerified }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const handleVerify = async () => {
    if (!email) return alert("Email email address!");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/admin/verifyAdmission`, { email });
      
      // Check karein ke status waqai true hai
      if (res.data.status === true) { 
        alert("Student Found Successfully!");
        
        // Sab se zaruri: Pehle check karein ke prop exist karta hai
        if (onVerified) {
          onVerified(res.data.data); 
        } else {
          console.error("onVerified prop is missing in RegisterManager");
        }
      } else {
        alert(res.data.message || "Student record not found");
      }
    } catch (err) {
      // Agar masla backend ka hai to hi ye alert aana chahiye
      console.error("API Error:", err);
      alert(err.response?.data?.message || "Server connection error!"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.verifyContainer}>
      <div className={styles.verifyBox}>
        <h2 className="text-xl font-bold mb-4">Student Verification</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter email address for fetch admission record from Database 
        </p>
        
        <input 
          type="email" 
          placeholder="Admission Email Likhein (e.g. raheel@example.com)" 
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleVerify()} // Enter dabane par bhi kaam karega
        />

        <button 
          onClick={handleVerify} 
          disabled={loading} 
          className={styles.btn}
        >
          {loading ? "Data Fetchching..." : "Verify & Fetch Data"}
        </button>
      </div>
    </div>
  );
};

export default VerifyAdmission;