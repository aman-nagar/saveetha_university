/**
 * src/pages/public/ApplyFranchisePage.jsx
 * PUBLIC PAGE: Franchise Application Form
 *
 * Route: /apply-franchise
 * Authentication: NOT REQUIRED
 *
 * This is a PUBLIC form - separate from admin center management
 * Uses same form components but different API endpoint
 */

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormSection from "../../components/form/FormSection";
import FormInput from "../../components/form/FormInput";
import FormTextarea from "../../components/form/FormTextarea";
import FormSelect from "../../components/form/FormSelect";
import FormFileInput from "../../components/form/FormFileInput";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";
import { useToast } from "../../context/ToastContext";
import { submitFranchiseApplication } from "../../api/public/franchiseApi";
import { allStates } from "../../utils/staticData";

export default function ApplyFranchisePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, show, clear } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      institute_owner_name: "",
      institute_name: "",
      date_of_birth: "",
      pan_number: "",
      aadhar_number: "",
      institute_full_address: "",
      state: "",
      district: "",
      pincode: "",
      contact_number: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach((key) => {
        if (key === "owner_image") {
          if (data[key]?.[0]) {
            formData.append("owner_image", data[key][0]);
          }
        } else if (
          data[key] !== undefined &&
          data[key] !== null &&
          data[key] !== ""
        ) {
          formData.append(key, data[key]);
        }
      });

      // Submit to PUBLIC franchise API (no auth required)
      const response = await submitFranchiseApplication(formData);

      show("success", "Franchise application submitted successfully!");

      // Store reference ID for tracking
      if (response.reference_id) {
        localStorage.setItem("franchiseRefId", response.reference_id);
      }

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate("/franchise/success", {
          state: { referenceId: response.reference_id },
        });
      }, 2000);

      reset();
    } catch (err) {
      show("error", err.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {toast && <Toast {...toast} onClose={clear} />}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-3">
            Become Our Franchise Partner
          </h1>
          <p className="text-lg text-text/70 max-w-4xl mx-auto">
            Join Saveetha Amravati University and expand quality education in
            your region. Fill out the form below to apply for franchise
            partnership.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-border rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* SECTION 1: PERSONAL & INSTITUTE BASIC DETAILS */}
            <FormSection title="Your Information" columns={2}>
              <FormInput
                label="Institute Owner Name"
                name="institute_owner_name"
                register={register}
                required="Owner name is required"
                error={errors.institute_owner_name}
                placeholder="Enter your full name"
              />

              <FormInput
                label="Institute Name"
                name="institute_name"
                register={register}
                required="Institute name is required"
                error={errors.institute_name}
                placeholder="Name of your institute"
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
                required="PAN number is required"
                error={errors.pan_number}
                placeholder="ABCDE1234F"
              />

              <FormInput
                label="Aadhar Number"
                name="aadhar_number"
                register={register}
                required="Aadhar number is required"
                error={errors.aadhar_number}
                placeholder="12 digit Aadhar number"
              />

              <FormFileInput
                label="Owner Profile Photo"
                name="owner_image"
                register={register}
                accept="image/*"
              />
            </FormSection>

            {/* SECTION 2: INSTITUTE LOCATION & DETAILS */}
            <FormSection title="Institute Location" columns={2}>
              <div className="sm:col-span-2">
                <FormTextarea
                  label="Full Address"
                  name="institute_full_address"
                  register={register}
                  required="Address is required"
                  error={errors.institute_full_address}
                  placeholder="Complete address of your institute"
                  rows={3}
                />
              </div>

              <FormSelect
                label="State"
                name="state"
                register={register}
                required="State is required"
                error={errors.state}
                options={allStates}
              />

              <FormInput
                label="District"
                name="district"
                register={register}
                required="District is required"
                error={errors.district}
                placeholder="District name"
              />

              <FormInput
                label="Pincode"
                name="pincode"
                register={register}
                required="Pincode is required"
                error={errors.pincode}
                placeholder="6 digit pincode"
              />
            </FormSection>

            {/* SECTION 3: CONTACT INFORMATION */}
            <FormSection title="Contact Details" columns={2}>
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                register={register}
                required="Email is required"
                error={errors.email}
                placeholder="your.email@example.com"
              />

              <FormInput
                label="Contact Number"
                name="contact_number"
                type="tel"
                register={register}
                required="Contact number is required"
                error={errors.contact_number}
                placeholder="10 digit mobile number"
              />
            </FormSection>

            {/* Info Banner */}
            <div className="bg-accent/5 border-l-4 border-accent px-6 py-4 rounded">
              <p className="text-sm text-text/80">
                <strong>Note:</strong> After submitting this form, our
                partnership team will review your application and contact you
                within 5-7 business days with next steps.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 border-t border-border">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg border border-border/50">
            <div className="text-4xl mb-2">🎓</div>
            <h3 className="font-heading font-semibold text-primary mb-2">
              Proven Curriculum
            </h3>
            <p className="text-sm text-text/70">
              Access to SAU's established and approved course structure
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-border/50">
            <div className="text-4xl mb-2">🤝</div>
            <h3 className="font-heading font-semibold text-primary mb-2">
              Full Support
            </h3>
            <p className="text-sm text-text/70">
              Ongoing training, resources, and operational guidance
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-border/50">
            <div className="text-4xl mb-2">📈</div>
            <h3 className="font-heading font-semibold text-primary mb-2">
              Growth Opportunity
            </h3>
            <p className="text-sm text-text/70">
              Build your business with a recognized university brand
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
