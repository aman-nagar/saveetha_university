// src/components/admin/students/admission/steps/StepPersonal.jsx
import FormInput from "../../../../form/FormInput";
import FormSelect from "../../../../form/FormSelect";
import FormSection from "../../../../form/FormSection";
import FormFileInput from "../../../../form/FormFileInput";

export default function StepPersonal({ register, errors }) {
  return (
    <FormSection title="Personal Details">
      <FormInput
        label="Candidate Name"
        name="candidate_name"
        register={register}
        required="Candidate name is required"
        error={errors.candidate_name}
      />

      <FormInput label="Father's Name" name="father_name" register={register} />

      <FormInput label="Mother's Name" name="mother_name" register={register} />

      <FormInput
        label="Date of Birth"
        name="dob"
        type="date"
        register={register}
        required="Date of birth is required"
        error={errors.dob}
      />
      <FormFileInput label="photo" name="photo" register={register} />

      <FormSelect
        label="Gender"
        name="gender"
        register={register}
        required="Gender is required"
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
        error={errors.gender}
      />
    </FormSection>
  );
}
