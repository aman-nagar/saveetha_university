// src/pages/admin/students/AddStudent.jsx
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../../api/students/studentApi";
import StudentFormStepper from "../../../components/admin/students/admission/StudentFormStepper";

export default function AddStudent() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const res = await createStudent(formData, true);
    // Navigate after a brief moment so the success toast in the stepper is visible
    setTimeout(() => navigate("/admin/students"), 1500);
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
