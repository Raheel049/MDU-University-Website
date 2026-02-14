import React, { useState } from "react";
import VerifyAdmission from "./verifyAdmission";
import RegisterStudent from "./registerStudent";

const RegisterManager = () => {
  const [admissionData, setAdmissionData] = useState(null);

  return (
    <div className="w-full">
      {!admissionData ? (
        <VerifyAdmission onVerified={(data) => setAdmissionData(data)} />
      ) : (
        <RegisterStudent admissionData={admissionData} />
      )}
    </div>
  );
};

export default RegisterManager;