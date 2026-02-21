import FormInput from "../../../../form/FormInput";
import FormSection from "../../../../form/FormSection";
import FormTextarea from "../../../../form/FormTextarea";

// src/components/admin/students/admission/steps/StepCommunication.jsx
export default function StepCommunication({ register, errors }) {
  return (
    <FormSection title="Communication Details">
      <FormInput
        label="Contact Number"
        name="contact_number"
        register={register}
        error={errors.contact_number}
      />

      <FormInput
        label="Email"
        name="email"
        register={register}
        required="Email is required"
        error={errors.email}
      />

      <FormInput
        label="Father's Contact"
        name="father_contact_number"
        register={register}
        error={errors.father_contact_number}
      />

      <FormInput
        label="Mother's Contact"
        name="mother_contact_number"
        register={register}
        error={errors.mother_contact_number}
      />

      <FormTextarea
        label="Address"
        name="address"
        register={register}
        error={errors.address}
      />

      <FormInput
        label="Pincode"
        name="pincode"
        register={register}
        error={errors.pincode}
      />
    </FormSection>
  );
}