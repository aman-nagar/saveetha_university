// src/components/students/StudentAdmitCard.jsx
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getAdmitCard } from "@/api/students/studentDashboardApi";
import { Link } from "react-router-dom";
import LoadingFallback from "../ui/LoadingFallback";
import { FiUser } from "react-icons/fi";
import { formatTimeAMPM, formatExamDate } from "@/utils/formatters";

const StudentAdmitCard = () => {
  const { studentData } = useAuth();
  const [admitCardData, setAdmitCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(admitCardData);
  useEffect(() => {
    const fetchAdmitCard = async () => {
      try {
        setLoading(true);
        const data = await getAdmitCard();
        setAdmitCardData(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch admit card");
        setAdmitCardData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitCard();
  }, []);

  if (loading) {
    return <LoadingFallback variant="dashboard" />;
  }

  if (!studentData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-surface rounded-2xl shadow-xl p-8 max-w-md text-center border border-border">
          <div className="text-5xl mb-4">🪪</div>
          <p className="text-text text-lg font-medium">
            No student data available
          </p>
        </div>
      </div>
    );
  }

  if (error && !admitCardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-surface rounded-2xl shadow-xl p-8 max-w-lg text-center border border-border">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-text mb-2">
            Admit Card Not Generated
          </h2>
          <p className="text-muted mb-6 leading-relaxed text-sm">
            Your admit card has not been generated yet. Please contact the
            administration office or check back later.
          </p>
          <Link
            to="/student-dashboard"
            className="inline-block px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl no-underline transition-all active:scale-95"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (
    !admitCardData ||
    !admitCardData.subjects ||
    admitCardData.subjects.length === 0
  ) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-surface rounded-2xl shadow-xl p-8 max-w-lg text-center border border-border">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-xl font-bold text-text mb-2">
            Admit Card Not Yet Available
          </h2>
          <p className="text-muted mb-6 leading-relaxed text-sm">
            Your exam schedule has not been finalized. Please check back after
            the schedule is announced.
          </p>
          <Link
            to="/student-dashboard"
            className="inline-block px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl no-underline transition-all active:scale-95"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admit-card-print-root w-full max-w-[210mm] mx-auto bg-white p-3 sm:p-10 print:p-0">
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 8mm; }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body * { visibility: hidden !important; }
          .admit-card-print-root,
          .admit-card-print-root * { visibility: visible !important; }
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
            Saveetha Amaravati University
          </h1>
          <div className="inline-block bg-black text-white px-6 sm:px-10 py-1.5 print:py-1 text-sm sm:text-xl print:text-sm font-bold tracking-widest rounded-sm">
            ADMIT CARD
          </div>
          <p className="mt-2 print:mt-1 text-xs font-semibold text-gray-800">
            Session: {admitCardData.session || "2025-26"} |{" "}
            {admitCardData.duration_type || "Semester"}{" "}
            {admitCardData.duration || "1"}
          </p>
        </div>

        {/* ── Info + Photo ─────────────────────────────────────── */}
        <div className="flex flex-row items-start gap-3 sm:gap-5 mb-5 print:mb-3 px-1 sm:px-2">
          <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-x-4 gap-y-2 print:gap-y-1">
            <InfoRow
              label="Enrollment Number"
              value={admitCardData.enrollment_no}
            />
            <InfoRow label="Roll No." value={admitCardData.roll_number} />
            <InfoRow
              label="Candidate Name"
              value={admitCardData.candidate_name}
            />
            <InfoRow
              label="Contact Number"
              value={admitCardData.contact_number}
            />
            <InfoRow label="Father's Name" value={admitCardData.father_name} />
            <InfoRow label="Stream" value={studentData.stream_name || "N/A"} />
            <InfoRow label="Mother's Name" value={admitCardData.mother_name} />
          </div>

          <div className="flex-shrink-0 w-20 h-24 sm:w-28 sm:h-36 print:w-24 print:h-32 self-start border-2 border-black bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
            {admitCardData.photo ? (
              <img
                src={admitCardData.photo}
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
              {admitCardData.subjects?.map((sub, i) => (
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
                  {/* ✅ FORMATTED DATE */}
                  <td className="border-2 border-black py-2 print:py-1 px-1 text-center font-bold text-[9px] sm:text-[11px] print:text-[9px] text-black">
                    {formatExamDate(sub.exam_date)}
                  </td>
                  {/* ✅ FORMATTED TIME (AM/PM) */}
                  <td className="border-2 border-black py-2 print:py-1 px-1 text-center font-black text-[9px] sm:text-[11px] print:text-[9px] text-black">
                    <span className="block">
                      {formatTimeAMPM(sub.start_time)}
                    </span>
                    <span className="block text-gray-400">—</span>
                    <span className="block">
                      {formatTimeAMPM(sub.end_time)}
                    </span>
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
      </div>
    </div>
  );
};

export default StudentAdmitCard;

function InfoRow({ label, value, highlight = false }) {
  return (
    <div className="grid grid-cols-2 gap-2 items-start">
      <span className="text-[9px] sm:text-[10px] print:text-[9px] uppercase font-bold text-gray-500 tracking-tight pt-0.5">
        {label}
      </span>
      <span
        className={`text-black uppercase break-words border-b border-gray-100 ${highlight ? "text-sm sm:text-base print:text-sm font-black" : "text-[10px] sm:text-xs print:text-[10px] font-black"}`}
      >
        {value || "—"}
      </span>
    </div>
  );
}
