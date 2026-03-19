// src/components/students/StudentIDCard.jsx
import { useAuth } from "@/context/AuthContext";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { getIDCardFormat } from "@/api/students/studentDashboardApi";

const StudentIDCard = () => {
  const { studentData } = useAuth();
  const cardRef = useRef(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [idCardBg, setIdCardBg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIDCardFormat = async () => {
      try {
        setLoading(true);
        const data = await getIDCardFormat();
        const bgUrl = data?.image_url || data?.url || data;
        setIdCardBg(bgUrl);
      } catch (err) {
        console.error("Error fetching ID card format:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIDCardFormat();
    console.log(studentData);
  }, []);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-surface rounded-2xl shadow-xl p-8 max-w-md text-center border border-border">
          <div className="text-5xl mb-4 animate-bounce">⏳</div>
          <p className="text-text text-lg font-medium">Loading ID Card...</p>
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
    address,
  } = studentData;

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const element = cardRef.current;
    const opt = {
      margin: 0,
      filename: `${candidate_name}_ID_Card.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: [152.4, 95.25], orientation: "landscape" },
    };
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      alert("Error generating PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen p-4 pt-6 pb-8 bg-gray-50">
      <style>{`@media print { .print-hide { display: none !important; } body { background: white; } }`}</style>

      <div className="max-w-4xl mx-auto">
        <div className="print-hide mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Student ID Card</h1>
          <p className="text-gray-500 text-sm">
            Download or print your official University identity card
          </p>
        </div>

        {/* ID Card Wrapper */}
        <div
          ref={cardRef}
          className="relative w-[576px] h-[360px] mx-auto overflow-hidden shadow-2xl rounded-[15px] bg-no-repeat bg-cover text-black"
          style={{
            backgroundImage: `url(${idCardBg})`,
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          {/* 1. Profile Photo */}
          <div className="absolute top-[88px] right-[19px] w-[71px] h-[69px] border-2 border-[#0b1f4b] rounded-[5px] bg-white overflow-hidden flex items-center justify-center">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-4xl">👤</div>
            )}
          </div>

          {/* 2. Main Details Content */}
          <div className="absolute text-secondary top-[141px] left-[305px] w-[260px] flex flex-col drop-shadow-sm">
            {/* Row 1: Enrollment No (Fixed height 22px) */}
            <div className="h-[22px] flex items-center">
              <div className="text-[12px] font-bold">{enrollment_no || ""}</div>
            </div>

            {/* Row 2: Name (Fixed height 22px) */}
            <div className="h-[22px] flex items-center">
              <div className="text-[12px] font-bold uppercase leading-tight tracking-tight">
                {candidate_name || ""}
              </div>
            </div>

            {/* Row 3: Father's Name (Fixed height 22px) */}
            <div className="h-[22px] flex items-center">
              <div className="text-[12px] font-bold truncate">
                {father_name || ""}
              </div>
            </div>

            {/* Row 4: Course (Fixed height 22px) */}
            <div className="h-[22px] flex items-center">
              <div className="text-[12px] font-bold truncate">
                {course || ""}
              </div>
            </div>

            {/* Row 5: Stream (Fixed height 22px) */}
            <div className="h-[22px] flex items-center">
              <div className="text-[12px] font-bold truncate">
                {stream || ""}
              </div>
            </div>

            {/* Row 6: Address (Multiline Support) */}
            <div className="mt-1 flex items-start">
              <div className="text-[10px] font-bold leading-tight break-words line-clamp-2">
                {address || ""}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="print-hide flex gap-4 justify-center mt-10">
          <button
            onClick={() => window.print()}
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg active:scale-95"
          >
            🖨️ Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg active:scale-95"
          >
            {isGeneratingPdf ? "Generating..." : "📥 Download PDF"}
          </button>
          <Link
            to="/student-dashboard"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold no-underline hover:bg-black transition-all shadow-lg active:scale-95"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;
