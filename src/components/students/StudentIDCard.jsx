// src/components/students/StudentIDCard.jsx
import { useAuth } from "@/context/AuthContext";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

const StudentIDCard = () => {
  const { studentData } = useAuth();
  const cardRef = useRef(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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

  const {
    enrollment_no,
    candidate_name,
    father_name,
    photo,
    dob,
    course,
    stream,
  } = studentData;

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    // Allow React to re-render and hide the photo before capturing
    await new Promise((resolve) => setTimeout(resolve, 200));

    const element = cardRef.current;
    const opt = {
      margin: 10,
      filename: `${candidate_name}_ID_Card.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      },
      jsPDF: {
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      },
      pagebreak: { avoid: ["div.card-content"] },
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Error generating PDF. Please try again or use the print option.");
    } finally {
      setIsGeneratingPdf(false);
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
          .id-card { margin: 0; padding: 0; page-break-inside: avoid; }
          .photo-screen-only { display: none !important; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="print-hide mb-6">
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <span>🪪</span> Student ID Card
          </h1>
          <p className="text-muted text-sm mt-1">
            Your official student identification card
          </p>
        </div>

        {/* ID Card */}
        <div ref={cardRef} className="card-container">
          <div
            className="id-card"
            style={{
              borderRadius: "1.25rem",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              border: "2px solid #e2e8f0",
              maxWidth: "38rem",
              margin: "0 auto",
            }}
          >
            {/* Top Section - Gradient Pattern Background with Centered Photo */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #0b1f4b 0%, #162d6b 30%, #1a3578 50%, #7a2424 70%, #9e2f2f 100%)",
                position: "relative",
                padding: "2rem 2rem 2.5rem",
                textAlign: "center",
                minHeight: isGeneratingPdf ? "120px" : "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Decorative Geometric Pattern Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.06,
                  backgroundImage: `
                    repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.5) 8px, rgba(255,255,255,0.5) 9px),
                    repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.5) 8px, rgba(255,255,255,0.5) 9px),
                    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px, 24px 24px, 30px 30px, 30px 30px",
                  pointerEvents: "none",
                }}
              />

              {/* Secondary Pattern Layer */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.04,
                  backgroundImage: `
                    linear-gradient(60deg, transparent 40%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.3) 41%, transparent 41%),
                    linear-gradient(-60deg, transparent 40%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.3) 41%, transparent 41%)
                  `,
                  backgroundSize: "50px 50px",
                  pointerEvents: "none",
                }}
              />

              {/* Title */}
              <p
                style={{
                  fontSize: "0.6rem",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.65)",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  marginBottom: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Official Document
              </p>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "white",
                  margin: "0 0 1.25rem 0",
                  letterSpacing: "0.08em",
                  position: "relative",
                  zIndex: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                STUDENT IDENTITY CARD
              </h2>

              {/* Centered Profile Picture - Hidden during PDF generation and print */}
              {!isGeneratingPdf && (
                <div
                  className="photo-screen-only"
                  style={{
                    width: "100px",
                    height: "125px",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    border: "3px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt={candidate_name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "2.5rem", color: "#94a3b8" }}>
                      👤
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Section - Details */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "1.5rem 2rem 1.75rem",
              }}
            >
              {/* Name & Enrollment */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "1.25rem",
                  paddingBottom: "1rem",
                  borderBottom: "2px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#0f172a",
                    margin: "0",
                  }}
                >
                  {candidate_name}
                </h3>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    margin: "0.3rem 0 0",
                    fontWeight: "500",
                  }}
                >
                  Enrollment No: {enrollment_no}
                </p>
              </div>

              {/* Info Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  fontSize: "0.85rem",
                }}
              >
                {[
                  { label: "Father's Name", value: father_name },
                  {
                    label: "Date of Birth",
                    value: new Date(dob).toLocaleDateString(),
                  },
                  { label: "Course", value: course },
                  { label: "Stream", value: stream },
                ].map((item, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: "700",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        margin: "0 0 0.2rem",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.75rem",
                  marginTop: "1rem",
                  borderTop: "1px solid #e2e8f0",
                  fontSize: "0.65rem",
                  color: "#94a3b8",
                }}
              >
                <span>Valid until further notice</span>
                <span>Issued: {new Date().toLocaleDateString()}</span>
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
          <Link
            to="/student-dashboard"
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg transition-all active:scale-95 no-underline"
          >
            <span>←</span>
            <span>Back</span>
          </Link>
        </div>

        {/* Info Section */}
        <div className="print-hide mt-8 bg-surface rounded-xl p-5 border border-border max-w-[38rem] mx-auto">
          <h3 className="font-bold text-text mb-3 flex items-center gap-2 text-sm">
            <span>ℹ️</span> About Your ID Card
          </h3>
          <ul className="text-muted text-xs space-y-1.5 list-disc pl-5 leading-relaxed">
            <li>This is your official student identification document</li>
            <li>Keep your ID card safe and present it when required</li>
            <li>
              Profile photo is displayed on screen but excluded from PDF
              downloads
            </li>
            <li>For printing, use A4 paper in landscape mode</li>
            <li>Contact administration if your card is lost or damaged</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;
