import html2pdf from "html2pdf.js";

export const downloadTranscript = (resultData) => {
  const element = document.createElement("div");
  
  // High-contrast, professional academic styling for the PDF
  element.innerHTML = `
    <div style="font-family: 'Times New Roman', serif; padding: 40px; color: #000; background: #fff;">
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="margin: 0; text-transform: uppercase;">Academic Transcript</h1>
        <p style="margin: 5px 0;">Official Statement of Marks</p>
      </div>

      <table style="width: 100%; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 5px;"><strong>Name:</strong> ${resultData.student_name}</td>
          <td style="padding: 5px;"><strong>Enrollment:</strong> ${resultData.enrollment_no}</td>
        </tr>
        <tr>
          <td style="padding: 5px;"><strong>Course:</strong> ${resultData.course_name}</td>
          <td style="padding: 5px;"><strong>Stream:</strong> ${resultData.stream_name}</td>
        </tr>
        <tr>
          <td style="padding: 5px;"><strong>Roll No:</strong> ${resultData.roll_no}</td>
          <td style="padding: 5px;"><strong>Session:</strong> ${resultData.session}</td>
        </tr>
      </table>

      <table style="width: 100%; border-collapse: collapse; border: 1px solid #000;">
        <thead>
          <tr style="background: #f0f0f0;">
            <th style="border: 1px solid #000; padding: 10px; text-align: left;">Subject</th>
            <th style="border: 1px solid #000; padding: 10px;">Theory</th>
            <th style="border: 1px solid #000; padding: 10px;">Practical</th>
            <th style="border: 1px solid #000; padding: 10px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${resultData.subjects.map(sub => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${sub.subject_name}</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">${sub.theory_marks}</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">${sub.practical_marks}</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold;">
                ${Number(sub.theory_marks) + Number(sub.practical_marks)}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div style="margin-top: 40px; text-align: right;">
        <p>Issued Date: ${resultData.issue_date}</p>
        <div style="margin-top: 60px; border-top: 1px solid #000; display: inline-block; width: 200px; text-align: center;">
          Registrar Signature
        </div>
      </div>
    </div>
  `;

  const opt = {
    margin: 0,
    filename: `Transcript_${resultData.enrollment_no}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, letterRendering: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};