// src/components/admin/students/StudentDetailView.jsx
import {
  FaUser,
  FaIdCard,
  FaBriefcase,
  FaPhone,
  FaGraduationCap,
  FaBook,
} from "react-icons/fa";

function Section({ icon: Icon, title, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="text-primary text-sm" />
        </div>
        <h3 className="font-semibold text-text text-sm uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, full }) {
  return (
    <div className={full ? "col-span-2 md:col-span-3" : ""}>
      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-sm text-text font-medium break-words">
        {value || <span className="text-text-muted italic font-normal">—</span>}
      </p>
    </div>
  );
}

function ImageCard({ label, src }) {
  if (!src) return null;
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
        {label}
      </p>
      <img
        src={src}
        alt={label}
        className="h-24 w-24 object-cover rounded-lg border border-border shadow-sm"
        onError={(e) => {
          e.target.parentElement.style.display = "none";
        }}
      />
    </div>
  );
}

const STATUS_MAP = {
  1: { label: "Active", cls: "bg-green-100 text-green-700" },
  0: { label: "Inactive", cls: "bg-yellow-100 text-yellow-700" },
};

const CATEGORY_LABELS = {
  general: "General",
  obc: "OBC",
  sc: "SC",
  st: "ST",
  bc: "BC",
  sbc: "SBC",
  ebc: "EBC",
  ph: "PH",
  "ex-servicemen": "EX-Servicemen",
  other: "Other",
};

const ID_PROOF_LABELS = {
  aadhar_card: "Aadhar Card",
  pan_card: "Pan Card",
  voter_id_card: "Voter ID Card",
  passport: "Passport",
  other: "Other",
};

const QUAL_ROWS = [
  { label: "Secondary", key: "secondary" },
  { label: "Sr. Secondary", key: "sr_secondary" },
  { label: "Graduation", key: "graduation" },
  { label: "Post Graduation", key: "post_graduation" },
  { label: "Other", key: "other" },
];

function findQual(qualifications, key) {
  if (!Array.isArray(qualifications)) return null;
  return qualifications.find((q) => q.examination === key) || null;
}

/* ── Main Component ──────────────────────── */

export default function StudentDetailView({ student }) {
  if (!student) return null;

  const status = STATUS_MAP[student.status] || {
    label: "Unknown",
    cls: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-1">
      {/* ── Profile Header ── */}
      <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl mb-6 border border-primary/10">
        {student.photo_url ? (
          <img
            src={student.photo_url}
            alt="Student"
            className="h-16 w-16 rounded-full object-cover border-2 border-primary/30 shadow"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold flex-shrink-0">
            {student.candidate_name?.[0]?.toUpperCase() || "?"}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-text truncate">
            {student.candidate_name}
          </h2>
          <p className="text-sm text-text-muted font-mono">
            {student.enrollment_no}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status.cls}`}
            >
              {status.label}
            </span>
            {student.gender && (
              <span className="text-xs text-text-muted border border-border rounded-full px-2 py-0.5">
                {student.gender}
              </span>
            )}
            {student.category && (
              <span className="text-xs text-text-muted border border-border rounded-full px-2 py-0.5">
                {CATEGORY_LABELS[student.category] || student.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Personal Details ── */}
      <Section icon={FaUser} title="Personal Details">
        <Field label="Father's Name" value={student.father_name} />
        <Field label="Mother's Name" value={student.mother_name} />
        <Field label="Date of Birth" value={student.dob} />
        <Field
          label="Employed"
          value={
            student.employed === 1 || student.employed === "yes" ? "Yes" : "No"
          }
        />
        {(student.employed === 1 || student.employed === "yes") && (
          <>
            <Field label="Employer" value={student.employer_name} />
            <Field label="Designation" value={student.designation} />
          </>
        )}
      </Section>

      {/* ── ID Proof ── */}
      {student.id_proof_type && (
        <Section icon={FaIdCard} title="ID Proof">
          <Field
            label="ID Type"
            value={
              ID_PROOF_LABELS[student.id_proof_type] || student.id_proof_type
            }
          />
          <Field label="ID Number" value={student.id_proof_no} />
          <div className="col-span-2 md:col-span-3 flex gap-4 flex-wrap mt-2">
            <ImageCard label="Front" src={student.id_proof_front_url} />
            <ImageCard label="Back" src={student.id_proof_back_url} />
            <ImageCard label="Document" src={student.id_proof_document_url} />
          </div>
        </Section>
      )}

      {/* ── Communication ── */}
      <Section icon={FaPhone} title="Communication">
        <Field label="Contact" value={student.contact_number} />
        <Field label="Email" value={student.email} />
        <Field label="Father's Contact" value={student.father_contact_number} />
        <Field label="Mother's Contact" value={student.mother_contact_number} />
        <Field label="Country" value={student.country} />
        <Field label="Nationality" value={student.nationality} />
        <Field label="State" value={student.state} />
        <Field label="City" value={student.city} />
        <Field label="Pincode" value={student.pincode} />
        <Field label="Address" value={student.address} full />
      </Section>

      {/* ── Qualifications ── */}
      {Array.isArray(student.qualifications) &&
        student.qualifications.length > 0 && (
          <Section icon={FaGraduationCap} title="Qualifications">
            <div className="col-span-2 md:col-span-3 overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-bg">
                  <tr className="border-b border-border text-text-muted text-xs uppercase">
                    <th className="text-left p-2 pl-3">Examination</th>
                    <th className="text-left p-2">Year</th>
                    <th className="text-left p-2">Board / University</th>
                    <th className="text-left p-2">% / CGPA</th>
                    <th className="text-left p-2">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {QUAL_ROWS.map(({ label, key }) => {
                    const q = findQual(student.qualifications, key);
                    if (!q) return null;
                    return (
                      <tr
                        key={key}
                        className="border-b border-border last:border-0"
                      >
                        <td className="p-2 pl-3 font-medium text-text">
                          {label}
                        </td>
                        <td className="p-2 text-text-muted">
                          {q.year_of_passing || "—"}
                        </td>
                        <td className="p-2 text-text-muted">
                          {q.board_university || "—"}
                        </td>
                        <td className="p-2 text-text-muted">
                          {q.percentage_cgpa || "—"}
                        </td>
                        <td className="p-2">
                          {q.document_url ? (
                            <a
                              href={q.document_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={q.document_url}
                                alt="doc"
                                className="h-8 w-8 object-cover rounded border border-border"
                                onError={(e) => {
                                  e.target.replaceWith(
                                    Object.assign(document.createElement("a"), {
                                      href: q.document_url,
                                      target: "_blank",
                                      textContent: "View",
                                      className:
                                        "text-xs text-primary underline",
                                    }),
                                  );
                                }}
                              />
                            </a>
                          ) : (
                            <span className="text-text-muted text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>
        )}

      {/* ── Programme ── */}
      <Section icon={FaBook} title="Programme Details">
        <Field label="Course Type" value={student.course_type} />
        <Field label="Faculty" value={student.faculty} />
        <Field label="Course" value={student.course} />
        <Field label="Stream" value={student.stream} />
        <Field label="Year" value={student.year} />
        <Field label="Session" value={student.session} />
        <Field label="Month Session" value={student.month_session} />
        <Field label="Mode of Study" value={student.mode_of_study} />
        <Field
          label="Hostel Facility"
          value={student.hostel_facility == 1 ? "Yes" : "No"}
        />
        <Field
          label="Application Fee"
          value={student.application_fee ? `₹${student.application_fee}` : null}
        />
        <Field label="Duration" value={student.duration} />
      </Section>

      {/* ── Meta ── */}
      <div className="flex gap-4 text-[10px] text-text-muted pt-2 border-t border-border mt-2 flex-wrap">
        <span>Created: {student.created_at?.slice(0, 10) || "—"}</span>
        <span>Updated: {student.updated_at?.slice(0, 10) || "—"}</span>
      </div>
    </div>
  );
}
