// src/components/admin/students/admission/steps/StepCommunication.jsx
import FormInput from "../../../../form/FormInput";
import FormSection from "../../../../form/FormSection";
import FormSelect from "../../../../form/FormSelect";
import FormTextarea from "../../../../form/FormTextarea";

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

      <FormSelect
        label="Country"
        name="country"
        register={register}
        error={errors.country}
        options={[
          { label: "India", value: "India" },
          { label: "Other", value: "Other" },
        ]}
      />

      <FormInput
        label="Nationality"
        name="nationality"
        register={register}
        error={errors.nationality}
      />

      <FormInput
        label="State"
        name="state"
        register={register}
        error={errors.state}
      />

      <FormInput
        label="City"
        name="city"
        register={register}
        error={errors.city}
      />

      <FormTextarea
        label="Address"
        name="address"
        register={register}
        error={errors.address}
      />

      <FormInput
        type="number"
        label="Pincode"
        name="pincode"
        register={register}
        error={errors.pincode}
      />
    </FormSection>
  );
}
