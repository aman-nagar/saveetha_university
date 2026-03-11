import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { fetchStudentResults } from "../../api/students/studentResultApi";
import Toast from "../../components/ui/Toast";
import { FaSpinner, FaDownload, FaArrowLeft, FaEye } from "react-icons/fa";
import Button from "../../components/ui/Button";
import universityLetterhead from "../../assets/images/student_result_format.png";

export default function StudentResultPage() {
  const { user } = useAuth();
  const { toast, show, clear } = useToast();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const [activeResult, setActiveResult] = useState(null);
  const markSheetRef = useRef(null);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    setLoading(true);
    try {
      const response = await fetchStudentResults();
      setResults(Array.isArray(response) ? response : response.data || []);
    } catch (err) {
      show("error", "Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!markSheetRef.current || !activeResult) return;

    try {
      setDownloading(true);
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0,
        filename: `MarkSheet_${activeResult.enrollment_no}_${activeResult.session}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(markSheetRef.current).save();
      show("success", "Official Statement Downloaded");
    } catch (err) {
      console.error("PDF Generation Error:", err);
      show("error", "Generation failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading)
    return (
      <div className="py-20 flex justify-center">
        <FaSpinner className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="w-full space-y-6 pb-20">
      {toast && <Toast {...toast} onClose={clear} />}

      {!activeResult ? (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
          <h1 className="text-2xl font-serif font-bold text-slate-800 mb-8 border-b pb-4">
            Academic Records
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {results.map((res, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-800 capitalize">
                    {res.duration_type} {res.duration}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Session: {res.session}
                  </p>
                </div>
                <Button
                  onClick={() => setActiveResult(res)}
                  className="rounded-2xl flex items-center gap-2"
                >
                  <FaEye /> View & Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-[850px] flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveResult(null)}
              className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-600 transition-colors"
            >
              <FaArrowLeft /> Back to List
            </button>
            <Button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="bg-green-600 hover:bg-green-700"
            >
              {downloading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaDownload />
              )}{" "}
              Download PDF
            </Button>
          </div>

          <div className="overflow-auto w-full flex justify-center bg-slate-200 p-4 md:p-10 rounded-3xl shadow-inner">
            <div
              ref={markSheetRef}
              className="relative flex-shrink-0"
              style={{
                width: "794px",
                height: "1123px",
                color: "#000000",
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={universityLetterhead}
                className="absolute inset-0 w-full h-full z-0"
                alt="letterhead"
              />

              {/* 🎯 Alignment Overlay: All colors are Hex to prevent oklch error */}
              <div
                className="relative z-10 w-full h-full font-sans text-[13.5px]"
                style={{ color: "#1a1a1a" }}
              >
                {/* Header Info */}
                <div
                  style={{
                    position: "absolute",
                    top: "229px",
                    left: "245px",
                    fontWeight: "700",
                    color: "#000000",
                  }}
                >
                  {activeResult.enrollment_no}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "256px",
                    left: "695px",
                    fontWeight: "700",
                    color: "#000000",
                  }}
                >
                  {activeResult.duration_type?.toUpperCase()}{" "}
                  {activeResult.duration}
                </div>

                {/* Personal Details */}
                <div
                  style={{
                    position: "absolute",
                    top: "269px",
                    left: "265px",
                    color: "#000000",
                  }}
                >
                  {activeResult.roll_no}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "297px",
                    left: "265px",
                    fontWeight: "600",
                    color: "#000000",
                  }}
                >
                  {(
                    activeResult.student_name ||
                    user?.name ||
                    "N/A"
                  ).toUpperCase()}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "325px",
                    left: "265px",
                    color: "#000000",
                  }}
                >
                  {(
                    activeResult.father_name ||
                    user?.father_name ||
                    "N/A"
                  ).toUpperCase()}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "355px",
                    left: "265px",
                    color: "#000000",
                  }}
                >
                  {(
                    activeResult.mother_name ||
                    user?.mother_name ||
                    "N/A"
                  ).toUpperCase()}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "383px",
                    left: "265px",
                    fontWeight: "600",
                    color: "#000000",
                  }}
                >
                  {activeResult.course_name || activeResult.course || "N/A"}
                </div>

                {/* 📊 Dynamic Table Section */}
                <div
                  style={{
                    position: "absolute",
                    top: "490px",
                    left: "82px",
                    width: "630px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "13px",
                      lineHeight: "1.8",
                      color: "#000000",
                      border: "1px solid #000000",
                    }}
                  >
                    <thead>
                      {/* If your background doesn't have headers, you can leave this empty or omit it */}
                    </thead>
                    <tbody>
                      {(activeResult.subjects || []).map((sub, i) => (
                        <tr key={i}>
                          <td
                            style={{
                              width: "335px",
                              textAlign: "left",
                              padding: "4px 8px",
                              border: "1px solid #000000",
                            }}
                          >
                            {sub.subject_name}
                          </td>
                          <td
                            style={{
                              width: "95px",
                              textAlign: "center",
                              border: "1px solid #000000",
                            }}
                          >
                            {sub.theory_marks || "0"}
                          </td>
                          <td
                            style={{
                              width: "95px",
                              textAlign: "center",
                              border: "1px solid #000000",
                            }}
                          >
                            {sub.practical_marks || "0"}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontWeight: "700",
                              border: "1px solid #000000",
                            }}
                          >
                            {Number(sub.theory_marks || 0) +
                              Number(sub.practical_marks || 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    {/* ✅ Dynamic Total Row: This moves up or down based on the number of subjects */}
                    <tfoot style={{ backgroundColor: "#f9fafb" }}>
                      <tr>
                        <td
                          colSpan="3"
                          style={{
                            border: "1px solid #000000",
                            padding: "8px",
                            textAlign: "right",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            fontSize: "11px",
                            letterSpacing: "1px",
                          }}
                        >
                          Grand Total
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            padding: "8px",
                            textAlign: "center",
                            fontWeight: "900",
                            fontSize: "16px",
                            color: "#1e40af", // Matches your blue branding
                          }}
                        >
                          {activeResult.subjects.reduce(
                            (acc, s) =>
                              acc +
                              Number(s.theory_marks || 0) +
                              Number(s.practical_marks || 0),
                            0,
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
