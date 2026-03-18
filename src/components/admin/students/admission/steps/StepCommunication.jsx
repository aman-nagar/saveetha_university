// src/components/admin/students/admission/steps/StepCommunication.jsx
import FormInput from "../../../../form/FormInput";
import FormSection from "../../../../form/FormSection";
import FormSelect from "../../../../form/FormSelect";
import FormTextarea from "../../../../form/FormTextarea";

export default function StepCommunication({ register, errors }) {
  return (
    <FormSection title="Communication Details" columns={2}>
      <FormInput
        label="Contact Number"
        name="contact_number"
        register={register}
        required="Contact number is required"
        pattern={{
          value: /^[0-9]{10}$/,
          message: "Contact number must be exactly 10 digits",
        }}
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

      {/* Address spans full width */}
      <div className="sm:col-span-2">
        <FormTextarea
          label="Address"
          name="address"
          register={register}
          error={errors.address}
        />
      </div>

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
