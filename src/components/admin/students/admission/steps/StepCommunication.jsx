import FormInput from "../../../../form/FormInput";
import FormSection from "../../../../form/FormSection";
import FormTextarea from "../../../../form/FormTextarea";

// src/components/admin/students/admission/steps/StepCommunication.jsx
export default function StepCommunication({ register }) {
  return (
    <FormSection title="Communication Details">
      <FormInput
        label="Contact Number"
        name="contact_number"
        register={register}
      />

      <FormInput label="Email" name="email" register={register} required />

      <FormInput
        label="Father's Contact"
        name="father_contact_number"
        register={register}
      />

      <FormInput
        label="Mother's Contact"
        name="mother_contact_number"
        register={register}
      />

      <FormTextarea label="Address" name="address" register={register} />

      <FormInput label="Pincode" name="pincode" register={register} />
    </FormSection>
  );
}
