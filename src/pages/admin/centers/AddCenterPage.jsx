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
  const { toast, show, clear } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const centerId = searchParams.get("id");
  const isEditMode = !!centerId;

  // Use a ref to track if initial data has been loaded
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
          const centerData = await fetchCenterById(centerId);

          // Reset form with fetched data
          reset({
            institute_owner_name: centerData.institute_owner_name || "",
            institute_name: centerData.institute_name || "",
            date_of_birth: centerData.date_of_birth || "",
            pan_number: centerData.pan_number || "",
            aadhar_number: centerData.aadhar_number || "",
            institute_full_address: centerData.institute_full_address || "",
            state: centerData.state || "",
            district: centerData.district || "",
            pincode: centerData.pincode || "",
            contact_number: centerData.contact_number || "",
            email: centerData.email || "",
            username: "", // Don't populate password fields
            password: "",
          });

          initialLoadDone.current = true;
        } catch (err) {
          console.error("[AddCenterPage.jsx] Error loading center:", err);
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
  }, [centerId, isEditMode, reset, show]); // Added all dependencies

  const onSubmit = async (data) => {
    console.log(
      `[AddCenterPage.jsx] ${isEditMode ? "Updating" : "Creating"} center:`,
      data,
    );
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add ID if in edit mode
      if (isEditMode) {
        formData.append("id", centerId);
      }

      // Add all other fields
      Object.keys(data).forEach((key) => {
        if (key === "owner_image" && data[key]?.[0]) {
          formData.append("owner_image", data[key][0]);
        } else if (
          data[key] !== undefined &&
          data[key] !== null &&
          data[key] !== ""
        ) {
          formData.append(key, data[key]);
        }
      });

      // Only include password in create mode, or if provided in edit mode
      if (!isEditMode || (isEditMode && data.password)) {
        formData.append("password", data.password);
      }

      let response;
      if (isEditMode) {
        response = await updateCenter(formData);
        show("success", "Center updated successfully!");
      } else {
        response = await createCenter(formData);
        show("success", "Center created successfully!");
      }

      console.log(`[AddCenterPage.jsx] Success Response:`, response);

      // Redirect back to centers list after short delay
      setTimeout(() => navigate("/admin/centers"), 1500);
    } catch (err) {
      console.error(
        `[AddCenterPage.jsx] Error ${isEditMode ? "updating" : "creating"} center:`,
        err,
      );
      show(
        "error",
        err.message || `Failed to ${isEditMode ? "update" : "create"} center`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary">
          <FaSpinner className="animate-spin" />
          <span>Loading center data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}
      <h1 className="text-2xl font-semibold text-text">
        {isEditMode ? "Edit Center" : "Create New Center"}
      </h1>

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
            existingUrl={isEditMode ? null : undefined}
          />
        </FormSection>

        {/* SECTION 2: LOCATION & CONTACT */}
        <FormSection title="Contact & Location Details">
          <div className="md:col-span-2">
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
              { label: "Select State", value: "" },
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
              { label: "Select District", value: "" },
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
        <FormSection
          title={
            isEditMode
              ? "Account Credentials (Optional)"
              : "Account Credentials"
          }
        >
          <FormInput
            label="Username"
            name="username"
            register={register}
            placeholder={
              isEditMode ? "Leave blank to keep current" : "Username"
            }
            required={!isEditMode && "Username is required"}
            error={errors.username}
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

        <div className="flex justify-end gap-4">
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
