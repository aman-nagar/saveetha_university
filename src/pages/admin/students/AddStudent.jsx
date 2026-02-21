import { useState } from "react";
import { useForm } from "react-hook-form";
// import AdmissionStepper from "../../../components//students/admission/AdmissionStepper";
import StepPersonal from "../../../components/admin/students/admission/steps/StepPersonal";
import StepCommunication from "../../../components/admin/students/admission/steps/StepCommunication";
import StepQualification from "../../../components/admin/students/admission/steps/StepQualification";
import StepProgram from "../../../components/admin/students/admission/steps/StepProgram";
import AdmissionStepper from "../../../components/admin/students/admission/AdmissionStepper";
import { createStudent } from "../../../api/students/studentApi";
import { useToast } from "../../../hooks/useToast";

export default function AddStudent() {
  const { register, handleSubmit } = useForm();
  const [step, setStep] = useState(1);
  const { show } = useToast();

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    if (step !== 4) return; // prevent early submission

    try {
      const payload = {
        candidate_name: data.candidate_name,
        email: data.email,
        dob: data.dob,
        ...data,
      };

      const response = await createStudent(payload);

      show("success", `Student Created: ${response.enrollment_no}`);

      console.log("Created:", response);
    } catch (err) {
      show("error", err.message);
    }
  };

  return (
    <div className="w-full max-w-7xl">
      <AdmissionStepper step={step} />

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <StepPersonal register={register} />}
        {step === 2 && <StepCommunication register={register} />}
        {step === 3 && <StepQualification register={register} />}
        {step === 4 && <StepProgram register={register} />}

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prev}
              className="px-4 py-2 border border-border rounded-md text-text"
            >
              Back
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              className="ml-auto bg-primary text-white px-6 py-2 rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              type="button" // ← IMPORTANT CHANGE
              onClick={handleSubmit(onSubmit)} // manual trigger
              className="ml-auto bg-accent text-primary px-6 py-2 rounded-md font-semibold"
            >
              Submit Admission
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
