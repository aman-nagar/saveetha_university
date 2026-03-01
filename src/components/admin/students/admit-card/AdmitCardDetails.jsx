// src/components/admin/courses/AdmitCardDetails.jsx
import { FiUser } from "react-icons/fi";

export default function AdmitCardDetails({ data }) {
  if (!data) return null;

  return (
    <div className="admit-card-print-root w-full max-w-[210mm] mx-auto bg-white p-3 sm:p-10 print:p-0">
      <style>{`
  @media print {

    /* ── Page setup ───────────────────────────── */
    @page {
      size: A4 portrait;
      margin: 8mm;
    }

    /* ── Reset browser scaling issues ─────────── */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      height: auto !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ❌ REMOVE zoom completely (it causes bottom shift) */

    /* ── Hide everything ───────────────────────── */
    body * {
      visibility: hidden !important;
    }

    /* ── Show only admit card ─────────────────── */
    .admit-card-print-root,
    .admit-card-print-root * {
      visibility: visible !important;
    }

    /* ── Anchor card properly to top-left ─────── */
    .admit-card-print-root {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      box-shadow: none !important;
    }
  }
`}</style>

      {/* Outer Frame */}
      <div className="border-4 border-double border-black p-3 sm:p-4 print:p-3">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="text-center mb-4 print:mb-2 border-b-2 border-black pb-3 print:pb-2">
          <h1 className="text-xl sm:text-3xl print:text-xl font-serif font-extrabold text-black uppercase mb-2 print:mb-1">
            Aryavart International University
          </h1>
          <div className="inline-block bg-black text-white px-6 sm:px-10 py-1.5 print:py-1 text-sm sm:text-xl print:text-sm font-bold tracking-widest rounded-sm">
            ADMIT CARD
          </div>
          <p className="mt-2 print:mt-1 text-xs font-semibold text-gray-800">
            Session: {data.session || "2025-26"} |{" "}
            {data.duration_type || "Semester"} {data.duration || "1"}
          </p>
        </div>

        {/* ── Info + Photo ─────────────────────────────────────── */}
        <div className="flex flex-row items-start gap-3 sm:gap-5 mb-5 print:mb-3 px-1 sm:px-2">
          <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-x-4 gap-y-2 print:gap-y-1">
            <InfoRow label="Enrollment Number" value={data.enrollment_no} />
            <InfoRow label="Roll No." value={data.roll_number} />
            <InfoRow
              label="Candidate Name"
              value={data.candidate_name}
              highlight
            />
            <InfoRow label="Contact Number" value={data.contact_number} />
            <InfoRow label="Father's Name" value={data.father_name} />
            <InfoRow label="Stream" value={data.duration_type} />
            <InfoRow label="Mother's Name" value={data.mother_name} />
          </div>

          <div className="flex-shrink-0 w-20 h-24 sm:w-28 sm:h-36 print:w-24 print:h-32 self-start border-2 border-black bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
            {data.photo ? (
              <img
                src={data.photo}
                alt="Student"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <FiUser className="w-8 h-8 sm:w-12 sm:h-12 text-gray-200" />
                <span className="absolute bottom-1 text-[7px] uppercase text-gray-400 font-bold text-center px-1">
                  No Photo Found
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mb-5 print:mb-3">
          <div className="bg-black text-white text-center py-2 print:py-1">
            <h3 className="font-bold text-[10px] sm:text-sm print:text-[10px] tracking-widest uppercase">
              Paper Names & Schedule
            </h3>
          </div>

          <table className="w-full border-collapse border-2 border-black table-fixed">
            {/* ✅ No comments, no whitespace inside <colgroup> */}
            <colgroup>
              <col style={{ width: "8%" }} />
              <col style={{ width: "42%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>

            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-black py-2 print:py-1 px-1 font-black text-black text-[9px] sm:text-[11px] print:text-[9px] text-center">
                  #
                </th>
                <th className="border-2 border-black py-2 print:py-1 px-2 font-black text-black text-[9px] sm:text-[11px] print:text-[9px] text-left">
                  Subject Code & Name
                </th>
                <th className="border-2 border-black py-2 print:py-1 px-1 font-black text-black text-[9px] sm:text-[11px] print:text-[9px] text-center">
                  Exam Date
                </th>
                <th className="border-2 border-black py-2 print:py-1 px-1 font-black text-black text-[9px] sm:text-[11px] print:text-[9px] text-center">
                  Timing
                </th>
              </tr>
            </thead>

            <tbody>
              {data.subjects?.map((sub, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="border-2 border-black py-2 print:py-1 px-1 text-center font-bold text-[9px] sm:text-[11px] print:text-[9px]">
                    {i + 1}
                  </td>
                  <td className="border-2 border-black py-2 print:py-1 px-2 text-black text-[9px] sm:text-[11px] print:text-[9px] uppercase">
                    <span className="block font-bold text-gray-500">
                      [{sub.subject_code}]
                    </span>
                    <span className="font-black">{sub.subject_name}</span>
                  </td>
                  <td className="border-2 border-black py-2 print:py-1 px-1 text-center font-bold text-[9px] sm:text-[11px] print:text-[9px] text-black">
                    {sub.exam_date}
                  </td>
                  <td className="border-2 border-black py-2 print:py-1 px-1 text-center font-black text-[9px] sm:text-[11px] print:text-[9px] text-black">
                    <span className="block">{sub.start_time}</span>
                    <span className="block text-gray-400">—</span>
                    <span className="block">{sub.end_time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Signatures ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-8 sm:gap-20 mt-8 sm:mt-10 print:mt-5 px-2 sm:px-4 print:px-2">
          <div className="text-center">
            <div className="border-b-2 border-black h-8 sm:h-10 print:h-7 mb-1" />
            <p className="text-[8px] sm:text-[10px] print:text-[9px] font-black uppercase text-black tracking-tighter">
              Candidate's Signature
            </p>
          </div>
          <div className="text-center">
            <div className="border-b-2 border-black h-8 sm:h-10 print:h-7 mb-1 flex items-center justify-center opacity-10">
              <span className="font-serif italic text-[10px]">
                University Seal
              </span>
            </div>
            <p className="text-[8px] sm:text-[10px] print:text-[9px] font-black uppercase text-black tracking-tighter">
              Controller of Examination
            </p>
          </div>
        </div>

        {/* ── System Footer ────────────────────────────────────── */}
        <div className="mt-4 sm:mt-6 print:mt-3 pt-3 print:pt-2 border-t border-gray-200 flex flex-col sm:flex-row print:flex-row justify-between gap-1 text-[7px] sm:text-[8px] print:text-[7px] font-bold text-gray-500 uppercase tracking-widest">
          <span>Generated On: {new Date().toLocaleString()}</span>
          <span>Verification URL: www.aryavartuniversity.ac.in</span>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight = false }) {
  return (
    <div className="grid grid-cols-2 gap-2 items-start">
      <span className="text-[9px] sm:text-[10px] print:text-[9px] uppercase font-bold text-gray-500 tracking-tight pt-0.5">
        {label}
      </span>
      <span
        className={`text-black uppercase break-words border-b border-gray-100
        ${
          highlight
            ? "text-sm sm:text-base print:text-sm font-black"
            : "text-[10px] sm:text-xs print:text-[10px] font-black"
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}
