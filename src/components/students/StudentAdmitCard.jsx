// src/components/students/StudentAdmitCard.jsx
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getAdmitCard } from "@/api/students/studentDashboardApi";
import { Link } from "react-router-dom";
import LoadingFallback from "../ui/LoadingFallback";
import html2pdf from "html2pdf.js";
import { formatTimeAMPM, formatExamDate } from "@/utils/formatters";

const StudentAdmitCard = () => {
  const { studentData } = useAuth();
  const [admitCardData, setAdmitCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDownloadPDF = async () => {
    if (!admitCardData) return;

    const element = document.createElement("div");
    // Using explicit inline styles for PDF to match the UI layout exactly and avoid CSS issues
    element.innerHTML = `
      <div style="width: 210mm; padding: 10mm; background: #ffffff; font-family: Arial, sans-serif; color: #000000;">
        <div style="border: 4px border-style: double; border-width: 4px; border-style: double; border-color: #000000; padding: 15px;">
          
          <div style="text-align: center; border-bottom: 2px solid #000000; padding-bottom: 12px; margin-bottom: 16px;">
            <h1 style="font-size: 24px; font-family: serif; font-weight: 900; text-transform: uppercase; margin: 0 0 8px 0;">Saveetha Amaravati University</h1>
            <div style="display: inline-block; color: #000000; padding: 6px 40px; font-size: 14px; font-weight: bold; border-radius: 2px; letter-spacing: 2px;">ADMIT CARD</div>
            <p style="margin-top: 8px; font-size: 11px; font-weight: 600;">
              Session: ${admitCardData.session || "2025-26"} | ${admitCardData.duration_type || "Semester"} ${admitCardData.duration || "1"}
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              ${[
                ["Enrollment Number", admitCardData.enrollment_no],
                ["Roll No.", admitCardData.roll_number],
                ["Candidate Name", admitCardData.candidate_name],
                ["Contact Number", admitCardData.contact_number],
                ["Father's Name", admitCardData.father_name],
                ["Stream", studentData?.stream_name || "N/A"],
                ["Mother's Name", admitCardData.mother_name],
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
                ${admitCardData.subjects
                  ?.map(
                    (sub, i) => `
                  <tr>
                    <td style="border: 2px solid #000000; padding: 5px; text-align: center; font-weight: bold; font-size: 9px; color: #000000;">${i + 1}</td>
                    <td style="border: 2px solid #000000; padding: 5px; font-size: 9px; text-transform: uppercase; color: #000000;">
                      <span style="display: block; color: #666666; font-weight: bold; font-size: 8px;">[${sub.subject_code}]</span>
                      <span style="font-weight: 900;">${sub.subject_name}</span>
                    </td>
                    <td style="border: 2px solid #000000; padding: 5px; text-align: center; font-weight: bold; font-size: 9px; color: #000000;">${formatExamDate(sub.exam_date)}</td>
                    <td style="border: 2px solid #000000; padding: 5px; text-align: center; font-weight: 900; font-size: 9px; color: #000000;">
                      ${formatTimeAMPM(sub.start_time)} — ${formatTimeAMPM(sub.end_time)}
                    </td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 50px; padding: 0 10px;">
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
      filename: `AdmitCard_${admitCardData.enrollment_no}.pdf`,
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

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

  if (loading) return <LoadingFallback variant="dashboard" />;

  if (error || !admitCardData || !admitCardData.subjects?.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] font-sans">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 max-w-[450px]">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-bold mb-2">Admit Card Not Available</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your admit card has not been generated yet. Please contact
            administration.
          </p>
          <Link
            to="/student-dashboard"
            className="px-5 py-2.5 bg-black text-white rounded-xl font-bold transition-all hover:bg-gray-900"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white p-3 sm:p-10 print:p-0">
      <div className="mb-4 flex justify-end gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition-all"
        >
          Print Card
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all"
        >
          Download PDF
        </button>
      </div>

      <div className="admit-card-print-root">
        <style>{`
          @media print {
            @page { size: A4 portrait; margin: 8mm; }
            html, body { margin: 0 !important; padding: 0 !important; height: auto !important; }
            body * { visibility: hidden !important; }
            .admit-card-print-root, .admit-card-print-root * { visibility: visible !important; }
            .admit-card-print-root { position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; margin: 0 !important; }
          }
        `}</style>

        {/* --- Screen View --- */}
        <div
          style={{
            border: "4px double #000",
            padding: "16px",
            color: "#000",
            background: "#fff",
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderBottom: "2px solid #000",
              paddingBottom: "12px",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "900",
                textTransform: "uppercase",
                margin: "0",
                fontFamily: "serif",
              }}
            >
              Saveetha Amaravati University
            </h1>
            <div
              style={{
                display: "inline-block",
                color: "#000000",
                padding: "6px 40px",
                margin: "12px 0",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              ADMIT CARD
            </div>
            <p style={{ fontSize: "11px", fontWeight: "600" }}>
              Session: {admitCardData.session} | {admitCardData.duration_type}{" "}
              {admitCardData.duration}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <InfoRow
              label="Enrollment No"
              value={admitCardData.enrollment_no}
            />
            <InfoRow label="Roll No" value={admitCardData.roll_number} />
            <InfoRow
              label="Candidate Name"
              value={admitCardData.candidate_name}
            />
            <InfoRow label="Contact" value={admitCardData.contact_number} />
            <InfoRow label="Father's Name" value={admitCardData.father_name} />
            <InfoRow label="Stream" value={studentData?.stream_name} />
            <InfoRow label="Mother's Name" value={admitCardData.mother_name} />
          </div>

          <div
            style={{
              color: "#000000",
              textAlign: "center",
              padding: "4px",
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Paper Names & Schedule
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "2px solid #000",
            }}
          >
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                <th
                  style={{
                    border: "2px solid #000",
                    padding: "6px",
                    fontSize: "10px",
                    width: "8%",
                    textAlign: "center",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    border: "2px solid #000",
                    padding: "6px",
                    fontSize: "10px",
                    textAlign: "left",
                    width: "42%",
                  }}
                >
                  Subject Code & Name
                </th>
                <th
                  style={{
                    border: "2px solid #000",
                    padding: "6px",
                    fontSize: "10px",
                    width: "25%",
                    textAlign: "center",
                  }}
                >
                  Exam Date
                </th>
                <th
                  style={{
                    border: "2px solid #000",
                    padding: "6px",
                    fontSize: "10px",
                    width: "25%",
                    textAlign: "center",
                  }}
                >
                  Timing
                </th>
              </tr>
            </thead>
            <tbody>
              {admitCardData.subjects.map((sub, i) => (
                <tr key={i}>
                  <td
                    style={{
                      border: "2px solid #000",
                      padding: "6px",
                      textAlign: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {i + 1}
                  </td>
                  <td
                    style={{
                      border: "2px solid #000",
                      padding: "6px",
                      fontSize: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "#666",
                        fontWeight: "bold",
                        fontSize: "9px",
                      }}
                    >
                      [{sub.subject_code}]
                    </span>
                    <br />
                    <span
                      style={{ fontWeight: "900", textTransform: "uppercase" }}
                    >
                      {sub.subject_name}
                    </span>
                  </td>
                  <td
                    style={{
                      border: "2px solid #000",
                      padding: "6px",
                      textAlign: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {formatExamDate(sub.exam_date)}
                  </td>
                  <td
                    style={{
                      border: "2px solid #000",
                      padding: "6px",
                      textAlign: "center",
                      fontSize: "10px",
                      fontWeight: "900",
                    }}
                  >
                    {formatTimeAMPM(sub.start_time)} —{" "}
                    {formatTimeAMPM(sub.end_time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40px",
              padding: "0 8px",
            }}
          >
            <div style={{ textAlign: "center", width: "40%" }}>
              <div
                style={{
                  borderBottom: "2px solid #000",
                  height: "35px",
                  marginBottom: "5px",
                }}
              ></div>
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  margin: "0",
                }}
              >
                Candidate's Signature
              </p>
            </div>
            <div style={{ textAlign: "center", width: "40%" }}>
              <div
                style={{
                  borderBottom: "2px solid #000",
                  height: "35px",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontStyle: "italic",
                    fontSize: "9px",
                    opacity: 0.2,
                    fontFamily: "serif",
                  }}
                >
                  University Seal
                </span>
              </div>
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  margin: "0",
                }}
              >
                Controller of Examination
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      borderBottom: "1px solid #eee",
      paddingBottom: "4px",
    }}
  >
    <span
      style={{
        fontSize: "8px",
        color: "#666",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: "11px",
        fontWeight: "900",
        textTransform: "uppercase",
      }}
    >
      {value || "—"}
    </span>
  </div>
);

export default StudentAdmitCard;
