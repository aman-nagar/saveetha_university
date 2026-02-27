// src/pages/admin/centers/AddCenterPage.jsx
import { useForm } from "react-hook-form";
import FormSection from "../../../components/form/FormSection";
import FormInput from "../../../components/form/FormInput";
import FormTextarea from "../../../components/form/FormTextarea";
import FormSelect from "../../../components/form/FormSelect";
import FormFileInput from "../../../components/form/FormFileInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Button from "../../../components/ui/Button";
import Toast from "../../../components/ui/Toast";
import { useToast } from "../../../hooks/useToast";
import {
  createCenter,
  updateCenter,
  fetchCenterById,
} from "../../../api/center/centerApi";
import { FaSpinner } from "react-icons/fa";

export default function AddCenterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const { toast, show, clear } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const centerId = searchParams.get("id");
  const isEditMode = !!centerId;

  const initialLoadDone = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load center data if in edit mode - with proper dependency array
  useEffect(() => {
    // Prevent infinite loop by checking if we've already loaded
    if (isEditMode && !initialLoadDone.current) {
      const loadCenter = async () => {
        try {
          setLoading(true);
          const data = await fetchCenterById(centerId);

          // 2. STORE THE DATA IN STATE FOR THE PREVIEW
          setCenterData(data);

          reset({
            institute_owner_name: data.institute_owner_name || "",
            institute_name: data.institute_name || "",
            date_of_birth: data.date_of_birth || "",
            pan_number: data.pan_number || "",
            aadhar_number: data.aadhar_number || "",
            institute_full_address: data.institute_full_address || "",
            state: data.state || "",
            district: data.district || "",
            pincode: data.pincode || "",
            contact_number: data.contact_number || "",
            email: data.email || "",
          });

          initialLoadDone.current = true;
        } catch (err) {
          show("error", "Failed to load center data");
        } finally {
          setLoading(false);
        }
      };

      loadCenter();
    } else if (!isEditMode && !initialLoadDone.current) {
      // Reset to empty form for create mode (only once)
      reset({
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
        username: "",
        password: "",
      });
      initialLoadDone.current = true;
    }
  }, [centerId, isEditMode, reset, show]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // 1. Mandatory ID for Edit
      if (isEditMode) {
        formData.append("id", centerId);
      }

      // 2. Append all form fields
      Object.keys(data).forEach((key) => {
        if (key === "owner_image") {
          if (data[key]?.[0]) {
            formData.append("owner_image", data[key][0]);
          }
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      // 3. Conditional Password Handling
      if (!isEditMode && !data.password) {
        throw new Error("Password is required for new centers");
      }

      // 4. Submit using the corrected API functions
      if (isEditMode) {
        await updateCenter(formData);
        show("success", "Center updated successfully!");
      } else {
        await createCenter(formData);
        show("success", "Center created successfully!");
      }

      setTimeout(() => navigate("/admin/centers"), 1500);
    } catch (err) {
      show("error", err.message || "Action failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary">
          <FaSpinner className="animate-spin" />
          <span>Loading center data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-text">
          {isEditMode ? "Edit Center" : "Create New Center"}
        </h1>
        <button
          type="button"
          onClick={() => navigate("/admin/centers")}
          className="self-start sm:self-auto text-sm text-muted hover:text-primary border border-border px-3 py-1.5 rounded-md transition-colors"
        >
          ← Back to Centers
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* SECTION 1: PERSONAL & INSTITUTE BASIC DETAILS */}
        <FormSection title="Franchisee Basic Information" columns={2}>
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
            placeholder="12 digit Aadhar"
          />

          <FormFileInput
            label="Owner Profile Image"
            name="owner_image"
            register={register}
            existingUrl={centerData?.owner_image_url}
          />
        </FormSection>

        {/* SECTION 2: LOCATION & CONTACT */}
        <FormSection title="Contact & Location Details" columns={2}>
          {/* Address spans full width */}
          <div className="sm:col-span-2">
            <FormTextarea
              label="Institute Full Address"
              name="institute_full_address"
              register={register}
              required="Address is required"
              error={errors.institute_full_address}
            />
          </div>

          <FormSelect
            label="State"
            name="state"
            register={register}
            required="State is required"
            error={errors.state}
            options={[
              { label: "Uttar Pradesh", value: "Uttar Pradesh" },
              { label: "Madhya Pradesh", value: "Madhya Pradesh" },
            ]}
          />

          <FormSelect
            label="District"
            name="district"
            register={register}
            required="District is required"
            error={errors.district}
            options={[
              { label: "Lucknow", value: "Lucknow" },
              { label: "Kanpur", value: "Kanpur" },
            ]}
          />

          <FormInput
            label="Pincode"
            name="pincode"
            register={register}
            required="Pincode is required"
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
        </FormSection>

        {/* SECTION 3: ACCOUNT ACCESS */}
        <FormSection
          title={
            isEditMode
              ? "Account Credentials (Optional)"
              : "Account Credentials"
          }
          columns={2}
        >
          <FormInput
            label="E-Mail ID"
            name="email"
            type="email"
            register={register}
            required="Email is required"
            error={errors.email}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            register={register}
            placeholder={
              isEditMode ? "Leave blank to keep current" : "Password"
            }
            required={!isEditMode && "Password is required"}
            error={errors.password}
          />
        </FormSection>

        {/* Action buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Button
            variant="danger"
            onClick={() => navigate("/admin/centers")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isEditMode ? "Update Center" : "Create Center"}
          </Button>
        </div>
      </form>
    </div>
  );
}
