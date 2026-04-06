import html2pdf from "html2pdf.js";
import ResultFormat from "../assets/images/marksheet.png";
import { formatDateDDMMYYYY, formatRoman } from "./formatters";

export const getTranscriptHtml = (resultData, isPdf = false) => {
  const cumulativeHistory = resultData.cumulative_history || [];

  return `
    <div style="width: 210mm; height: 296.5mm; position: relative; background: white; font-family: Arial, Helvetica, sans-serif; color: #000;">
      <img src="${ResultFormat}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;" />
      <div style="position: absolute;top: 1.2in;right: 1in;font-size: 16px;font-weight: bold;z-index: 20;color: #000;">Sr. No. ${resultData.serial_no || ""}</div>
      <div style="position: relative; z-index: 10; padding: 2.3in 0.5in 0.5in 0.5in;">
        <table style="width: 100%; font-size: 11px;  border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="width: 20%; padding: 4px 0;">STUDENT'S NAME</td>
            <td style="width: 40%; padding: 4px 0; font-weight: bold;">:&nbsp  ${(resultData.candidate_name || resultData.student_name || "").toUpperCase()}</td>
            <td style="width: 20%; padding: 4px 0;">REGISTRATION NO.</td>
            <td style="width: 20%; padding: 4px 0; font-weight: bold;">:&nbsp  ${resultData.enrollment_no || ""}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">FATHER'S NAME</td>
            <td style="padding: 4px 0; font-weight: bold;">:&nbsp  ${(resultData.father_name || "").toUpperCase()}</td>
            <td style="padding: 4px 0;">ROLL NO.</td>
            <td style="padding: 4px 0; font-weight: bold;">:&nbsp  ${resultData.roll_no || ""}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">MOTHER'S NAME</td>
            <td style="padding: 4px 0; font-weight: bold;">:&nbsp  ${(resultData.mother_name || "").toUpperCase()}</td>
            <td style="padding: 4px 0;">SESSION</td>
            <td style="padding: 4px 0; font-weight: bold;">:&nbsp  ${resultData.session || ""}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">COURSE</td>
            <td style="padding: 4px 0; font-weight: bold;">:&nbsp  ${resultData.course_name || ""} <span>( ${resultData.stream_name} )</span></td> 
            <td style="padding: 4px 0;">YEAR/SEM</td>
            <td style="padding: 4px 0; font-weight: bold;">:&nbsp  ${formatRoman(resultData.duration) || ""} ${resultData.duration_type || ""}</td>
          </tr>
        </table>

        <div style="${isPdf ? "padding-bottom: 15px;" : ""} background-color: #FF9714; color: #FFFFFF; border: 1.5px solid #000; border-bottom: none; text-align: center; height: 35px; font-size: 14px; font-weight: bold; display: flex;align-items: center;justify-content: center;">
          STATEMENT OF MARKS
        </div>

        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 10px; text-align: center; table-layout: fixed;">
          <thead>
            <tr style="background: rgba(0,0,0,0.08); height: 38px; ">
              <th rowspan="2" style="border: 1px solid #000; padding: 6px; width: 12%; ">Subject Code</th>
              <th rowspan="2" style="border: 1px solid #000; padding: 6px; text-align: left; width: 40%; ">Name of the Subject</th>
              <th rowspan="2" style="border: 1px solid #000; padding: 6px; width: 12%; ">Max Marks</th>
              <th colspan="2" style="border: 1px solid #000; width: 24%; ${isPdf ? "padding-bottom: 15px;" : ""}">Marks Obtained</th>
              <th rowspan="2" style="border: 1px solid #000; padding: 6px; width: 12%; ">Total</th>
            </tr>
            <tr style="background: rgba(0,0,0,0.08); height: 32px;">
              <th style="border: 1px solid #000;height: 32px;text-align: center; ${isPdf ? "padding-bottom: 15px;" : ""}">Theory</th>
              <th style="border: 1px solid #000;height: 32px;text-align: center; ${isPdf ? "padding-bottom: 15px;" : ""}">Practical</th>
            </tr>
          </thead>
          <tbody>
            ${(resultData.subjects || [])
              .map(
                (sub) => `
              <tr style="height: 30px; ">
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; padding: 6px;">${sub.subject_code || "-"}</td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; padding: 6px; text-align: left;">${sub.subject_name.toUpperCase() || ""}</td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; padding: 6px;">${Number(sub.max_theory_marks || 0) + Number(sub.max_practical_marks || 0)}</td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; padding: 6px;">${sub.theory_marks || ""}</td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; padding: 6px;">${sub.practical_marks || ""}</td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; padding: 6px; font-weight: bold;">${Number(sub.theory_marks || 0) + Number(sub.practical_marks || 0)}</td>
              </tr>
            `,
              )
              .join("")}

            <tr style="height: ${Math.max(0, 320 - (resultData.subjects || []).length * 30)}px;">
              <td style="border-left: 1px solid #000; border-right: 1px solid #000;"></td>
              <td style="border-left: 1px solid #000; border-right: 1px solid #000;"></td>
              <td style="border-left: 1px solid #000; border-right: 1px solid #000;"></td>
              <td style="border-left: 1px solid #000; border-right: 1px solid #000;"></td>
              <td style="border-left: 1px solid #000; border-right: 1px solid #000;"></td>
              <td style="border-left: 1px solid #000; border-right: 1px solid #000;"></td>
            </tr>
          </tbody>
          <tfoot style="font-weight: bolder; font-size: 13px;">
            <tr style="border: 1.5px solid #000; height: 35px;">
              <td colspan="2" style="border: 1px solid #000; text-align: left; padding-left: 10px;">
                <div style="${isPdf ? "padding-bottom: 15px;" : ""} display: flex; justify-content: space-between; width: 90%; padding-left: 40px;">
                  <span>Grade: &nbsp;&nbsp;&nbsp; ${resultData.current_year_details?.grade || "N/A"}</span>
                  <span>Total</span>
                </div>
              </td>
              <td style="${isPdf ? "padding-bottom: 15px;" : ""} border: 1px solid #000; width: 12%;">${resultData.current_year_details?.max_marks || ""}</td>
              <td style="${isPdf ? "padding-bottom: 15px;" : ""} border: 1px solid #000; width: 12%;">${resultData.current_year_details?.theory_total || ""}</td>
              <td style="${isPdf ? "padding-bottom: 15px;" : ""} border: 1px solid #000; width: 12%;">${resultData.current_year_details?.practical_total || ""}</td>
              <td style="${isPdf ? "padding-bottom: 15px;" : ""} border: 1px solid #000; width: 12%;">${resultData.current_year_details?.obtained_marks || ""}</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 30px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 10px; text-align: center; table-layout: fixed;">
            <thead>
              <tr style="background-color: #FF9714; color: #FFFFFF; font-weight: bold; height: 40px;">
                <th style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; width: 10%; ">Semester/ Year</th>
                ${[1, 2, 3, 4, 5, 6, 7, 8]
                  .map((num) => {
                    const ordinals = {
                      1: "Ist",
                      2: "2nd",
                      3: "3rd",
                      4: "4th",
                      5: "5th",
                      6: "6th",
                      7: "7th",
                      8: "8th",
                    };
                    return `<th style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; ">${ordinals[num]} Sem/Year</th>`;
                  })
                  .join("")}
                <th style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000;">Grand Total</th>
                <th style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; width:10%;">Result</th>
                <th style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; ">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr style="height: 32px;">
                <td style="${isPdf ? "padding-bottom: 15px;" : ""} padding-left:5px; border: 1px solid #000; font-weight: bold; text-align: left;">Maximum Marks</td>
                ${[1, 2, 3, 4, 5, 6, 7, 8]
                  .map((num) => {
                    const record = cumulativeHistory.find(
                      (h) => Number(h.duration) === num,
                    );
                    return `<td style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; font-weight: bold; font-size: 14px; ">${record?.max_marks || "----"}</td>`;
                  })
                  .join("")}
                <td style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; font-weight: bold; font-size: 13px;">${resultData.grand_overall_details?.total_max || ""}</td>
                <td rowspan="2" style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; font-weight: bolder; font-size: 12px; ">${resultData.grand_overall_details?.result_status || ""}</td>
                <td rowspan="2" style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; font-weight: bold; font-size: 14px;">${resultData.grand_overall_details?.final_grade || ""}</td>
              </tr>
              <tr style="height: 32px;">
                <td style="${isPdf ? "padding-bottom: 12px;" : ""} padding-left:5px; border: 1px solid #000; font-weight: bold; text-align: left; ">Marks Obtained</td>
                ${[1, 2, 3, 4, 5, 6, 7, 8]
                  .map((num) => {
                    const record = cumulativeHistory.find(
                      (h) => Number(h.duration) === num,
                    );
                    return `<td style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; font-weight: bold; font-size: 14px; ">${record?.marks_obtained || "----"}</td>`;
                  })
                  .join("")}
                <td style="${isPdf ? "padding-bottom: 12px;" : ""} border: 1px solid #000; font-weight: bold; font-size: 13px; ">${resultData.grand_overall_details?.total_obtained || ""}</td>
              </tr>
              <tr style="height:32px">
                <td 
                  colspan="12" 
                  style="${isPdf ? "padding-bottom: 12px;" : ""}
                    border: 1px solid #000;
                    text-align: left;
                    white-space: nowrap;
                    padding-left:5px;
                  "
                >
                  Total in Word : <span style="font-size: 12px; font-weight: bold;">${resultData.grand_overall_details?.total_in_words || ""} Only</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style="position: absolute; bottom: 0.5in; left: 0.6in; right: 0.4in; display: flex; justify-content: space-between; align-items: flex-end; z-index: 20;">
        <div style="font-size: 14px;  color: #000;">ISSUE DATE : <span style="font-weight:bolder; font-size:15px;">${formatDateDDMMYYYY(resultData.issue_date) || ""}</span></div>
        <div style="text-align: center; width: 2.2in;">
          <div style="font-size: 10px; font-weight: bold; padding-top: 5px; text-transform: uppercase; color: #000;">Controller of Examinations</div>
        </div>
      </div>
    </div>
  `;
};

export const downloadTranscript = (resultData) => {
  const element = document.createElement("div");
  element.innerHTML = getTranscriptHtml(resultData, true);

  const opt = {
    margin: 0,
    filename: `Marksheet_${resultData.enrollment_no || "transcript"}.pdf`,
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: {
      scale: 3,
      useCORS: true,
      letterRendering: true,
      allowTaint: false,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
};
