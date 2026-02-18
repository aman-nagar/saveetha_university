import FormInput from "../../../form/FormInput";
import FormTextarea from "../../../form/FormTextarea";
import FormSection from "../../../form/FormSection";

export default function StepCommunication({ register }) {
  return (
    <FormSection title="Communication Details">
      <FormInput label="Email" name="email" register={register} required />

      <FormInput label="Phone" name="phone" register={register} required />

      <FormTextarea
        label="Address"
        name="address"
        register={register}
        required
      />
    </FormSection>
  );
}
