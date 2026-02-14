import { useState, useEffect } from "react";
import styles from "./admission.module.css";
import axios from "axios";

const departmentsList = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Artificial Intelligence",
  "Data Science",
  "Cyber Security",
];

const AdmissionForm = () => {
  const API = import.meta.env.VITE_API_URL;

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    fatherName: "",
    address: "",
    city: "",
    province: "",
    matricTotal: "",
    matricObtained: "",
    matricPercentage: "",
    interTotal: "",
    interObtained: "",
    interPercentage: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // 🔹 Auto-fill email
  useEffect(() => {
    const stdEmail = localStorage.getItem("userEmail");
    if (stdEmail) {
      setFormData((prev) => ({ ...prev, email: stdEmail }));
    }
  }, []);

  // 🔹 Matric percentage
  useEffect(() => {
    const total = Number(formData.matricTotal);
    const obtained = Number(formData.matricObtained);

    if (total > 0 && obtained >= 0) {
      setFormData((prev) => ({
        ...prev,
        matricPercentage: ((obtained / total) * 100).toFixed(2),
      }));
    } else {
      setFormData((prev) => ({ ...prev, matricPercentage: "" }));
    }
  }, [formData.matricTotal, formData.matricObtained]);

  // 🔹 Inter percentage
  useEffect(() => {
    const total = Number(formData.interTotal);
    const obtained = Number(formData.interObtained);

    if (total > 0 && obtained >= 0) {
      setFormData((prev) => ({
        ...prev,
        interPercentage: ((obtained / total) * 100).toFixed(2),
      }));
    } else {
      setFormData((prev) => ({ ...prev, interPercentage: "" }));
    }
  }, [formData.interTotal, formData.interObtained]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        

      const finalData = {
        ...formData,
        departments: selectedDepartments,
      };

      const URL = `${API}/api/student/admissionForm`;
      const response = await axios.post(URL, finalData);

      alert(response.data.message);

      // ✅ RESET FORM (email keep)
      setFormData({
        ...initialFormState,
        email: formData.email,
      });

      setSelectedDepartments([]);
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🎓 Admission Form</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <div className={styles.grid}>
          <input name="name" value={formData.name} placeholder="Student Name" onChange={handleChange} />
          <input name="email" value={formData.email} placeholder="Email" readOnly />
          <input name="phone" value={formData.phone} placeholder="Phone Number" onChange={handleChange} />
          <input name="fatherName" value={formData.fatherName} placeholder="Father Name" onChange={handleChange} />
        </div>

        <h3 className={styles.sectionTitle}>Address</h3>
        <div className={styles.grid}>
          <input name="address" value={formData.address} placeholder="Full Address" onChange={handleChange} />
          <input name="city" value={formData.city} placeholder="City" onChange={handleChange} />
          <input name="province" value={formData.province} placeholder="Province" onChange={handleChange} />
        </div>

        <h3 className={styles.sectionTitle}>Matric / SSC Info</h3>
        <div className={styles.grid}>
          <input name="matricTotal" value={formData.matricTotal} placeholder="Total Marks" onChange={handleChange} />
          <input name="matricObtained" value={formData.matricObtained} placeholder="Obtained Marks" onChange={handleChange} />
          <input name="matricPercentage" value={formData.matricPercentage} placeholder="Percentage" readOnly />
        </div>

        <h3 className={styles.sectionTitle}>Intermediate / HSSC Info</h3>
        <div className={styles.grid}>
          <input name="interTotal" value={formData.interTotal} placeholder="Total Marks" onChange={handleChange} />
          <input name="interObtained" value={formData.interObtained} placeholder="Obtained Marks" onChange={handleChange} />
          <input name="interPercentage" value={formData.interPercentage} placeholder="Percentage" readOnly />
        </div>

        <h3 className={styles.sectionTitle}>Select 3 Departments</h3>
        <select
          className={styles.dropdown}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            if (selectedDepartments.includes(value)) return alert("Already selected");
            if (selectedDepartments.length >= 3) return alert("Only 3 allowed");
            setSelectedDepartments([...selectedDepartments, value]);
          }}
        >
          <option value="">-- Select Department --</option>
          {departmentsList.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <div className={styles.selectedList}>
          {selectedDepartments.map((dept) => (
            <div key={dept} className={styles.selectedItem}>
              {dept}
              <span className={styles.remove} onClick={() =>
                setSelectedDepartments(selectedDepartments.filter((d) => d !== dept))
              }>✖</span>
            </div>
          ))}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit Admission Form
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
