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

/* ── Qualification rows config (same as StepQualification) ── */
const QUAL_ROWS = [
  { label: "Secondary", key: "secondary" },
  { label: "Sr. Secondary", key: "sr_secondary" },
  { label: "Graduation", key: "graduation" },
  { label: "Post Graduation", key: "post_graduation" },
  { label: "Other", key: "other" },
];

/* Helper — find existing qualification data by examination key */
function findQual(qualifications, key) {
  if (!Array.isArray(qualifications)) return {};
  return qualifications.find((q) => q.examination === key) || {};
}

/* ── Main Component ── */
export default function EditStudentForm({ student, onClose, onUpdated }) {
  const { toast, show, clear } = useToast();
  const [loading, setLoading] = useState(false);

  // Qualification file state — same pattern as AddStudent
  const [qualificationFiles, setQualificationFiles] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // ── Personal ──
      candidate_name: student.candidate_name || "",
      father_name: student.father_name || "",
      mother_name: student.mother_name || "",
      dob: student.dob || "",
      gender: student.gender || "",
      category: student.category || "",

      // ── ID Proof ──
      id_proof_type: student.id_proof_type || "",
      id_proof_no: student.id_proof_no || "",

      // ── Employment ──
      employed:
        student.employed === 1 || student.employed === "yes" ? "yes" : "no",
      employer_name: student.employer_name || "",
      designation: student.designation || "",

      // ── Communication ──
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

      // ── Qualification flat fields (pre-populate from student.qualifications) ──
      ...QUAL_ROWS.reduce((acc, { key }) => {
        const q = findQual(student.qualifications, key);
        acc[`${key}_year`] = q.year_of_passing || "";
        acc[`${key}_board`] = q.board_university || "";
        acc[`${key}_percentage`] = q.percentage_cgpa || "";
        return acc;
      }, {}),

      // ── Programme ──
      year: student.year || "",
      month_session: student.month_session || "",
      session: student.session || "",
      mode_of_study: student.mode_of_study || "",
      hostel_facility: student.hostel_facility ?? "",
      application_fee: student.application_fee || "",
      duration: student.duration || "",
    },
  });

  // Conditional watchers (same logic as AddStudent)
  const selectedIdProof = watch("id_proof_type");
  const isEmployed = watch("employed");

  /* ── Submit ── */
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("id", student.id);

      // Qualification keys to skip from normal field loop
      const qualKeys = new Set(
        QUAL_ROWS.flatMap(({ key }) => [
          `${key}_year`,
          `${key}_board`,
          `${key}_percentage`,
        ]),
      );

      // 1️⃣ Normal fields
      Object.entries(data).forEach(([key, value]) => {
        if (qualKeys.has(key)) return; // handled separately below

        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else {
          formData.append(key, value ?? "");
        }
      });

      // 2️⃣ Structured qualifications — same format as AddStudent
      let qIndex = 0;
      QUAL_ROWS.forEach(({ key }) => {
        const year = data[`${key}_year`];
        const board = data[`${key}_board`];
        const percentage = data[`${key}_percentage`];
        const file = qualificationFiles[key];

        if (!year && !board && !percentage) return;

        formData.append(`qualifications[${qIndex}][examination]`, key);
        formData.append(
          `qualifications[${qIndex}][year_of_passing]`,
          year || "",
        );
        formData.append(
          `qualifications[${qIndex}][board_university]`,
          board || "",
        );
        formData.append(
          `qualifications[${qIndex}][percentage_cgpa]`,
          percentage || "",
        );
        if (file) {
          formData.append(`document[]`, file);
        }

        qIndex++;
      });

      await updateStudent(student.id, formData, true);

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
          <FormFileInput
            label="Photo"
            name="photo"
            register={register}
            existingUrl={student.photo_url || null}
          />
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
          {selectedIdProof && (
            <FormInput
              label="ID Proof Number"
              name="id_proof_no"
              register={register}
            />
          )}
          {selectedIdProof === "aadhar_card" && (
            <>
              <FormFileInput
                label="Aadhar Card Front"
                name="id_proof_front"
                register={register}
                existingUrl={student.id_proof_front_url || null}
              />
              <FormFileInput
                label="Aadhar Card Back"
                name="id_proof_back"
                register={register}
                existingUrl={student.id_proof_back_url || null}
              />
            </>
          )}
          {selectedIdProof && selectedIdProof !== "aadhar_card" && (
            <FormFileInput
              label="Upload ID Proof Document"
              name="id_proof_document"
              register={register}
              existingUrl={student.id_proof_document_url || null}
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

        {/* ── QUALIFICATION ── */}
        <FormSection title="Previous Qualification Details">
          <div className="md:col-span-2 overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-bg text-text">
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Examination</th>
                  <th className="text-left p-3 font-medium">Year of Passing</th>
                  <th className="text-left p-3 font-medium">Board / University</th>
                  <th className="text-left p-3 font-medium">% / CGPA</th>
                  <th className="text-left p-3 font-medium">Upload Document</th>
                </tr>
              </thead>
              <tbody>
                {QUAL_ROWS.map((row) => (
                  <tr key={row.key} className="border-b border-border">
                    <td className="p-3 text-text font-medium whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        {...register(`${row.key}_year`)}
                        placeholder="Year"
                        className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        {...register(`${row.key}_board`)}
                        placeholder="Board / University"
                        className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        {...register(`${row.key}_percentage`)}
                        placeholder="% / CGPA"
                        className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="text-sm text-text file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-primary file:text-white"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setQualificationFiles((prev) => ({
                              ...prev,
                              [row.key]: file,
                            }));
                          }
                        }}
                      />
                      {/* Show existing document preview using document_url */}
                      {findQual(student.qualifications, row.key).document_url && !qualificationFiles[row.key] && (
                        <div className="mt-1 flex items-center gap-2">
                          <img
                            src={findQual(student.qualifications, row.key).document_url}
                            alt="current doc"
                            className="h-10 w-10 object-cover rounded border border-border"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                          <span className="text-[10px] text-text-muted">
                            Saved · select file to replace
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
