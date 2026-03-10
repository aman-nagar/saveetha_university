import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { fetchStudentResults } from "../../api/students/studentResultApi";
import Toast from "../../components/ui/Toast";
import { FaSpinner, FaDownload, FaExclamationTriangle } from "react-icons/fa";
import Button from "../../components/ui/Button";
import universityLetterhead from "../../assets/images/student_result_format.png"; // ✅ Your provided background

export default function StudentResultPage() {
  const { user } = useAuth();
  const { toast, show, clear } = useToast();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    setLoading(true);
    try {
      const response = await fetchStudentResults();
      console.log(response);
      // API returns array directly, not wrapped in data property
      setResults(Array.isArray(response) ? response : response.data || []);
    } catch (err) {
      show("error", err.message || "Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (resultData) => {
    console.log(resultData);
    try {
      setDownloading(true);

      const pdfContainer = document.createElement("div");
      // Standard A4 dimensions at 96 DPI
      pdfContainer.style.width = "794px";
      pdfContainer.style.height = "1123px";
      pdfContainer.style.position = "relative";
      pdfContainer.style.backgroundColor = "#fff";

      // ✅ Precision Alignment Logic
      pdfContainer.innerHTML = `
      <img src="${universityLetterhead}" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 1;" />
      
      <div style="position: relative; z-index: 10; font-family: 'Helvetica', 'Arial', sans-serif; color: #1a1a1a; font-size: 13.5px;">
        
        <div style="position: absolute; top: 206px; left: 245px; font-weight: 700;">${resultData.enrollment_no}</div>
        <div style="position: absolute; top: 228px; left: 700px; font-weight: 700;">${resultData.duration_type?.toUpperCase()} ${resultData.duration}</div>
        
        <div style="position: absolute; top: 242px; left: 245px;">${resultData.roll_no}</div>
        <div style="position: absolute; top: 268px; left: 245px; font-weight: 600;">${(resultData.student_name || user?.name || "N/A").toUpperCase()}</div>
        <div style="position: absolute; top: 293px; left: 245px;">${(resultData.father_name || user?.father_name || "N/A").toUpperCase()}</div>
        <div style="position: absolute; top: 318px; left: 245px;">${(resultData.mother_name || user?.mother_name || "N/A").toUpperCase()}</div>
        <div style="position: absolute; top: 343px; left: 245px; font-weight: 600;">${resultData.course_name || resultData.course || "N/A"}</div>

        <div style="position: absolute; top: 462px; left: 82px; width: 630px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.8;">
            <tbody>
              ${(resultData.subjects || [])
                .map(
                  (sub) => `
                <tr>
                  <td style="padding: 4px 0; width: 335px; text-align: left; font-weight: 500;">${sub.subject_name}</td>
                  <td style="padding: 4px 0; width: 95px; text-align: center;">${sub.theory_marks || "0"}</td>
                  <td style="padding: 4px 0; width: 95px; text-align: center;">${sub.practical_marks || "0"}</td>
                  <td style="padding: 4px 0; text-align: center; font-weight: 700; color: #000;">
                      ${Number(sub.theory_marks || 0) + Number(sub.practical_marks || 0)}
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div style="position: absolute; top: 818px; left: 605px; width: 80px; text-align: center; font-size: 18px; font-weight: 900; color: #1e40af;">
          ${resultData.subjects.reduce((acc, s) => acc + Number(s.theory_marks || 0) + Number(s.practical_marks || 0), 0)}
        </div>
      </div>
    `;

      document.body.appendChild(pdfContainer);

      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: 0,
        filename: `MarkSheet_${resultData.enrollment_no}_${resultData.session}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(pdfContainer).save();
      document.body.removeChild(pdfContainer);
      show("success", "Official transcript generated!");
    } catch (err) {
      show("error", "Failed to generate official PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <h1 className="text-2xl font-serif font-bold text-slate-800 mb-8 border-b pb-4">
          Digital Transcript Portal
        </h1>

        {loading ? (
          <div className="py-20 flex justify-center">
            <FaSpinner className="animate-spin text-blue-600" size={40} />
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {results.map((res, i) => (
              <div
                key={i}
                className="group p-6 rounded-3xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white hover:shadow-xl transition-all"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-800 capitalize">
                    {res.duration_type} {res.duration}{" "}
                    <span className="text-slate-400 font-normal">
                      ({res.session})
                    </span>
                  </h3>
                  <p className="text-sm text-slate-500">
                    {res.subjects.length} Subjects Evaluated
                  </p>
                </div>
                <Button
                  onClick={() => handleDownloadPDF(res)}
                  disabled={downloading}
                  className="rounded-2xl px-8 py-3 bg-slate-900 hover:bg-blue-600 flex items-center gap-3"
                >
                  {downloading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaDownload />
                  )}
                  Official Transcript
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-400 font-medium">
            No academic records published yet.
          </div>
        )}
      </div>
    </div>
  );
}
