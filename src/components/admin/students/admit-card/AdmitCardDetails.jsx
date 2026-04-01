// src/components/admin/courses/AdmitCardDetails.jsx
import { FiUser, FiDownload } from "react-icons/fi";
import { useState, useEffect } from "react";
import { formatTimeAMPM, formatExamDate } from "../../../../utils/formatters";
import { fetchStreamsById } from "../../../../api/courses/streamApi";
import html2pdf from "html2pdf.js";

export default function AdmitCardDetails({ data }) {
  const [streamName, setStreamName] = useState(null);
  const [loadingStream, setLoadingStream] = useState(false);

  useEffect(() => {
    if (!data?.stream_id) return;

    setLoadingStream(true);
    fetchStreamsById(data.stream_id)
      .then((res) => {
        const name = res.data?.name || res.name;
        setStreamName(name);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch stream:", err);
        setStreamName("Unknown Stream");
      })
      .finally(() => setLoadingStream(false));
  }, [data?.stream_id]);

  const handleDownloadPDF = () => {
    if (!data) return;

    const element = document.createElement("div");
    // Explicit inline styles to ensure the PDF looks exactly like the UI
    element.innerHTML = `
      <div style="width: 210mm; padding: 10mm; background: #ffffff; font-family: Arial, sans-serif; color: #000000;">
        <div style="border: 4px border-style: double; border-width: 4px; border-style: double; border-color: #000000; padding: 15px;">
          
          <div style="text-align: center; border-bottom: 2px solid #000000; padding-bottom: 12px; margin-bottom: 16px;">
            <h1 style="font-size: 24px; font-family: serif; font-weight: 900; text-transform: uppercase; margin: 0 0 8px 0;">Saveetha Amaravati University</h1>
            <div style="display: inline-block; color: #000000; padding: 6px 40px; font-size: 14px; font-weight: bold; border-radius: 2px; letter-spacing: 2px;">ADMIT CARD</div>
            <p style="margin-top: 8px; font-size: 11px; font-weight: 600;">
              Session: ${data.session || "2025-26"} | ${data.duration_type || "Semester"} ${data.duration || "1"}
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              ${[
                ["Enrollment Number", data.enrollment_no],
                ["Roll No.", data.roll_number],
                ["Candidate Name", data.candidate_name],
                ["Contact Number", data.contact_number],
                ["Father's Name", data.father_name],
                ["Stream", streamName || "N/A"],
                ["Mother's Name", data.mother_name],
              ]
                .map(
                  ([label, value]) => `
                <div style="display: flex; flex-direction: column; border-bottom: 1px solid #eeeeee; padding-bottom: 4px;">
                  <span style="font-size: 9px; text-transform: uppercase; font-weight: bold; color: #666666;">${label}</span>
                  <span style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #000000;">${value || "—"}</span>
                </div>
              `,
                )
                .join("")}
          </div>

            <div>
                <div style="
                color: #000000; 
                text-align: center; 
                height: 32px; 
                font-size: 13px; 
                font-weight: bold; 
                text-transform: uppercase; 
                width: 100%;
                ">
                Paper Names & Schedule
            </div>
            <table style="width: 100%; border-collapse: collapse; border: 2px solid #000000; table-layout: fixed;">
               <thead>
                <tr style="background: #f3f4f6;">
                  <th style="border: 2px solid #000000; padding: 5px; font-size: 9px; font-weight: 900; width: 8%; color: #000000;">#</th>
                  <th style="border: 2px solid #000000; padding: 5px; font-size: 9px; font-weight: 900; text-align: left; width: 42%; color: #000000;">Subject Code & Name</th>
                  <th style="border: 2px solid #000000; padding: 5px; font-size: 9px; font-weight: 900; width: 25%; color: #000000;">Exam Date</th>
                  <th style="border: 2px solid #000000; padding: 5px; font-size: 9px; font-weight: 900; width: 25%; color: #000000;">Timing</th>
                </tr>
              </thead>
              <tbody>
                ${data.subjects
                  ?.map(
                    (sub, i) => `
                  <tr>
                    <td style="border: 2px solid #000000; padding: 5px; text-align: center; font-weight: bold; font-size: 9px; color: #000000;">${i + 1}</td>
                    <td style="border: 2px solid #000000; padding: 5px; font-size: 9px; text-transform: uppercase; color: #000000;">
                      <span style="display: block; color: #666666; font-weight: bold; font-size: 8px;">[${sub.subject_code}]</span>
                      <span style="font-weight: 900;">${sub.subject_name}</span>
                    </td>
                    <td style="border: 2px solid #000000; padding: 5px; text-align: center; font-weight: bold; font-size: 9px; color: #000000;">${formatExamDate(sub.exam_date)}</td>
                    <td style="border: 2px solid #000000; padding: 5px; text-align: center; font-weight: bold; font-size: 9px; color: #000000;">
                      ${formatTimeAMPM(sub.start_time)} — ${formatTimeAMPM(sub.end_time)}
                    </td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 60px; padding: 0 10px;">
            <div style="text-align: center; width: 40%;">
              <div style="border-bottom: 2px solid #000000; height: 35px; margin-bottom: 5px;"></div>
              <p style="font-size: 9px; font-weight: 900; text-transform: uppercase; margin: 0; color: #000000;">Candidate's Signature</p>
            </div>
            <div style="text-align: center; width: 40%;">
              <div style="border-bottom: 2px solid #000000; height: 35px; margin-bottom: 5px; display: flex; align-items: center; justify-content: center;">
                <span style="font-family: serif; font-style: italic; font-size: 9px; opacity: 0.2; color: #000000;">University Seal</span>
              </div>
              <p style="font-size: 9px; font-weight: 900; text-transform: uppercase; margin: 0; color: #000000;">Controller of Examination</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const opt = {
      margin: 0,
      filename: `AdmitCard_${data.enrollment_no}.pdf`,
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Action Bar (Visible only on screen) */}
      <div className="flex justify-end print:hidden">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md"
        >
          <FiDownload /> Download Admit Card
        </button>
      </div>

      <div className="admit-card-print-root w-full max-w-[210mm] mx-auto bg-white p-3 sm:p-10 print:p-0">
        <style>{`
          @media print {
            @page { size: A4 portrait; margin: 8mm; }
            html, body { margin: 0 !important; padding: 0 !important; height: auto !important; }
            body * { visibility: hidden !important; }
            .admit-card-print-root, .admit-card-print-root * { visibility: visible !important; }
            .admit-card-print-root { position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; margin: 0 !important; }
          }
        `}</style>

        {/* Outer Frame */}
        <div className="border-4 border-double border-black p-3 sm:p-4 print:p-3">
          {/* Header */}
          <div className="text-center mb-4 border-b-2 border-black pb-3">
            <h1 className="text-xl sm:text-3xl font-serif font-extrabold text-black uppercase mb-2">
              Saveetha Amaravati University
            </h1>
            <div className="inline-block text-black px-6 py-1.5 text-sm sm:text-xl font-bold tracking-widest rounded-sm">
              ADMIT CARD
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-800">
              Session: {data.session || "2025-26"} |{" "}
              {data.duration_type || "Semester"} {data.duration || "1"}
            </p>
          </div>

          {/* Info Section */}
          <div className="mb-5 px-1 sm:px-2">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <InfoRow label="Enrollment Number" value={data.enrollment_no} />
              <InfoRow label="Roll No." value={data.roll_number} />
              <InfoRow
                label="Candidate Name"
                value={data.candidate_name}
                highlight
              />
              <InfoRow label="Contact Number" value={data.contact_number} />
              <InfoRow label="Father's Name" value={data.father_name} />
              <InfoRow
                label="Stream"
                value={loadingStream ? "Loading..." : streamName || "N/A"}
              />
              <InfoRow label="Mother's Name" value={data.mother_name} />
            </div>
          </div>

          {/* Schedule Table */}
          <div className="mb-5">
            <div className=" text-black text-center py-2">
              <h3 className="font-bold text-[10px] sm:text-sm tracking-widest uppercase">
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
                  <th className="border-2 border-black py-2 px-1 font-black text-black text-[9px] sm:text-[11px] text-center">
                    #
                  </th>
                  <th className="border-2 border-black py-2 px-2 font-black text-black text-[9px] sm:text-[11px] text-left">
                    Subject Code & Name
                  </th>
                  <th className="border-2 border-black py-2 px-1 font-black text-black text-[9px] sm:text-[11px] text-center">
                    Exam Date
                  </th>
                  <th className="border-2 border-black py-2 px-1 font-black text-black text-[9px] sm:text-[11px] text-center">
                    Timing
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.subjects?.map((sub, i) => (
                  <tr key={i}>
                    <td className="border-2 border-black py-2 px-1 text-center font-bold text-[9px] sm:text-[11px]">
                      {i + 1}
                    </td>
                    <td className="border-2 border-black py-2 px-2 text-black text-[9px] sm:text-[11px] uppercase">
                      <span className="block font-bold text-gray-500">
                        [{sub.subject_code}]
                      </span>
                      <span className="font-black">{sub.subject_name}</span>
                    </td>
                    <td className="border-2 border-black py-2 px-1 text-center font-bold text-[9px] sm:text-[11px] text-black">
                      {formatExamDate(sub.exam_date)}
                    </td>
                    <td className="border-2 border-black py-2 px-1 text-center font-black text-[9px] sm:text-[11px] text-black">
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

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 sm:gap-20 mt-10 px-2 sm:px-4">
            <div className="text-center">
              <div className="border-b-2 border-black h-10 mb-1" />
              <p className="text-[8px] sm:text-[10px] font-black uppercase text-black tracking-tighter">
                Candidate's Signature
              </p>
            </div>
            <div className="text-center">
              <div className="border-b-2 border-black h-10 mb-1 flex items-center justify-center opacity-10">
                <span className="font-serif italic text-[10px]">
                  University Seal
                </span>
              </div>
              <p className="text-[8px] sm:text-[10px] font-black uppercase text-black tracking-tighter">
                Controller of Examination
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight = false }) {
  return (
    <div className="grid grid-cols-2 gap-2 items-start">
      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500 tracking-tight pt-0.5">
        {label}
      </span>
      <span
        className={`text-black uppercase break-words border-b border-gray-100 ${
          highlight
            ? "text-sm sm:text-base font-black"
            : "text-[10px] sm:text-xs font-black"
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}
