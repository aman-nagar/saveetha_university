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
  const selectedIdProof = watch("id_proof_type");
  const isEmployed = watch("employed");

  return (
    <FormSection title="Personal Details">
      <FormInput
        label="Candidate Name"
        name="candidate_name"
        register={register}
        // required="Candidate name is required"
        error={errors.candidate_name}
      />

      <FormInput label="Father's Name" name="father_name" register={register} />

      <FormInput label="Mother's Name" name="mother_name" register={register} />

      <FormInput
        label="Date of Birth"
        name="dob"
        type="date"
        register={register}
        // required="Date of birth is required"
        error={errors.dob}
      />

      <FormFileInput
        label="Photo"
        name="photo"
        register={register}
        existingUrl={existingUrls.photo_url || null}
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

      <FormSelect
        label="ID Proof Type"
        name="id_proof_type"
        register={register}
        options={[
          { label: "Aadhar Card", value: "aadhar_card" },
          { label: "Pan Card", value: "pan_card" },
          { label: "Voter ID Card", value: "voter_id_card" },
          { label: "Passport", value: "passport" },
          { label: "Other", value: "other" },
        ]}
        error={errors.id_proof_type}
      />

      {/* Show ID Proof Number only if selected */}
      {selectedIdProof && (
        <FormInput
          label="ID Proof Number"
          name="id_proof_no"
          register={register}
          error={errors.id_proof_no}
        />
      )}

      {/* If Aadhar selected → show front + back upload */}
      {selectedIdProof === "aadhar_card" && (
        <>
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
        </>
      )}

      {/* For other ID types → single document upload */}
      {selectedIdProof && selectedIdProof !== "aadhar_card" && (
        <FormFileInput
          label="Upload ID Proof"
          name="id_proof_document"
          register={register}
          existingUrl={existingUrls.id_proof_document_url || null}
        />
      )}

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
