import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaBuilding, FaUserTie, FaLock, FaImage, FaSpinner } from "react-icons/fa";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormTextarea from "@/components/form/FormTextarea";
import FormFileInput from "@/components/form/FormFileInput";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";
import { fetchCenterById, updateCenter } from "@/api/center/centerApi";
import { allStates } from "@/utils/staticData";

export default function MemberEditCenterModal({
  isOpen,
  onClose,
  center,
  onSuccess,
}) {
  const { show } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen && center?.id) {
      const loadDetails = async () => {
        setLoading(true);
        try {
          // Fetch full center record by ID to guarantee all fields are populated
          const data = await fetchCenterById(center.id);
          const fullData = data || center;
          setInitialData(fullData);

          reset({
            institute_name: fullData.institute_name || "",
            institute_owner_name: fullData.institute_owner_name || "",
            contact_number: fullData.contact_number || "",
            email: fullData.email || "",
            state: fullData.state || "",
            district: fullData.district || "",
            pincode: fullData.pincode || "",
            institute_full_address: fullData.institute_full_address || "",
            date_of_birth: fullData.date_of_birth || "",
            pan_number: fullData.pan_number || "",
            aadhar_number: fullData.aadhar_number || "",
            password: "",
          });
        } catch (err) {
          // Fallback to table row data
          setInitialData(center);
          reset({
            institute_name: center.institute_name || "",
            institute_owner_name: center.institute_owner_name || "",
            contact_number: center.contact_number || "",
            email: center.email || "",
            state: center.state || "",
            district: center.district || "",
            pincode: center.pincode || "",
            institute_full_address: center.institute_full_address || "",
            date_of_birth: center.date_of_birth || "",
            pan_number: center.pan_number || "",
            aadhar_number: center.aadhar_number || "",
            password: "",
          });
        } finally {
          setLoading(false);
        }
      };

      loadDetails();
    }
  }, [isOpen, center, reset]);

  const onSubmit = async (data) => {
    if (!center?.id) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("id", center.id);

      // Append standard fields
      Object.keys(data).forEach((key) => {
        if (key === "owner_image") {
          if (data[key]?.[0]) {
            formData.append("owner_image", data[key][0]);
          }
        } else if (key === "password") {
          // Only append password if user entered a new one
          if (data.password && data.password.trim()) {
            formData.append("password", data.password.trim());
          }
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      await updateCenter(formData);
      show("success", "Center details updated successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to update center:", err);
      show("error", err.message || "Failed to update center details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <FaBuilding className="text-primary w-4 h-4" />
          <span>Edit Center Details</span>
          {center?.id && (
            <span className="text-xs text-muted font-normal">
              (ID #{center.id})
            </span>
          )}
        </div>
      }
      size="xl"
    >
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted">
          <FaSpinner className="animate-spin text-primary text-2xl" />
          <span className="text-sm font-medium">Loading center details...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Institute Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border text-primary font-bold text-sm">
              <FaBuilding />
              <span>Institute Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Institute Name"
                name="institute_name"
                register={register}
                required="Institute name is required"
                error={errors.institute_name}
                placeholder="Enter institute name"
                className="sm:col-span-2"
              />

              <FormSelect
                label="State"
                name="state"
                register={register}
                options={allStates}
                required="State is required"
                error={errors.state}
                placeholder="Select state"
              />

              <FormInput
                label="District"
                name="district"
                register={register}
                required="District is required"
                error={errors.district}
                placeholder="Enter district"
              />

              <FormInput
                label="Pincode"
                name="pincode"
                register={register}
                required="Pincode is required"
                rules={{
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Enter a valid 6-digit pincode",
                  },
                }}
                error={errors.pincode}
                placeholder="e.g. 110001"
              />

              <div className="sm:col-span-2">
                <FormTextarea
                  label="Full Address"
                  name="institute_full_address"
                  register={register}
                  placeholder="Enter complete institute address with landmarks"
                  rows={2}
                  error={errors.institute_full_address}
                />
              </div>
            </div>
          </div>

          {/* Owner & Contact Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border text-accent font-bold text-sm">
              <FaUserTie />
              <span>Owner & Contact Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Owner / Director Name"
                name="institute_owner_name"
                register={register}
                required="Owner name is required"
                error={errors.institute_owner_name}
                placeholder="Enter owner full name"
              />

              <FormInput
                label="Contact / Mobile Number"
                name="contact_number"
                register={register}
                required="Contact number is required"
                rules={{
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number (10-15 digits)",
                  },
                }}
                error={errors.contact_number}
                placeholder="e.g. 9876543210"
              />

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                register={register}
                required="Email is required"
                rules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                }}
                error={errors.email}
                placeholder="center@example.com"
              />

              <FormInput
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                register={register}
                error={errors.date_of_birth}
              />

              <FormInput
                label="PAN Number"
                name="pan_number"
                register={register}
                placeholder="e.g. ABCDE1234F"
                error={errors.pan_number}
              />

              <FormInput
                label="Aadhar Number"
                name="aadhar_number"
                register={register}
                placeholder="e.g. 1234 5678 9012"
                error={errors.aadhar_number}
              />
            </div>
          </div>

          {/* Security & Photo Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border text-muted font-bold text-sm">
              <FaLock />
              <span>Security & Photo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div className="space-y-1">
                <FormInput
                  label="Password (Optional)"
                  name="password"
                  type="password"
                  register={register}
                  placeholder="Leave blank to keep unchanged"
                  error={errors.password}
                />
                <p className="text-[11px] text-muted">
                  Only enter a value if you want to reset the center account password.
                </p>
              </div>

              <div>
                <FormFileInput
                  label="Owner Photo"
                  name="owner_image"
                  register={register}
                  accept="image/*"
                  existingUrl={initialData?.owner_image_url || center?.owner_image_url}
                  error={errors.owner_image}
                />
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
