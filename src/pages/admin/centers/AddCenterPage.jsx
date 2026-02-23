// src/pages/admin/centers/AddCenterPage.jsx
import { useForm } from "react-hook-form";
import FormSection from "../../../components/form/FormSection";
import FormInput from "../../../components/form/FormInput";
import FormTextarea from "../../../components/form/FormTextarea";
import FormSelect from "../../../components/form/FormSelect";
import FormFileInput from "../../../components/form/FormFileInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import Toast from "../../../components/ui/Toast";
import { useToast } from "../../../hooks/useToast";
import { createCenter } from "../../../api/center/centerApi";

export default function AddCenterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, show, clear } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("[AddCenterPage.jsx] Raw Form Data:", data);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "owner_image" && data[key][0]) {
          formData.append("owner_image", data[key][0]);
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });
      const response = await createCenter(formData);
      console.log("[AddCenterPage.jsx] Success Response:", response);
      show("success", "Center created successfully!");
      reset();
      // Optional: Redirect to centers list after short delay
      // setTimeout(() => navigate("/admin/centers"), 2000);
    } catch (err) {
      console.error("[AddCenterPage.jsx] Error creating center:", err);
      show("error", err.message || "Failed to create center");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}
      <h1 className="text-2xl font-semibold text-text">Create New Center</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-5xl mx-auto"
      >
        {/* SECTION 1: PERSONAL & INSTITUTE BASIC DETAILS */}
        <FormSection title="Franchisee Basic Information">
          <FormInput
            label="Institute Owner Name"
            name="institute_owner_name"
            register={register}
            required="Owner name is required"
            error={errors.institute_owner_name}
          />

          <FormInput
            label="Institute Name"
            name="institute_name"
            register={register}
            required="Institute name is required"
            error={errors.institute_name}
          />

          <FormInput
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            register={register}
            required="Date of birth is required"
            error={errors.date_of_birth}
          />

          <FormInput
            label="PAN Number"
            name="pan_number"
            register={register}
            error={errors.pan_number}
            placeholder="ABCDE1234F"
          />

          <FormInput
            label="Aadhar Number"
            name="aadhar_number"
            register={register}
            error={errors.aadhar_number}
            placeholder="12 digit Aadhar"
          />

          <FormFileInput
            label="Owner Profile Image"
            name="owner_image"
            register={register}
          />
        </FormSection>

        {/* SECTION 2: LOCATION & CONTACT */}
        <FormSection title="Contact & Location Details">
          <div className="md:col-span-2">
            <FormTextarea
              label="Institute Full Address"
              name="institute_full_address"
              register={register}
              error={errors.institute_full_address}
            />
          </div>

          <FormSelect
            label="State"
            name="state"
            register={register}
            options={[
              { label: "Select State", value: "" },
              { label: "Uttar Pradesh", value: "Uttar Pradesh" },
              { label: "Madhya Pradesh", value: "Madhya Pradesh" },
            ]}
          />

          <FormSelect
            label="District"
            name="district"
            register={register}
            options={[
              { label: "Select District", value: "" },
              { label: "Lucknow", value: "Lucknow" },
              { label: "Kanpur", value: "Kanpur" },
            ]}
          />

          <FormInput
            label="Pincode"
            name="pincode"
            register={register}
            error={errors.pincode}
          />

          <FormInput
            label="Contact Number"
            name="contact_number"
            type="tel"
            register={register}
            required="Contact number is required"
            error={errors.contact_number}
          />

          <FormInput
            label="E-Mail ID"
            name="email"
            type="email"
            register={register}
            required="Email is required"
            error={errors.email}
          />
        </FormSection>

        {/* SECTION 3: ACCOUNT ACCESS */}
        <FormSection title="Account Credentials">
          <FormInput
            label="Username"
            name="username"
            register={register}
            placeholder="Usually the email address"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            register={register}
            required="Password is required"
            error={errors.password}
          />
        </FormSection>

        <div className="flex justify-end gap-4">
          <Button
            variant="danger"
            onClick={() => navigate("/admin/centers")}
            disabled={isSubmitting}
          >
            Cancle
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Create Center
          </Button>
        </div>
      </form>
    </div>
  );
}
