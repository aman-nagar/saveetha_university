import { useEffect } from "react";
import { FiUser, FiPrinter } from "react-icons/fi";

export default function AdmitCardDetails({ data, onClose }) {
  if (!data) return null;

  // 1. ESC Key Shortcut to close
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white p-4 sm:p-10 shadow-none border border-gray-200 print:p-0 print:border-none">
      {/* 2. Official Frame (Aryavart International University style) */}
      <div className="border-4 border-double border-black p-4 print:border-2">
        {/* Header Section */}
        <div className="text-center mb-8 border-b-2 border-black pb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-black uppercase mb-3">
            Aryavart International University
          </h1>
          <div className="inline-block bg-black text-white px-10 py-2 text-xl font-bold tracking-widest rounded-sm">
            ADMIT CARD
          </div>
          <p className="mt-3 text-sm font-semibold text-gray-800">
            Session: {data.session || "2025-26"} |{" "}
            {data.duration_type || "Semester"} {data.duration || "1"}
          </p>
        </div>

        {/* 3. Information Grid (Fixed Overlapping) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 px-2">
          {/* Personal Details */}
          <div className="md:col-span-3 space-y-3.5">
            <InfoRow label="Enrollment Number" value={data.enrollment_no} />
            <InfoRow
              label="Candidate Name"
              value={data.candidate_name}
              highlight
            />
            <InfoRow label="Father's Name" value={data.father_name} />
            <InfoRow label="Mother's Name" value={data.mother_name} />
            <InfoRow label="Stream" value={data.duration_type} />
            <InfoRow label="Contact Number" value={data.contact_number} />
          </div>

          {/* Academic/Photo Side */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="text-right w-full space-y-2">
              <InfoRow label="Roll No." value={data.roll_number} vertical />
            </div>

            {/* 🔥 PHOTO ATTACHED HERE */}
            <div className="border-2 border-black w-32 h-40 bg-gray-50 flex items-center justify-center relative shadow-inner overflow-hidden">
              {data.photo ? (
                <img 
                  src={data.photo} 
                  alt="Student" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <>
                  <FiUser className="w-16 h-16 text-gray-200" />
                  <span className="absolute bottom-2 text-[8px] uppercase text-gray-400 font-bold">
                    No Photo Found
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 4. Schedule Table */}
        <div className="mb-8">
          <div className="bg-black text-white text-center py-2.5">
            <h3 className="font-bold text-sm tracking-widest uppercase">
              Paper Names & Schedule
            </h3>
          </div>

          <table className="w-full border-collapse border-2 border-black text-[12px] sm:text-[13px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-black py-3 px-2 font-black text-black w-10">
                  #
                </th>
                <th className="border-2 border-black py-3 px-4 font-black text-black text-left">
                  Subject Code & Name
                </th>
                <th className="border-2 border-black py-3 px-4 font-black text-black w-32">
                  Exam Date
                </th>
                <th className="border-2 border-black py-3 px-4 font-black text-black w-48 text-center">
                  Timing (Start — End)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.subjects?.map((sub, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="border-2 border-black py-3 px-2 text-center font-bold">
                    {i + 1}
                  </td>
                  <td className="border-2 border-black py-3 px-4 font-bold uppercase text-black">
                    <span className="text-gray-500 mr-2">
                      [{sub.subject_code}]
                    </span>{" "}
                    {sub.subject_name}
                  </td>
                  <td className="border-2 border-black py-3 px-4 text-center font-bold text-black">
                    {sub.exam_date}
                  </td>
                  <td className="border-2 border-black py-3 px-4 text-center font-black text-black">
                    {sub.start_time} — {sub.end_time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. Footer / Signatures Section */}
        <div className="grid grid-cols-2 gap-20 mt-16 px-4">
          <div className="text-center">
            <div className="border-b-2 border-black h-12 mb-2"></div>
            <p className="text-[10px] font-black uppercase text-black tracking-tighter">
              Candidate's Signature
            </p>
          </div>
          <div className="text-center">
            <div className="border-b-2 border-black h-12 mb-2 flex items-center justify-center opacity-10">
              <span className="font-serif italic text-xs">University Seal</span>
            </div>
            <p className="text-[10px] font-black uppercase text-black tracking-tighter">
              Controller of Examination
            </p>
          </div>
        </div>

        {/* System Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between text-[8px] font-bold text-gray-500 uppercase tracking-widest">
          <span>Generated On: {new Date().toLocaleString()}</span>
          <span>Verification URL: www.aryavartuniversity.ac.in</span>
        </div>
      </div>

      {/* 6. Floating Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 print:hidden z-[999]">
        <button
          onClick={handlePrint}
          className="bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all group"
          title="Print or Save as PDF"
        >
          <FiPrinter className="w-6 h-6 group-hover:animate-bounce" />
        </button>
        <button
          onClick={onClose}
          className="bg-red-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all"
          title="Close (ESC)"
        >
          <span className="text-sm font-bold">ESC</span>
        </button>
      </div>

      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { visibility: hidden; background: white; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print-none { display: none !important; }
          div[role="dialog"] { border: none !important; box-shadow: none !important; background: white !important; }
          .w-full { visibility: visible; position: absolute; left: 0; top: 0; }
        }
      `}</style>
    </div>
  );
}

// 7. Grid-based InfoRow (Solves Overlapping)
function InfoRow({ label, value, highlight = false, vertical = false }) {
  return (
    <div
      className={`grid ${vertical ? "grid-cols-1 gap-1" : "grid-cols-2 gap-4"} items-center`}
    >
      <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tight shrink-0">
        {label}
      </span>
      <span
        className={`text-black uppercase ${highlight ? "text-lg font-black" : "text-xs font-black"} break-words border-b border-gray-100`}
      >
        {value || "—"}
      </span>
    </div>
  );
}