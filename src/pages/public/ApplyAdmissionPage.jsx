// src/pages/public/ApplyAdmissionPage.jsx
import PublicStudentStepper from "../../components/public/admission/PublicStudentStepper";
import { SEOHelmet } from "@/components/SEO/SEOHelmet";

export default function ApplyAdmissionPage() {
  return (
    <>
      <SEOHelmet page="admission" />
      <div className="min-h-screen bg-bg">
        {/* Header Section */}
        <div className="relative p-5 ">
          <div className="w-full mx-auto text-center">
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
        <div className="relative ">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/8 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl">
              <PublicStudentStepper />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
