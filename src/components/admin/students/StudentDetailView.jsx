import { useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaBriefcase,
  FaPhoneAlt,
  FaGraduationCap,
  FaBookOpen,
  FaDownload,
  FaTimes,
  FaExpandAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
  FaCheckCircle,
  FaExclamationCircle,
  FaFileAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/* ── Sub-components ─────────────────────── */

function Section({ icon: Icon, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-primary" />
        </div>
        <h3 className="font-bold text-sm uppercase tracking-widest text-text opacity-80">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
        {children}
      </div>
    </motion.div>
  );
}

function Field({ label, value, full }) {
  return (
    <div className={full ? "col-span-full" : ""}>
      <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
        {label}
      </p>
      <div className="text-sm text-text font-medium leading-relaxed">
        {value || (
          <span className="text-muted/40 italic font-normal">Not Provided</span>
        )}
      </div>
    </div>
  );
}

function ImagePreviewCard({ label, src, onPreview }) {
  if (!src) return null;
  return (
    <div className="group relative flex flex-col gap-2">
      <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
        {label}
      </p>
      <div className="relative h-28 w-full sm:w-40 rounded-xl overflow-hidden border border-border bg-bg group-hover:border-primary/50 transition-colors">
        <img
          src={src}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onPreview(src, label)}
            className="p-2 bg-surface/10 hover:bg-surface/20 rounded-full backdrop-blur-md transition-all"
          >
            <FaExpandAlt size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Lightbox Modal ─────────────────────── */

function Lightbox({ url, label, onClose }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${label.toLowerCase().replace(/\s+/g, "_")}_document.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-overlay backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full max-h-full flex flex-col bg-surface rounded-2xl overflow-hidden shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface/50">
          <div className="flex items-center gap-3">
            <FaFileAlt className="text-primary" size={18} />
            <h4 className="font-bold text-text tracking-wide uppercase text-sm">
              {label}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg"
            >
              <FaDownload size={12} />
              DOWNLOAD
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg rounded-lg text-muted hover:text-text transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-bg/50">
          <img
            src={url}
            alt={label}
            className="max-w-full max-h-full object-contain rounded-lg shadow-inner"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Constants & Main Component ──────────────────────── */

const STATUS_MAP = {
  1: {
    label: "Active",
    icon: FaCheckCircle,
    cls: "bg-success/10 text-success border-success/20",
  },
  0: {
    label: "Inactive",
    icon: FaExclamationCircle,
    cls: "bg-danger/10 text-danger border-danger/20",
  },
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

export default function StudentDetailView({ student }) {
  const [preview, setPreview] = useState(null);
  if (!student) return null;

  const status = STATUS_MAP[student.status] || {
    label: "Unknown",
    icon: FaExclamationCircle,
    cls: "bg-muted/10 text-muted border-muted/20",
  };
  const findQual = (qualifications, key) => {
    if (!Array.isArray(qualifications)) return null;
    return qualifications.find((q) => q.examination === key) || null;
  };

  return (
    <div className="h-[100dvh] md:max-h-[85vh] overflow-y-auto px-4 md:px-8 pb-20 scrollbar-hide bg-surface text-text">
      <div className="relative w-full max-w-6xl mx-auto p-1 sm:p-4">
        <AnimatePresence>
          {preview && (
            <Lightbox
              url={preview.url}
              label={preview.label}
              onClose={() => setPreview(null)}
            />
          )}
        </AnimatePresence>

        {/* ── Profile Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 bg-bg/50 rounded-3xl mb-10 border border-border shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none" />
          <div className="relative">
            {student.photo_url ? (
              <div className="relative group">
                <img
                  src={student.photo_url}
                  alt="Student"
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl object-cover border-2 border-border shadow-2xl transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() =>
                    setPreview({
                      url: student.photo_url,
                      label: "Profile Photo",
                    })
                  }
                  className="absolute bottom-2 right-2 p-1.5 bg-overlay backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaExpandAlt size={14} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-4xl font-black border border-primary/20">
                {student.candidate_name?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h2 className="text-2xl sm:text-3xl font-black text-text tracking-tight truncate">
                {student.candidate_name}
              </h2>
              <div
                className={`inline-flex items-center gap-1.5 self-center sm:self-auto text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${status.cls}`}
              >
                <status.icon size={12} />
                {status.label}
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 text-muted font-mono text-sm mb-4">
              <span className="flex items-center gap-1.5">
                <FaIdCard size={14} className="text-primary/60" />
                {student.enrollment_no}
              </span>
              {student.email && (
                <span className="flex items-center gap-1.5">
                  <FaEnvelope size={14} className="text-primary/60" />
                  {student.email}
                </span>
              )}
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
              {student.gender && (
                <span className="text-[10px] font-bold text-muted border border-border rounded-lg px-2.5 py-1 uppercase tracking-wider bg-bg">
                  {student.gender}
                </span>
              )}
              {student.category && (
                <span className="text-[10px] font-bold text-muted border border-border rounded-lg px-2.5 py-1 uppercase tracking-wider bg-bg">
                  {CATEGORY_LABELS[student.category] || student.category}
                </span>
              )}
              {student.mode_of_study && (
                <span className="text-[10px] font-bold text-primary border border-primary/20 rounded-lg px-2.5 py-1 uppercase tracking-wider bg-primary/5">
                  {student.mode_of_study}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <Section icon={FaUser} title="Personal Details">
            <Field label="Father's Name" value={student.father_name} />
            <Field label="Mother's Name" value={student.mother_name} />
            <Field label="Date of Birth" value={student.dob} />
            <Field
              label="Employment Status"
              value={
                student.employed === 1 || student.employed === "yes"
                  ? "Currently Employed"
                  : "Unemployed"
              }
            />
            {(student.employed === 1 || student.employed === "yes") && (
              <>
                <Field label="Employer" value={student.employer_name} />
                <Field label="Designation" value={student.designation} />
              </>
            )}
          </Section>

          {student.id_proof_type && (
            <Section icon={FaIdCard} title="Identity Verification">
              <Field
                label="ID Type"
                value={
                  ID_PROOF_LABELS[student.id_proof_type] ||
                  student.id_proof_type
                }
              />
              <Field label="ID Number" value={student.id_proof_no} />
              <div className="col-span-full flex gap-6 flex-wrap mt-4">
                <ImagePreviewCard
                  label="ID Front"
                  src={student.id_proof_front_url}
                  onPreview={(url, lbl) => setPreview({ url, label: lbl })}
                />
                <ImagePreviewCard
                  label="ID Back"
                  src={student.id_proof_back_url}
                  onPreview={(url, lbl) => setPreview({ url, label: lbl })}
                />
                <ImagePreviewCard
                  label="Full Document"
                  src={student.id_proof_document_url}
                  onPreview={(url, lbl) => setPreview({ url, label: lbl })}
                />
              </div>
            </Section>
          )}

          <Section icon={FaPhoneAlt} title="Communication & Location">
            <Field label="Primary Contact" value={student.contact_number} />
            <Field
              label="Father's Contact"
              value={student.father_contact_number}
            />
            <Field
              label="Mother's Contact"
              value={student.mother_contact_number}
            />
            <Field label="Nationality" value={student.nationality} />
            <Field
              label="Location"
              value={`${student.city}, ${student.state}, ${student.country}`}
            />
            <Field label="Pincode" value={student.pincode} />
            <Field label="Full Address" value={student.address} full />
          </Section>

          {Array.isArray(student.qualifications) &&
            student.qualifications.length > 0 && (
              <Section icon={FaGraduationCap} title="Academic History">
                <div className="col-span-full overflow-hidden rounded-2xl border border-border bg-bg/30">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="bg-bg/50 text-[10px] font-black uppercase tracking-widest text-muted border-b border-border">
                          <th className="px-6 py-4">Examination</th>
                          <th className="px-6 py-4">Year</th>
                          <th className="px-6 py-4">Board / University</th>
                          <th className="px-6 py-4">% / CGPA</th>
                          <th className="px-6 py-4 text-right">Document</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {QUAL_ROWS.map(({ label, key }) => {
                          const q = findQual(student.qualifications, key);
                          if (!q) return null;
                          return (
                            <tr
                              key={key}
                              className="hover:bg-primary/5 transition-colors group"
                            >
                              <td className="px-6 py-4 font-bold text-text">
                                {label}
                              </td>
                              <td className="px-6 py-4 text-muted">
                                {q.year_of_passing || "—"}
                              </td>
                              <td className="px-6 py-4 text-muted">
                                {q.board_university || "—"}
                              </td>
                              <td className="px-6 py-4 text-muted">
                                {q.percentage_cgpa || "—"}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {q.document_url ? (
                                  <button
                                    onClick={() =>
                                      setPreview({
                                        url: q.document_url,
                                        label: `${label} Certificate`,
                                      })
                                    }
                                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-accent transition-colors"
                                  >
                                    <FaExpandAlt size={12} /> VIEW
                                  </button>
                                ) : (
                                  <span className="text-muted/20">—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>
            )}

          <Section icon={FaBookOpen} title="Programme & Enrollment">
            <Field label="Course Type" value={student.course_type} />
            <Field label="Faculty" value={student.faculty} />
            <Field label="Course" value={student.course} />
            <Field label="Stream" value={student.stream} />
            <Field label="Academic Year" value={student.year} />
            <Field
              label="Session"
              value={`${student.session} (${student.month_session})`}
            />
            <Field label="Duration" value={student.duration} />
            <Field
              label="Hostel Facility"
              value={
                student.hostel_facility == 1 ? "Requested" : "Not Required"
              }
            />
            <Field
              label="Application Fee"
              value={
                student.application_fee
                  ? `₹${student.application_fee}`
                  : "Exempt"
              }
            />
          </Section>
        </div>
      </div>
    </div>
  );
}
