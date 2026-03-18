/**
 * src/pages/public/ApplyAdmissionPage.jsx
 * PUBLIC STUDENT ADMISSION PAGE
 *
 * Reuses StudentFormStepper component with public APIs
 * No authentication required - public form submission
 */

import { useToast } from "../../context/ToastContext";
import Toast from "../../components/ui/Toast";
import StudentFormStepper from "../../components/admin/students/admission/StudentFormStepper";
import { submitPublicAdmission } from "../../api/public/publicAdmissionApi";

export default function ApplyAdmissionPage() {
  const { toast, show, clear } = useToast();

  const handleSubmitAdmission = async (formData) => {
    try {
      // Submit to public admission API
      const response = await submitPublicAdmission(formData);

      // Show success message with reference ID
      show({
        message: `✅ Application submitted successfully! Reference ID: ${response.reference_id}`,
        type: "success",
        duration: 3000,
      });
    } catch (err) {
      console.error("Error submitting admission application:", err);
      show({
        message:
          err.message || "Failed to submit application. Please try again.",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header Section */}
      <div className="relative pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            Student Admission Form
          </h1>
          <p className="text-base sm:text-lg text-text/70">
            Complete all sections to apply for admission. Your information is
            secure and confidential.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Glass morphism container */}
          <div className="bg-white/8 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl">
            <StudentFormStepper
              mode="create"
              onSubmit={handleSubmitAdmission}
              submitLabel="Submit Application"
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && <Toast {...toast} onClose={clear} />}
    </div>
  );
}
