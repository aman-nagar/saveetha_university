import html2pdf from "html2pdf.js";
import ResultFormat from "../assets/images/marksheet.png";

export const downloadTranscript = (resultData) => {
  const element = document.createElement("div");
  console.log(resultData);
  // Cumulative history logic: Ensure we show previous years/semesters [cite: 24, 57, 98]
  const history = resultData.history || [];
  const grandTotalMax = history.reduce(
    (a, b) => a + Number(b.max_total || 0),
    0,
  );
  const grandTotalObt = history.reduce(
    (a, b) => a + Number(b.obtained_total || 0),
    0,
  );

  element.innerHTML = `
    <div style="width: 210mm; height: 297mm; position: relative; background: white; font-family: Arial, sans-serif; color: #000;">
      <img src="${ResultFormat}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;" />

      <div style="position: relative; z-index: 10; padding: 2.3in 0.4in 0.5in 0.4in;">
        
        <table style="width: 100%; font-size: 11px; font-weight: bold; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="width: 20%; padding: 4px 0;">STUDENT'S NAME :</td>
            <td style="width: 40%; padding: 4px 0;">${resultData.student_name.toUpperCase()}</td>
            <td style="width: 20%; padding: 4px 0;">REGISTRATION NO :</td>
            <td style="width: 20%; padding: 4px 0;">${resultData.enrollment_no}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">FATHER'S NAME :</td>
            <td style="padding: 4px 0;">${resultData.father_name.toUpperCase()}</td>
            <td style="padding: 4px 0;">ROLL NO :</td>
            <td style="padding: 4px 0;">${resultData.roll_no}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">MOTHER'S NAME :</td>
            <td style="padding: 4px 0;">${resultData.mother_name.toUpperCase()}</td>
            <td style="padding: 4px 0;">SESSION :</td>
            <td style="padding: 4px 0;">${resultData.session}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">COURSE :</td>
            <td style="padding: 4px 0;">${resultData.course_name}</td>
            <td style="padding: 4px 0;">YEAR/SEM :</td>
            <td style="padding: 4px 0;">${resultData.duration} ${resultData.duration_type}</td>
          </tr>
        </table>
        <div style="background-color: #FF9714; color: #FFFFFF; border: 1.5px solid #000; border-bottom: none; text-align: center; height: 35px;  font-size: 14px; font-weight: bold; ">
          STATEMENT OF MARKS
        </div>
        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 10px; text-align: center;">
         <thead>
            <tr style="background: rgba(0,0,0,0.08); height: 38px; vertical-align: middle;">
              <th rowspan="2" style="border: 1px solid #000; padding: 6px; width: 12%; vertical-align: middle;">Subject Code</th>
              <th rowspan="2" style="border: 1px solid #000; padding: 6px; text-align: left; width: 40%; vertical-align: middle;">Name of the Subject</th>
              <th rowspan="2" style="border: 1px solid #000; padding: 6px; width: 12%; vertical-align: middle;">Max Marks</th>
              <th colspan="2" style="border: 1px solid #000; padding: 6px; width: 24%; vertical-align: middle;">Marks Obtained</th>
              <th rowspan="2" style="border: 1px solid #000; padding: 6px; width: 12%; vertical-align: middle;">Total</th>
            </tr>
            <tr style="background: rgba(0,0,0,0.08); height: 32px; vertical-align: middle;">
              <th style="border: 1px solid #000; padding: 6px; vertical-align: middle;">Theory</th>
              <th style="border: 1px solid #000; padding: 6px; vertical-align: middle;">Practical</th>
            </tr>
          </thead>
          <tbody>
            ${resultData.subjects
              .map(
                (sub) => `
              <tr>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; border-top: none; border-bottom: none; padding: 6px;">
                  ${sub.subject_code || "-"}
                </td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; border-top: none; border-bottom: none; padding: 6px; text-align: left;">
                  ${sub.subject_name}
                </td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; border-top: none; border-bottom: none; padding: 6px;">
                  ${sub.max_marks || 100}
                </td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; border-top: none; border-bottom: none; padding: 6px;">
                  ${sub.theory_marks}
                </td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; border-top: none; border-bottom: none; padding: 6px;">
                  ${sub.practical_marks}
                </td>
                <td style="border-left: 1px solid #000; border-right: 1px solid #000; border-top: none; border-bottom: none; padding: 6px; font-weight: bold;">
                  ${Number(sub.theory_marks) + Number(sub.practical_marks)}
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
          <tfoot style="font-weight: bold; font-size: 11px;">
            <tr style="border: 1.5px solid #000; height: 35px; vertical-align: middle;">
              <td colspan="2" style="border: 1px solid #000; text-align: left; padding-left: 10px;">
                <div style="display: flex; justify-content: space-between; width: 100%; padding-right: 20px;">
                  <span>Grade: &nbsp;&nbsp;&nbsp; ${resultData.current_year_details.grade || "N/A"}</span> 
                  <span>Total</span>
                </div>
              </td>
              
              <td style="border: 1px solid #000; width: 12%;">
                ${resultData.current_year_details.max_marks}
              </td>
              
              <td style="border: 1px solid #000; width: 12%;">
                ${resultData.current_year_details.theory_total}
              </td>
              <td style="border: 1px solid #000; width: 12%;">
                ${resultData.current_year_details.practical_total}
              </td>
              
              <td style="border: 1px solid #000; width: 12%; font-size: 13px;">
                ${resultData.current_year_details.obtained_marks}
              </td>
            </tr>
          </tfoot>
        </table>
        <div style="margin-top: 30px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 8px; text-align: center; table-layout: fixed;">
            <thead>
              <tr style="background-color: #FF9714; color: #FFFFFF; font-weight: bold; height: 40px;">
                <th style="border: 1px solid #000; width: 12%; vertical-align: middle;">Semester/ Year</th>
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
                    return `<th style="border: 1px solid #000; vertical-align: middle;">${ordinals[num]} Sem/Year</th>`;
                  })
                  .join("")}
                <th style="border: 1px solid #000; vertical-align: middle;">Grand Total</th>
                <th style="border: 1px solid #000; vertical-align: middle;">Result</th>
                <th style="border: 1px solid #000; vertical-align: middle;">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr style="height: 32px;">
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold; text-align: left; vertical-align: middle;">Maximum Marks</td>
                ${[1, 2, 3, 4, 5, 6, 7, 8]
                  .map((num) => {
                    const record = resultData.cumulative_history?.find(
                      (h) => Number(h.duration) === num,
                    );
                    return `<td style="border: 1px solid #000; font-weight: bold; font-size: 12px; vertical-align: middle;">${record ? record.max_marks : "----"}</td>`;
                  })
                  .join("")}
                <td style="border: 1px solid #000; font-weight: bold; font-size: 13px; vertical-align: middle;">${resultData.grand_overall_details?.total_max || ""}</td>
                <td rowspan="2" style="border: 1px solid #000; font-weight: bold; vertical-align: middle; padding: 4px;">
                  ${resultData.grand_overall_details?.result_status || ""}
                </td>
                <td rowspan="2" style="border: 1px solid #000; font-weight: bold; font-size: 14px; vertical-align: middle;">
                  ${resultData.grand_overall_details?.final_grade || ""}
                </td>
              </tr>

              <tr style="height: 32px;">
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold; text-align: left; vertical-align: middle;">Marks Obtained</td>
                ${[1, 2, 3, 4, 5, 6, 7, 8]
                  .map((num) => {
                    const record = resultData.cumulative_history?.find(
                      (h) => Number(h.duration) === num,
                    );
                    return `<td style="border: 1px solid #000; font-weight: bold; font-size: 12px; vertical-align: middle;">${record ? record.marks_obtained : "----"}</td>`;
                  })
                  .join("")}
                <td style="border: 1px solid #000; font-weight: bold; font-size: 13px; vertical-align: middle;">${resultData.grand_overall_details?.total_obtained || ""}</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 12px; font-size: 12px; font-weight: bold; color: #000;">
            Total in Word : &nbsp; <span style="font-weight: 900;">${resultData.grand_overall_details?.total_in_words || ""} Only</span>
          </div>
        </div>

      </div>

        
        <div style="position: absolute; bottom: 0.8in; left: 0.4in; right: 0.4in; display: flex; justify-content: space-between; align-items: flex-end; z-index: 20;">
          <div style="font-size: 11px; font-weight: bold; color: #000;">
            ISSUE DATE : ${resultData.issue_date} [cite: 28, 65, 103]
          </div>

          <div style="text-align: center; width: 2.2in;">
            <div style="height: 40px; font-size: 9px; font-style: italic; color: rgba(0,0,0,0.2); margin-bottom: 5px;">
              University Seal [cite: 95]
            </div>
            <div style="font-size: 10px; font-weight: bold; border-top: 1.5px solid #000; padding-top: 5px; text-transform: uppercase; color: #000;">
              Controller of Examinations 
            </div>
          </div>
        </div>
    </div>
  `;

  const opt = {
    margin: 0,
    filename: `Marksheet_${resultData.enrollment_no}.pdf`,
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
