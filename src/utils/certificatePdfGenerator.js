// src/utils/certificatePdfGenerator.js
import html2pdf from "html2pdf.js";
import certificateBg from "../assets/images/certificate.png";

export const getCertificateHtml = (cert, isPdf = false) => {
    console.log(cert)
  const fieldColor = "#5F7C7E";
  const valuedColor = "black";
  return `
    <div style="width: 297mm; height: 210mm; color: ${fieldColor}; position: relative; background-color: white; font-family: Arial, sans-serif; overflow: hidden; margin: 0 auto; box-shadow: ${isPdf ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"};">
      <img src="${certificateBg}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; object-fit: cover;" />
      
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;">
        
        <div style="position: absolute; top: 15%; left: 10%; font-size: 16px; font-weight: bold; ${isPdf ? "padding-bottom: 2px;" : ""}">
          S.No. ${cert.serial_no || ""}
        </div>
        
        <div style="position: absolute; top: 15%; right: 10%; font-size: 16px; font-weight: bold; color: ${valuedColor}; ">
          Enrollment No: ${cert.enrollment_no || ""}
        </div>
        
        <div style="position: absolute; top: 40%; left: 0; width: 100%; text-align: center; font-size: 38px; font-weight: bold; color: #1a4ab9; text-transform: uppercase;">
          ${cert.candidate_name || ""}
        </div>
        
        <div style="position: absolute; top: 50%; left: 0; width: 100%; text-align: center; font-size: 20px; font-weight: bold; color: #555;">
          D/O, S/O: ${cert.father_name || ""}
        </div>
        
        <div style="position: absolute; top: 58%; left: 0; width: 100%; text-align: center; font-size: 24px; font-weight: bold; color: #333;">
          ${cert.course_name || ""}
        </div>
        
        <div style="position: absolute; top: 64%; left: 0; width: 100%; text-align: center; font-size: 16px; font-weight: bold; color: #666;">
          Duration: ${cert.full_duration_in_words || ""}
        </div>
        
        <div style="position: absolute; top: 70%; left: 0; width: 100%; text-align: center; font-size: 18px; font-weight: bold;">
          Passing Year: ${cert.final_year || ""} &nbsp;|&nbsp; Percentage: ${cert.percentage || ""}%
        </div>
        
        <div style="position: absolute; bottom: 15%; left: 15%; font-size: 16px; font-weight: bold;">
          Date: ${cert.issue_date || ""}
        </div>

      </div>
    </div>
  `;
};

export const downloadCertificate = async (certData) => {
  const element = document.createElement("div");
  // Pass true to indicate it's rendering for PDF
  element.innerHTML = getCertificateHtml(certData, true);
  document.body.appendChild(element);
  await new Promise((resolve) => setTimeout(resolve, 200));

  const opt = {
    margin: 0,
    filename: `Certificate_${certData.enrollment_no}.pdf`,
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: {
      scale: 3,
      useCORS: true,
      letterRendering: true,
      allowTaint: false,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } finally {
    document.body.removeChild(element);
  }
};
