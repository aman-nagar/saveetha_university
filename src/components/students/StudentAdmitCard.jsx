// src/components/students/StudentAdmitCard.jsx
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { getAdmitCard } from "@/api/students/studentDashboardApi";
import LoadingFallback from "../ui/LoadingFallback";
import html2pdf from "html2pdf.js";

const StudentAdmitCard = () => {
  const { studentData } = useAuth();
  const [admitCardData, setAdmitCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);

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

  // If admit card not generated, show message
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
          <a
            href="/student-dashboard"
            className="inline-block px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl no-underline transition-all active:scale-95"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  // If no subjects data, show message
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
          <a
            href="/student-dashboard"
            className="inline-block px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl no-underline transition-all active:scale-95"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const element = cardRef.current;
    const opt = {
      margin: 5,
      filename: `${studentData.candidate_name}_Admit_Card.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      },
      jsPDF: {
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      },
      pagebreak: { avoid: ["div.card-content"] },
    };

    try {
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Error generating PDF. Please try again or use the print option.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen p-4 pt-6 pb-8">
      <style>{`
        @media print {
          body { margin: 0; padding: 0; background: white; }
          .print-hide { display: none !important; }
          .card-container { max-width: 100%; page-break-after: avoid; }
          .admit-card { margin: 0; page-break-inside: avoid; }
        }
        @media (min-width: 768px) {
          .subject-table-desktop { display: block !important; }
          .subject-cards-mobile { display: none !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="print-hide mb-6">
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <span>📋</span> Admit Card
          </h1>
          <p className="text-muted text-sm mt-1">
            Official examination entry document with subject details
          </p>
        </div>

        {/* Admit Card */}
        <div ref={cardRef} className="card-container">
          <div
            className="admit-card"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "1.25rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              overflow: "hidden",
              border: "2px solid #e2e8f0",
            }}
          >
            {/* Card Header with Gradient Pattern */}
            <div
              style={{
                padding: "1.75rem 2rem",
                color: "white",
                background:
                  "linear-gradient(135deg, #0b1f4b 0%, #162d6b 40%, #9e2f2f 100%)",
                position: "relative",
              }}
            >
              {/* Subtle Pattern Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.05,
                  backgroundImage: `
                    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px),
                    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)
                  `,
                  backgroundSize: "20px 20px",
                  pointerEvents: "none",
                }}
              />
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  margin: "0",
                  position: "relative",
                  zIndex: 1,
                  letterSpacing: "0.05em",
                }}
              >
                ADMIT CARD
              </h2>
              <p
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.85,
                  margin: "0.4rem 0 0 0",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Examination Entry Document
              </p>
            </div>

            {/* Card Content */}
            <div
              style={{
                padding: "1.75rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Student Info Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "1.25rem",
                  paddingBottom: "1.25rem",
                  borderBottom: "2px solid #e2e8f0",
                }}
              >
                {[
                  { label: "Name", value: studentData.candidate_name },
                  { label: "Enrollment No", value: studentData.enrollment_no },
                  { label: "Course", value: studentData.course },
                  { label: "Stream", value: studentData.stream },
                  {
                    label: "Session",
                    value: admitCardData?.session || "N/A",
                  },
                  {
                    label: "Roll Number",
                    value: admitCardData?.roll_number || "N/A",
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                        color: "#94a3b8",
                        margin: "0 0 0.3rem 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "bold",
                        color: "#0f172a",
                        margin: "0",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Examination Schedule */}
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "#0f172a",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>📅</span> Examination Schedule
                </h3>

                {/* Desktop Table */}
                <div
                  className="subject-table-desktop"
                  style={{ display: "none" }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      borderRadius: "0.5rem",
                      overflow: "hidden",
                    }}
                  >
                    <thead>
                      <tr
                        style={{ backgroundColor: "#0b1f4b", color: "white" }}
                      >
                        <th
                          style={{
                            padding: "0.7rem 0.75rem",
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          S.No.
                        </th>
                        <th
                          style={{
                            padding: "0.7rem 0.75rem",
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          Code
                        </th>
                        <th
                          style={{
                            padding: "0.7rem 0.75rem",
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          Subject Name
                        </th>
                        <th
                          style={{
                            padding: "0.7rem 0.75rem",
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          Date
                        </th>
                        <th
                          style={{
                            padding: "0.7rem 0.75rem",
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {admitCardData?.subjects?.map((subject, idx) => (
                        <tr
                          key={idx}
                          style={{
                            borderBottom: "1px solid #e2e8f0",
                            backgroundColor:
                              idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                          }}
                        >
                          <td
                            style={{
                              padding: "0.7rem 0.75rem",
                              color: "#0f172a",
                              fontWeight: "600",
                              fontSize: "0.85rem",
                            }}
                          >
                            {idx + 1}
                          </td>
                          <td
                            style={{
                              padding: "0.7rem 0.75rem",
                              color: "#0f172a",
                              fontFamily: "monospace",
                              fontSize: "0.85rem",
                            }}
                          >
                            {subject.subject_code}
                          </td>
                          <td
                            style={{
                              padding: "0.7rem 0.75rem",
                              color: "#0f172a",
                              fontSize: "0.85rem",
                            }}
                          >
                            {subject.subject_name}
                          </td>
                          <td
                            style={{
                              padding: "0.7rem 0.75rem",
                              color: "#0f172a",
                              fontWeight: "600",
                              fontSize: "0.85rem",
                            }}
                          >
                            {new Date(subject.exam_date).toLocaleDateString()}
                          </td>
                          <td
                            style={{
                              padding: "0.7rem 0.75rem",
                              color: "#0f172a",
                              fontSize: "0.85rem",
                            }}
                          >
                            {subject.start_time} - {subject.end_time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div
                  className="subject-cards-mobile"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0.75rem",
                  }}
                >
                  {admitCardData?.subjects?.map((subject, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderLeft: "4px solid #0b1f4b",
                        borderRadius: "0.5rem",
                        padding: "0.875rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.5rem",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            backgroundColor: "#0b1f4b",
                            color: "white",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "0.25rem",
                          }}
                        >
                          #{idx + 1}
                        </span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            backgroundColor: "#c9a227",
                            color: "white",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "0.25rem",
                          }}
                        >
                          {subject.subject_code}
                        </span>
                      </div>
                      <p
                        style={{
                          fontWeight: "bold",
                          color: "#0f172a",
                          margin: "0 0 0.5rem 0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {subject.subject_name}
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.75rem",
                          fontSize: "0.8rem",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              color: "#94a3b8",
                              fontWeight: "600",
                              margin: "0 0 0.15rem 0",
                              fontSize: "0.65rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Exam Date
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "#0f172a",
                              margin: "0",
                            }}
                          >
                            {new Date(subject.exam_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              color: "#94a3b8",
                              fontWeight: "600",
                              margin: "0 0 0.15rem 0",
                              fontSize: "0.65rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Time
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "#0f172a",
                              margin: "0",
                            }}
                          >
                            {subject.start_time} - {subject.end_time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Instructions */}
              <div
                style={{
                  backgroundColor: "#fffbeb",
                  borderLeft: "4px solid #f59e0b",
                  padding: "1rem 1.25rem",
                  borderRadius: "0 0.5rem 0.5rem 0",
                }}
              >
                <h4
                  style={{
                    fontWeight: "bold",
                    color: "#78350f",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    margin: "0 0 0.5rem 0",
                    fontSize: "0.9rem",
                  }}
                >
                  <span>⚠️</span> Important Instructions
                </h4>
                <ul
                  style={{
                    color: "#92400e",
                    fontSize: "0.8rem",
                    margin: "0",
                    paddingLeft: "1.25rem",
                    lineHeight: "1.6",
                  }}
                >
                  <li>Carry this admit card to the examination center</li>
                  <li>Report 15 minutes before the examination time</li>
                  <li>
                    Bring valid identification and written admission letter
                  </li>
                  <li>Mobile phones and electronic devices are not allowed</li>
                  <li>Examination timing is printed above - be punctual</li>
                </ul>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.75rem",
                  borderTop: "2px solid #e2e8f0",
                  fontSize: "0.7rem",
                  color: "#94a3b8",
                }}
              >
                <span>Issued Date: {new Date().toLocaleDateString()}</span>
                <span>Valid for Session: {admitCardData?.session}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="print-hide flex flex-wrap gap-3 justify-center mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg transition-all active:scale-95 border-none cursor-pointer"
          >
            <span>🖨️</span>
            <span>Print Card</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg transition-all active:scale-95 border-none cursor-pointer"
          >
            <span>📥</span>
            <span>Download PDF</span>
          </button>
          <a
            href="/student-dashboard"
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg transition-all active:scale-95 no-underline"
          >
            <span>←</span>
            <span>Back</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmitCard;
