import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { fetchStudentResults } from "../../api/students/studentResultApi";
import Toast from "../../components/ui/Toast";
import { FaSpinner, FaDownload, FaArrowLeft, FaEye } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { ResultPDFTemplate } from "../../components/students/ResultPDFTemplate";

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
        filename: `MarkSheet_${activeResult.enrollment_no}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 4,
          useCORS: true,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "pt",
          format: "a4",
          orientation: "portrait",
        },
      };
      await html2pdf().set(opt).from(markSheetRef.current).save();
      show("success", "Official Statement Downloaded");
    } catch (err) {
      show("error", "PDF generation failed.");
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
          <div className="w-full max-w-[850px] flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border">
            <button
              onClick={() => setActiveResult(null)}
              className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-600"
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
            <ResultPDFTemplate
              ref={markSheetRef}
              result={activeResult}
              user={user}
            />
          </div>
        </div>
      )}
    </div>
  );
}
