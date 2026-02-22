// src/components/admin/students/EditStudentForm.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateStudent } from "../../../api/students/studentApi";
import { useToast } from "../../../hooks/useToast";
import Toast from "../../ui/Toast";

import FormInput from "../../form/FormInput";
import FormSelect from "../../form/FormSelect";
import FormFileInput from "../../form/FormFileInput";
import FormTextarea from "../../form/FormTextarea";
import FormSection from "../../form/FormSection";

export default function EditStudentForm({ student, onClose, onUpdated }) {
  const { toast, show, clear } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Personal
      candidate_name: student.candidate_name || "",
      father_name: student.father_name || "",
      mother_name: student.mother_name || "",
      dob: student.dob || "",
      gender: student.gender || "",
      category: student.category || "",

      // ID Proof
      id_proof_type: student.id_proof_type || "",
      id_proof_no: student.id_proof_no || "",

      // Employment
      employed:
        student.employed === 1 || student.employed === "yes" ? "yes" : "no",
      employer_name: student.employer_name || "",
      designation: student.designation || "",

      // Communication
      contact_number: student.contact_number || "",
      email: student.email || "",
      father_contact_number: student.father_contact_number || "",
      mother_contact_number: student.mother_contact_number || "",
      country: student.country || "",
      nationality: student.nationality || "",
      state: student.state || "",
      city: student.city || "",
      address: student.address || "",
      pincode: student.pincode || "",

      // Programme
      year: student.year || "",
      month_session: student.month_session || "",
      session: student.session || "",
      mode_of_study: student.mode_of_study || "",
      hostel_facility: student.hostel_facility ?? "",
      application_fee: student.application_fee || "",
      duration: student.duration || "",
    },
  });

  // Conditional watchers — same logic as AddStudent
  const selectedIdProof = watch("id_proof_type");
  const isEmployed = watch("employed");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Check if any file fields were filled (photo, id proof docs)
      const hasPhoto = data.photo instanceof FileList && data.photo.length > 0;
      const hasIdFront =
        data.id_proof_front instanceof FileList &&
        data.id_proof_front.length > 0;
      const hasIdBack =
        data.id_proof_back instanceof FileList &&
        data.id_proof_back.length > 0;
      const hasIdDocument =
        data.id_proof_document instanceof FileList &&
        data.id_proof_document.length > 0;

      const hasFiles = hasPhoto || hasIdFront || hasIdBack || hasIdDocument;

      if (hasFiles) {
        // Send as multipart/form-data
        const formData = new FormData();
        formData.append("id", student.id);

        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof FileList) {
            if (value.length > 0) formData.append(key, value[0]);
          } else {
            formData.append(key, value ?? "");
          }
        });

        await updateStudent(student.id, formData, true);
      } else {
        // No files — send as JSON (simpler, cleaner)
        const payload = { ...data };
        // Remove FileList keys
        Object.keys(payload).forEach((k) => {
          if (payload[k] instanceof FileList) delete payload[k];
        });
        await updateStudent(student.id, payload);
      }

      show("success", "Student updated successfully");
      onUpdated({ id: student.id, ...data });
      setTimeout(onClose, 1200);
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast {...toast} onClose={clear} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Enrollment badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Enrollment No:</span>
          <span className="font-mono text-sm font-semibold text-primary">
            {student.enrollment_no}
          </span>
        </div>

        {/* ── PERSONAL ── */}
        <FormSection title="Personal Details">
          <FormInput
            label="Candidate Name"
            name="candidate_name"
            register={register}
            error={errors.candidate_name}
          />
          <FormInput
            label="Father's Name"
            name="father_name"
            register={register}
          />
          <FormInput
            label="Mother's Name"
            name="mother_name"
            register={register}
          />
          <FormInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
          />
          <FormFileInput label="Photo" name="photo" register={register} />
          <FormSelect
            label="Gender"
            name="gender"
            register={register}
            error={errors.gender}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
          />
          <FormSelect
            label="Category"
            name="category"
            register={register}
            options={[
              { label: "General", value: "general" },
              { label: "OBC", value: "obc" },
              { label: "SC", value: "sc" },
              { label: "ST", value: "st" },
              { label: "BC", value: "bc" },
              { label: "SBC", value: "sbc" },
              { label: "EBC", value: "ebc" },
              { label: "PH", value: "ph" },
              { label: "EX-Servicemen", value: "ex-servicemen" },
              { label: "Other", value: "other" },
            ]}
          />
        </FormSection>

        {/* ── ID PROOF ── */}
        <FormSection title="ID Proof">
          <FormSelect
            label="ID Proof Type"
            name="id_proof_type"
            register={register}
            options={[
              { label: "Aadhar Card", value: "aadhar_card" },
              { label: "Pan Card", value: "pan_card" },
              { label: "Voter ID Card", value: "voter_id_card" },
              { label: "Passport", value: "passport" },
              { label: "Other", value: "other" },
            ]}
          />

          {/* Show ID number whenever a type is chosen */}
          {selectedIdProof && (
            <FormInput
              label="ID Proof Number"
              name="id_proof_no"
              register={register}
            />
          )}

          {/* Aadhar → front + back images */}
          {selectedIdProof === "aadhar_card" && (
            <>
              <FormFileInput
                label="Aadhar Card Front"
                name="id_proof_front"
                register={register}
              />
              <FormFileInput
                label="Aadhar Card Back"
                name="id_proof_back"
                register={register}
              />
            </>
          )}

          {/* Any other ID type → single document */}
          {selectedIdProof && selectedIdProof !== "aadhar_card" && (
            <FormFileInput
              label="Upload ID Proof Document"
              name="id_proof_document"
              register={register}
            />
          )}
        </FormSection>

        {/* ── EMPLOYMENT ── */}
        <FormSection title="Employment">
          <FormSelect
            label="Are you employed?"
            name="employed"
            register={register}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
          {isEmployed === "yes" && (
            <>
              <FormInput
                label="Employer Name"
                name="employer_name"
                register={register}
              />
              <FormInput
                label="Designation"
                name="designation"
                register={register}
              />
            </>
          )}
        </FormSection>

        {/* ── COMMUNICATION ── */}
        <FormSection title="Communication Details">
          <FormInput
            label="Contact Number"
            name="contact_number"
            register={register}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
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
          <FormSelect
            label="Country"
            name="country"
            register={register}
            options={[
              { label: "India", value: "India" },
              { label: "Other", value: "Other" },
            ]}
          />
          <FormInput
            label="Nationality"
            name="nationality"
            register={register}
          />
          <FormInput label="State" name="state" register={register} />
          <FormInput label="City" name="city" register={register} />
          {/* Address spans full width — we wrap it in a col-span-2 div */}
          <div className="md:col-span-2">
            <FormTextarea label="Address" name="address" register={register} />
          </div>
          <FormInput
            label="Pincode"
            name="pincode"
            type="number"
            register={register}
          />
        </FormSection>

        {/* ── PROGRAMME ── */}
        <FormSection title="Programme Details">
          <FormInput label="Year" name="year" register={register} />
          <FormInput
            label="Month Session"
            name="month_session"
            register={register}
          />
          <FormInput label="Session" name="session" register={register} />
          <FormSelect
            label="Mode of Study"
            name="mode_of_study"
            register={register}
            options={[
              { label: "Regular", value: "Regular" },
              { label: "Distance", value: "Distance" },
            ]}
          />
          <FormSelect
            label="Hostel Facility"
            name="hostel_facility"
            register={register}
            options={[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ]}
          />
          <FormInput
            label="Application Fee"
            name="application_fee"
            type="number"
            register={register}
          />
          <FormInput
            label="Duration"
            name="duration"
            placeholder="e.g. 3 Years"
            register={register}
          />
        </FormSection>

        {/* ── ACTIONS ── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 border border-border rounded-md text-sm hover:bg-bg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Student"}
          </button>
        </div>
      </form>
    </>
  );
}
