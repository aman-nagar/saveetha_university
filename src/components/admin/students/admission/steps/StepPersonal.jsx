// src/components/admin/students/admission/steps/StepPersonal.jsx
import FormInput from "../../../../form/FormInput";
import FormSelect from "../../../../form/FormSelect";
import FormSection from "../../../../form/FormSection";
import FormFileInput from "../../../../form/FormFileInput";

export default function StepPersonal({
  register,
  errors,
  watch,
  existingUrls = {},
}) {
  const isEmployed = watch("employed");

  return (
    <FormSection title="Personal Details" columns={2}>
      {/* Full-width: Candidate Name */}
      <div className="sm:col-span-2">
        <FormInput
          label="Candidate Name"
          name="candidate_name"
          register={register}
          required="Candidate name is required"
          error={errors.candidate_name}
        />
      </div>

      <FormInput label="Father's Name" name="father_name" register={register} />

      <FormInput label="Mother's Name" name="mother_name" register={register} />

      <FormInput
        label="Date of Birth"
        name="dob"
        type="date"
        register={register}
        error={errors.dob}
      />

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

      <FormSelect
        label="Category"
        name="category"
        register={register}
        options={[
          { label: "General", value: "general" },
          { label: "OBC", value: "obc" },
          { label: "SC", value: "sc" },
          { label: "ST", value: "st" },
          { label: "BC", value: "bc" },
          { label: "SBC", value: "sbc" },
          { label: "EBC", value: "ebc" },
          { label: "PH", value: "ph" },
          { label: "EX-Servicemen", value: "ex-servicemen" },
          { label: "Other", value: "other" },
        ]}
        error={errors.category}
      />

      {/* Hidden field: Aadhar Card is always the default ID proof type */}
      <input type="hidden" {...register("id_proof_type")} value="aadhar_card" />

      <FormInput
        label="ID Proof Number"
        name="id_proof_no"
        register={register}
        error={errors.id_proof_no}
      />

      {/* Photo — always shown */}
      <FormFileInput
        label="Photo"
        name="photo"
        register={register}
        existingUrl={existingUrls.photo_url || null}
      />

      {/* Aadhar Card: Always show front + back upload */}
      <FormFileInput
        label="Aadhar Card Front"
        name="id_proof_front"
        register={register}
        existingUrl={existingUrls.id_proof_front_url || null}
      />

      <FormFileInput
        label="Aadhar Card Back"
        name="id_proof_back"
        register={register}
        existingUrl={existingUrls.id_proof_back_url || null}
      />

      <FormSelect
        label="Are you employed?"
        name="employed"
        register={register}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        error={errors.employed}
      />

      {/* If employed → show extra fields */}
      {isEmployed === "yes" && (
        <>
          <FormInput
            label="Employer Name"
            name="employer_name"
            register={register}
          />

          <FormInput
            label="Designation"
            name="designation"
            register={register}
          />
        </>
      )}
    </FormSection>
  );
}
