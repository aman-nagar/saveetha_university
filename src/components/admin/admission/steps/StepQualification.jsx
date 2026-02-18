import FormInput from "../../../form/FormInput";
import FormSection from "../../../form/FormSection";

export default function StepQualification({ register }) {
  return (
    <FormSection title="Previous Qualification">
      <FormInput
        label="Last Qualification"
        name="qualification"
        register={register}
        required
      />

      <FormInput
        label="Institute Name"
        name="institute"
        register={register}
        required
      />

      <FormInput
        label="Percentage"
        name="percentage"
        register={register}
        required
      />
    </FormSection>
  );
}
