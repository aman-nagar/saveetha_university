import FormInput from "../../../form/FormInput";
import FormSelect from "../../../form/FormSelect";
import FormSection from "../../../form/FormSection";
import FormFileInput from "../../../form/FormFileInput";

export default function StepPersonal({ register }) {
  return (
    <FormSection title="Personal Details">
      <FormInput
        label="Candidate Name"
        name="candidate_name"
        register={register}
        required
      />

      <FormInput
        label="Father's Name"
        name="father_name"
        register={register}
        required
      />

      <FormInput
        label="Mother's Name"
        name="mother_name"
        register={register}
        required
      />

      <FormInput
        label="Date of Birth"
        name="dob"
        type="date"
        register={register}
        required
      />
      <FormFileInput label="photo" name="photo" register={register} />

      <FormSelect
        label="Gender"
        name="gender"
        register={register}
        required
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
    </FormSection>
  );
}
