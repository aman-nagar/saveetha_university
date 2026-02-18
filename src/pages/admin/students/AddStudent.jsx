import { useState } from "react";
import { useForm } from "react-hook-form";
import AdmissionStepper from "../../../components/admin/admission/AdmissionStepper";
import StepPersonal from "../../../components/admin/admission/steps/StepPersonal";
import StepCommunication from "../../../components/admin/admission/steps/StepCommunication";
import StepQualification from "../../../components/admin/admission/steps/StepQualification";
import StepProgram from "../../../components/admin/admission/steps/StepProgram";

export default function AddStudent() {
  const { register, handleSubmit } = useForm();
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    console.log("Final Admission Data:", data);
  };

  return (
    <div className="w-full max-w-7xl">
      <h1 className="text-xl font-heading font-bold text-primary mb-6">
        New Admission
      </h1>

      <AdmissionStepper step={step} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              type="submit"
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
