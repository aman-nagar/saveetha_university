// src/pages/admin/students/AddStudent.jsx
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../../api/students/studentApi";
import StudentFormStepper from "../../../components/admin/students/admission/StudentFormStepper";
import { useAuth } from "../../../context/AuthContext";

export default function AddStudent() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (formData) => {
    const res = await createStudent(formData, true);
    let redirectPath = "/admin/students"; // default fallback

    if (user?.role === "center") {
      redirectPath = "/center/students";
    } else if (user?.role === "sub-center") {
      redirectPath = "/sub-center/students";
    }

    // Navigate after a brief moment so the success toast in the stepper is visible
    setTimeout(() => navigate(redirectPath), 1500);

    return res;
  };

  return (
    <StudentFormStepper
      mode="create"
      onSubmit={handleSubmit}
      submitLabel="Submit Admission"
    />
  );
}
