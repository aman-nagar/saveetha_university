import { useState } from "react";
import { useForm } from "react-hook-form";
import StepPersonal from "../../../components/admin/students/admission/steps/StepPersonal";
import StepCommunication from "../../../components/admin/students/admission/steps/StepCommunication";
import StepQualification from "../../../components/admin/students/admission/steps/StepQualification";
import StepProgram from "../../../components/admin/students/admission/steps/StepProgram";
import AdmissionStepper from "../../../components/admin/students/admission/AdmissionStepper";
import { createStudent } from "../../../api/students/studentApi";
import { useToast } from "../../../hooks/useToast";

export default function AddStudent() {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  const stepFields = {
    1: ["candidate_name", "dob", "gender"],
    2: ["email"],
    3: [],
    4: [],
  };
  const next = async () => {
    const fields = stepFields[step] || [];

    const valid = await trigger(fields);

    if (!valid) {
      show("error", "Please fill all required fields");

      // Find first invalid field manually
      const firstInvalidField = fields.find((field) => errors[field]);

      if (firstInvalidField) {
        const element = document.querySelector(`[name="${firstInvalidField}"]`);
        element?.focus();
        element?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    setStep((s) => Math.min(s + 1, 4));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        candidate_name: data.candidate_name,
        email: data.email,
        dob: data.dob,
        ...data,
      };

      const response = await createStudent(payload);

      show("success", `Student Created: ${response.enrollment_no}`);

      reset();
      setStep(1);
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl">
      <AdmissionStepper step={step} />

      <form>
        {step === 1 && <StepPersonal register={register} errors={errors} />}
        {step === 2 && (
          <StepCommunication register={register} errors={errors} />
        )}
        {step === 3 && (
          <StepQualification register={register} errors={errors} />
        )}
        {step === 4 && <StepProgram register={register} errors={errors} />}

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prev}
              disabled={loading}
              className="px-4 py-2 mt-5 border border-border rounded-md text-text disabled:opacity-50"
            >
              Back
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              disabled={loading}
              className="ml-auto bg-primary text-white px-6 py-2 mt-5 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="ml-auto bg-accent text-primary px-6 py-2 mt-5 rounded-md font-semibold disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Admission"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
